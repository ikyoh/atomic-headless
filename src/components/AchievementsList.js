"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import AchievementCard from "./AchievementCard";
import { Button } from "./ui/button";


const fetchPosts = async ({ pageParam }) => {


    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.toString();
    const res = await fetch(pageParam + "&" + search);
    const headerLink = res.headers.get('link');
    const json = await res.json();
    return { posts: json, headerLink };
}

const parseLinkHeader = (header) => {
    const regex = /<([^>]+)>(?:;\s*rel="([^"]+)")?/g;
    const results = [];
    let match;
    while ((match = regex.exec(header)) !== null) {
        results.push({ url: match[1], rel: match[2] || null });
    }
    return results;
}

export default function AchievementsList() {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const searchParams = useSearchParams();

    const params = new URLSearchParams(
        [...searchParams.values()].map(v => ["search", v])
    ).toString()



    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isError
    } = useInfiniteQuery({
        queryKey: ['achievements', params],
        queryFn: fetchPosts,
        initialPageParam: `${baseUrl}/wp-json/wp/v2/media?achievement=1&per_page=12&page=1${params ? `&${params}` : ''}`,
        getNextPageParam: ({ headerLink }) => {
            if (!headerLink) return undefined;
            const links = parseLinkHeader(headerLink);
            const nextLink = links.find(link => link.rel === 'next');
            return nextLink ? nextLink.url : undefined;
        },
    });

    if (status === 'pending') {
        return null;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (<>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-(--wp--preset--spacing--large)">
            {data.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.posts.map(post => (
                        <AchievementCard key={post.id} achievement={post} /> 
                    ))}
                </React.Fragment>
            ))}
            </div>
            <div className="flex items-center justify-center my-10">
                <Button
                    variant="secondary"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className="uppercase rounded-(--wp--preset--border-radius--base) drop-shadow-secondary drop-shadow-sm bg-linear-to-r from-secondary to-secondary hover:from-red-400 hover:to-primary transition duration-400 ease-in-out hover:scale-105"
                    >
                    {isFetchingNextPage
                        ? 'Chargement...'
                        : hasNextPage
                        ? 'Plus de réalisations'
                        : 'Rien de plus à charger'}
                </Button>
            </div>
                        </>
    );
}
