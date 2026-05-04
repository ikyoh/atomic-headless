import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { gql } from "@apollo/client";
import Image from "next/image";

export default function AcfCarouselLabelCards({carouselWithLabelsCards}) {


	return (
		<Carousel
			opts={{
			align: "start",
			loop: true,
			}}
			className="mx-auto max-w-[calc(100vw-100px)] md:max-w-(--wp--style--global--content-size)"
		>
			<CarouselContent>
				{carouselWithLabelsCards?.cards?.map((card, index) => (
					<CarouselItem key={index} className="basis-1/3 md:basis-1/2 pl-(--wp--preset--spacing--base)">
						<div className="h-full rounded-md p-(--wp--preset--spacing--base) bg-medium">
							<Image
								src={card.image.node.mediaItemUrl}
								alt={card.image.node.altText || "Alt text not available"}
								width={350}
								height={220}
								className="object-cover w-full h-55"
								unoptimized={card.image.node.mimeType === "image/svg+xml"}
							/>
							<p className="text-(size:--wp--preset--font-size--small) font-bold mt-(--wp--preset--spacing--base)">{card.text}</p>
						</div>
					</CarouselItem>
				))} 
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>

	);
}

AcfCarouselLabelCards.fragments = {
	key: `AcfCarouselLabelCardsBlockFragment`,
	entry: gql`
		fragment AcfCarouselLabelCardsBlockFragment on AcfCarouselLabelCards {
			carouselWithLabelsCards {
				cards {
					text
					image {
					node {
						mediaItemUrl
					}
              	}
				}
			}
		}
	`,
};

AcfCarouselLabelCards.displayName = "AcfCarouselLabelCards";

