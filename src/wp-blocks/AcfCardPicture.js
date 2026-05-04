import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import Image from "next/image";

export default function AcfCardPicture({blockCardWithPicture, innerBlocks}) {

	return (
		<Card className={cn('border border-primary relative overflow-visible',blockCardWithPicture.imageSize[0] === "small" && "mt-7!",blockCardWithPicture.imageSize[0] === "base" && "mt-10!",blockCardWithPicture.imageSize[0] === "large" && "mt-25!")}>
			<div className={cn("absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary object-cover shadow-md shadow-primary/90 overflow-hidden border border-primary", blockCardWithPicture.imageSize[0] === "small" && "h-14! w-14!", blockCardWithPicture.imageSize[0] === "base" && "h-20! w-20!", blockCardWithPicture.imageSize[0] === "large" && "h-50! w-50!", blockCardWithPicture.image.node.mimeType === "image/svg+xml" && "p-3")}>
				<Image
					src={blockCardWithPicture.image.node.mediaItemUrl}
					alt={blockCardWithPicture.image.node.altText || 'Alt text not available'}
					width={200}
					height={200}
					className="object-cover w-full h-full aspect-square"
					unoptimized={blockCardWithPicture.image.node.mimeType === "image/svg+xml" ? true : false}
				/>
			</div>
			<CardContent className={cn("pt-8", blockCardWithPicture.imageSize[0] === "base" && "pt-12", blockCardWithPicture.imageSize[0] === "large" && "pt-26")}>
				{Array.isArray(innerBlocks) && innerBlocks.length > 0 && (
					<WordPressBlocksViewer blocks={innerBlocks} />
				)}
			</CardContent>
		</Card>
	);
}

AcfCardPicture.fragments = {
	key: `AcfCardPictureBlockFragment`,
	entry: gql`
		fragment AcfCardPictureBlockFragment on AcfCardPicture {
			blockCardWithPicture {
				image {
					node {
						mediaItemUrl
						altText
						mimeType
					}
				}
				imageSize
			}
		}
	`,
};

AcfCardPicture.displayName = "AcfCardPicture";

