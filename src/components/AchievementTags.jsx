import { cn } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

export default function AchievementTags({ product, tags, className }) {


    const GET_ACHIEVEMENTS = gql`
        query OptionAchievements {
            optionAchievement {
                id
                menuTitle
                pageTitle
                settingsAchievement {
                critria {
                    elements {
                    order
                    tag
                    titre
                    icon {
                        node {
                        mediaItemUrl
                        }
                    }
                    }
                    ordre
                    titre
                }
                }
            }
        }
        `;

    const { data, loading } = useQuery(GET_ACHIEVEMENTS);

    const tagMap = data?.optionAchievement?.settingsAchievement?.critria
        .flatMap(c => c.elements)
        .reduce((acc, el) => {
            acc[el.tag] = {
                titre: el.titre,
                icon: el.icon?.node?.mediaItemUrl
            }
            return acc
        }, {})

    const achievementTags = tags
        .map(tag => tagMap[tag.toUpperCase()])
        .filter(Boolean); // Filter out any tags that don't have a corresponding achievement


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
                        reference
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

    const { data: productsData, loading: productsLoading } = useQuery(GET_PRODUCTS);

    const achievementProduct = productsData?.products?.nodes?.find(p => p.options?.reference?.toUpperCase() === product.toUpperCase());


    if (loading || !data || !data.optionAchievement || productsLoading || !productsData || !productsData.products) {
        return <div>Loading...</div>;
    }

    console.log('achievementProduct', achievementProduct)

    return (
        <div className={cn("p-3 flex gap-3 w-full justify-end", className && className)}>
            {achievementTags.map((tag, index) => (
                <div key={index} className="invisible md:visible bg-black backdrop-blur-sm text-white text-xs p-1 rounded flex-none flex flex-col items-center justify-center h-20 min-w-20">
                    <div className="flex-none **:size-10 p-1">
                        <Image
                            src={tag.icon}
                            alt={tag.titre}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="uppercase text-center font-bold">
                        {tag.titre}
                    </div>
                </div>
            ))}
            {(achievementProduct?.options?.image?.node?.mediaItemUrl || achievementProduct?.featuredImage?.node?.mediaItemUrl) && (
                <div className="bg-primary backdrop-blur-sm text-white text-xs p-1 rounded flex-none flex flex-col items-center justify-center h-20 min-w-20">
                    <div className="flex-none **:size-10 p-1">
                        <Image
                            src={achievementProduct?.options?.image?.node?.mediaItemUrl || achievementProduct.featuredImage?.node?.mediaItemUrl}
                            alt={achievementProduct.title}
                            width={40}
                            height={40}
                            className={cn("object-cover w-full h-full", achievementProduct?.options?.image && "brightness-1000")}
                        />
                    </div>
                    <div className="uppercase text-center font-bold">
                        {achievementProduct.title}
                    </div>
                </div>)}
        </div>
    );
}




