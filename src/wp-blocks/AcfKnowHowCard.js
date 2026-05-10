import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { gql } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

export default function AcfKnowHowCard({blockKnowHow}) {

	const [active, setActive] = useState(false)

	return (
		<Card className={cn("cursor-pointer text-white overlow-hidden aspect-square overflow-hidden p-0 relative shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-0 group", blockKnowHow.color[0] === "red"  ?"bg-primary shadow-primary/30" : "bg-black shadow-dark/30")}>
			<div className={cn("flex-none h-full w-[200%] grid grid-cols-2 gap-0 transition-transform duration-500 ease-in-out", active && "-translate-x-1/2")} onClick={() => setActive(!active)}>
				<CardContent className="aspect-square flex flex-col justify-between items-center p-0 relative">
					<div className="h-[70%] flex-none p-3">
						<Image
							src={blockKnowHow.image.node.mediaItemUrl}
							alt={blockKnowHow.image.node.altText || 'Alt text not available'} 
							width={200}
							height={200}
							className="p-0 w-full h-full"
							unoptimized={blockKnowHow.image.node.mimeType === "image/svg+xml" ? true : false}
						/>
					</div>
					<div className="grow flex items-end px-3 w-full uppercase font-bold leading-4 pb-3">
						<span>
							{blockKnowHow.label}
						</span>
					</div>
					<div className="absolute bottom-3 right-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
						<path d="M1.25 14.25L7.75 7.75L1.25 1.25" stroke="white" stroke-opacity="0.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</CardContent>
				<CardContent className="aspect-square p-3 bg-secondary overflow-y-auto custom-scroll">
					<p className="text-sm font-bold text-white">{blockKnowHow.title}</p>
					<p className="text-xs text-white">{blockKnowHow.content}</p>
				</CardContent>
			</div>
		</Card>
	);
}

AcfKnowHowCard.fragments = {
	key: `AcfKnowHowCardBlockFragment`,
	entry: gql`
		fragment AcfKnowHowCardBlockFragment on AcfKnowHowCard {
			blockKnowHow {
			color,
			label,
			title,
			content,
				image {
					node {
						mediaItemUrl
						altText
						mimeType
					}
				}
			}
		}
	`,
};

AcfKnowHowCard.displayName = "AcfKnowHowCard";

