import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { gql } from "@apollo/client";
import Image from "next/image";

export default function AcfCarousel({blockCarousel}) {

	return (
		<Carousel
			opts={{
			align: "start",
			loop: true,
			}}
		>
			<CarouselContent>
				{blockCarousel?.gallery?.nodes?.map((item, index) => (
					<CarouselItem key={index} className="pl-0">
							<Image
								src={item.mediaItemUrl}
								alt={item.altText || "Alt text not available"}
								width={500}
								height={500}
								className="object-cover w-full h-120"
							/>
					</CarouselItem>
				))} 
			</CarouselContent>
			<CarouselPrevious className="left-5 md:left-30" />
			<CarouselNext className="right-5 md:right-30" />
		</Carousel>

	);
}

AcfCarousel.fragments = {
	key: `AcfCarouselBlockFragment`,
	entry: gql`
		fragment AcfCarouselBlockFragment on AcfCarousel {
			blockCarousel {
				gallery {
					nodes {
					mediaItemUrl
					}
				}
			}
		}
	`,
};

AcfCarousel.displayName = "AcfCarousel";

