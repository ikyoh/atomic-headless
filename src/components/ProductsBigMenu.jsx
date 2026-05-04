"use client"

import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { gql, useQuery } from "@apollo/client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import CardZoomLink from "./CardZoomLink"

export default function ProductsBigMenu() {

    const router = useRouter()
    const isAnchor = typeof window !== "undefined" && window.location.hash.length > 0
    const [isHidden, setIsHidden] = useState(isAnchor ? true : false)


    useEffect(() => {
        const THRESHOLD = 40
        let wheelAccumulator = 0
        let ticking = false

        const handleWheel = (event) => {

            wheelAccumulator += event.deltaY

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    if (wheelAccumulator > THRESHOLD) {
                        setIsHidden(true)
                        wheelAccumulator = 0
                    }

                    if (wheelAccumulator < -THRESHOLD) {
                        setIsHidden(false)
                        wheelAccumulator = 0
                    }

                    ticking = false
                })

                ticking = true
            }
        }

        const handleAnchorClick = (event) => {
            const anchor = event.target.closest('a[href*="#"]')
            if (anchor) setIsHidden(true)
        }

        const handleHashChange = () => {
            setIsHidden(true)
        }

        const handlePopState = () => {
            setIsHidden(true)
        }


        window.addEventListener("wheel", handleWheel, { passive: true })
        document.addEventListener("click", handleAnchorClick, true)
        window.addEventListener("hashchange", handleHashChange)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("wheel", handleWheel)
            document.removeEventListener("click", handleAnchorClick, true)
            window.removeEventListener("hashchange", handleHashChange)
            window.removeEventListener("popstate", handlePopState)

        }
    }, [])

    const GET_PRODUCTS = gql`
    query Products {
        products(first: 500) {
            nodes {
                parentId
                id
                uri
                title
                featuredImage {
                    node {
                    altText
                    mediaItemUrl
                    mimeType
                    }
                }
                options {
                    order
                    image {
                    node {
                        altText
                        mediaItemUrl
                        mimeType
                    }
                    }
                }
                children {
                    nodes {
                        id
                    }
                }
            }
        }
    }
`;


    const { data, loading, error } = useQuery(GET_PRODUCTS);

    if (loading) return null;
    if (error) return <p>Error: {error.message}</p>;



    function ListItem({
        product,
        isCard = false,
        ...props
    }) {
        return (
            <div {...props} className="w-38 list-none">
                <NavigationMenuLink render={
                    isCard ?
                        <CardZoomLink
                            link={product.uri}
                            text={product.title}
                            imageURL={product.options?.image?.node?.mediaItemUrl}
                            backgroundGradient
                        />
                        : <Link href={product.uri} className="no-underline! flex-row items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105">
                            <Image
                                src={product.options?.image?.node?.mediaItemUrl || product.featuredImage?.node?.mediaItemUrl}
                                alt={product.title}
                                unoptimized
                                width={40}
                                height={40}
                                className={cn("object-cover w-10 h-10", product.options?.image?.node?.mimeType === "image/svg+xml" && "grayscale brightness-50")}
                            />
                            <p className="text-left leading-3">
                                {product.title}
                            </p>
                        </Link>
                } />
            </div>
        )
    }

    function ListMenuItem({
        product,
        isCard,
        ...props
    }) {
        return (
            <div {...props} className="list-none">
                <NavigationMenu orientation="vertical">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="h-auto p-0" onClick={() => router.push(product.uri)}>
                            <ListItem
                                product={product}
                                isCard={isCard}
                            />
                        </NavigationMenuTrigger>
                        {product.children?.nodes?.length > 0 &&
                            <NavigationMenuContent>
                                <div className={cn("max-w-3xl gap-3 p-3 grid", data?.products?.nodes?.filter(p => p.parentId === product.id).length <= 6 ? "grid-cols-" + data?.products?.nodes?.filter(p => p.parentId === product.id).length : "grid-cols-6")}>
                                    {
                                        data?.products?.nodes?.filter(p => p.parentId === product.id).sort((a, b) => (a.options?.order || 0) - (b.options?.order || 0)).map(subProduct =>
                                            product.children?.nodes?.length === 0 ?
                                                <ListItem
                                                    key={subProduct.id}
                                                    product={subProduct}

                                                />
                                                :
                                                <ListMenuItem
                                                    key={subProduct.id}
                                                    product={subProduct}
                                                />

                                        )
                                    }
                                </div >
                            </NavigationMenuContent >}
                    </NavigationMenuItem>
                </NavigationMenu >
            </div >
        )
    }


    return (
        <NavigationMenu
            className={cn(
                "hidden md:flex bg-primary max-w-full h-9.5 sticky top-22.5 z-50 transition-transform duration-300 ease-out",
                isHidden ? "-translate-y-full" : "translate-y-0"
            )}
        >
            <NavigationMenuList className="justify-between max-w-7xl mx-auto">
                {data?.products?.nodes?.filter(product => product.parentId === null).sort((a, b) => (a.options?.order || 0) - (b.options?.order || 0)).map((product) => (
                    product.featuredImage && (
                        <NavigationMenuItem key={product.id}>
                            <NavigationMenuTrigger className="p-1 h-auto text-white hover:text-black hover:bg-white dark:hover:bg-white cursor-pointer" onClick={() => router.push(product.uri)}>
                                {product.title}
                            </NavigationMenuTrigger>
                            {product.children?.nodes?.length > 0 &&
                                <NavigationMenuContent>
                                    <div className={cn("max-w-3xl gap-3 p-3 grid grid-cols-4", data?.products?.nodes?.filter(p => p.parentId === product.id).length <= 6 ? "grid-cols-" + data?.products?.nodes?.filter(p => p.parentId === product.id).length : "grid-cols-6")}>
                                        {data?.products?.nodes?.filter(p => p.parentId === product.id).map(subProduct => (
                                            (subProduct.featuredImage || subProduct.options) && (
                                                subProduct.children?.nodes?.length === 0 ?
                                                    <ListItem
                                                        key={subProduct.id}
                                                        product={subProduct}
                                                        isCard
                                                    />
                                                    :
                                                    <ListMenuItem
                                                        key={subProduct.id}
                                                        product={subProduct}
                                                        isCard
                                                    />
                                            )
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            }
                        </NavigationMenuItem>
                    )
                ))}

            </NavigationMenuList>
        </NavigationMenu>
    )
}


