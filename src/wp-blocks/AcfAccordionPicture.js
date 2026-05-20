import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import { gql } from "@apollo/client";
import Image from "next/image";
import { useState } from "react";

export default function AcfAccordionPicture({blockAccordionWithPicture}) {
	const blocks = blockAccordionWithPicture?.blocks ?? [];
	const [activeIndex, setActiveIndex] = useState(0);
		const activeBlock = blocks[activeIndex];

	return (
		<div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center px-5">
			<div className="w-full space-y-2">
				<Accordion defaultValue={["0"]} className="w-full space-y-2">
				{blocks.map((block, index) => (
					<AccordionItem
						value={index.toString()}
						key={index}
						onClick={() => setActiveIndex(index)}
						className={cn("border-2 border-primary rounded-md bg-primary", (activeIndex === index ? "bg-white drop-shadow-md/30" : "primary"))}
					>
						<AccordionTrigger className={cn("py-2 uppercase font-bold", (activeIndex === index ? "text-primary" : "text-white"))}>{block.title}</AccordionTrigger>
						<AccordionContent>
							<div className="px-5 pb-3">
								<p className="text-black font-bold mb-2">{block.subtitle}</p>
								<p className="text-black">{block.content}</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
				</Accordion>
			</div>
			<div className="bg-dark p-5 rounded-xl border-white/50 h-60 md:h-full">
				{activeBlock?.image?.node?.mediaItemUrl && (
					<Image
						src={activeBlock.image.node.mediaItemUrl}
						alt={activeBlock.image.node.altText ?? ""}
						height={200}
						width={200}
						className="w-full h-full object-cover rounded-md border border-white/50"
					/>
				)}
			</div>
		</div>
	);
}

AcfAccordionPicture.fragments = {
	key: `AcfAccordionPictureBlockFragment`,
	entry: gql`
		fragment AcfAccordionPictureBlockFragment on AcfAccordionPicture {
			blockAccordionWithPicture {
				blocks {
					title
					subtitle
					content
					image {
						node {
							mediaItemUrl
							altText
							mimeType
						}
					}
				}
			}	
		}
	`,
};

AcfAccordionPicture.displayName = "AcfAccordionPicture";

