import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import parseJSON from "../lib/parseJSON";

export default function AcfCarouselRoundedCards({attributes}) {

	const data = parseJSON(attributes?.data) || {};


	const imageIds = data?.images || [];

	const GET_MEDIA = gql`
		query GetMedia($ids: [ID]) {
			mediaItems(where: { in: $ids }) {
				nodes {
					id
					mediaItemUrl
					altText
					mimeType
				}
			}
		}
	`;

	const { data: mediaDatas, loading } = useQuery(GET_MEDIA, {
		variables: { ids: imageIds },
		skip: !imageIds.length,
	});

	if (loading || !mediaDatas) {
		return <div>Loading...</div>;
	}


	return (
	<Carousel
		opts={{
        align: "start",
		loop: true,
		}}
		className="mx-auto max-w-[calc(100vw-100px)] md:max-w-(--wp--style--global--content-size)"
    >
		<CarouselContent>
			{mediaDatas?.mediaItems?.nodes?.map((image, index) => (
				<CarouselItem key={index} className="basis-1/3 md:basis-1/5">
					<div className="rounded-full overflow-hidden aspect-square">
						<Image
							src={image.mediaItemUrl}
							alt={image.altText || "Alt text not available"}
							width={160}
							height={160}
							className="object-cover w-full h-full"
							unoptimized={image.mimeType === "image/svg+xml"}
						/>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious className="left-4 md:-left-16" />
		<CarouselNext className="right-4 md:-right-16" />
    </Carousel>

	);
}

AcfCarouselRoundedCards.fragments = {
	key: `AcfCarouselRoundedCardsBlockFragment`,
	entry: gql`
		fragment AcfCarouselRoundedCardsBlockFragment on AcfCarouselRoundedCards {
			attributes {
				data
			}
		}
	`,
};

AcfCarouselRoundedCards.displayName = "AcfCarouselRoundedCards";

