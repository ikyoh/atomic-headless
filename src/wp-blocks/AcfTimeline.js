import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { gql } from "@apollo/client";
import Image from "next/image";

export default function AcfTimeline({blockTimeline}) {

	return (

		<ScrollArea className="mx-auto max-w-screen md:max-w-(--wp--style--global--content-size)">
            <div className="flex w-max space-x-6 py-5">
				{blockTimeline?.blocks?.map((block,index)  => (
                    <div key={`timeline_${index}`} className="w-60">
                        <div className="aspect-square rounded-full overflow-hidden w-27 h-27">
							<Image 
							 src={block.image?.node?.mediaItemUrl}
							 alt=""
							 height={200}
							 width={200}
							 className="h-full w-full object-cover"
							/>
						</div>
                            <p className="font-bold uppercase">{block.date}</p>
                            <p className='text-sm! leading-5!'>{block.content}</p>
                     
                    </div>
                ))
                }
            </div >
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

	);
}

AcfTimeline.fragments = {
	key: `AcfTimelineBlockFragment`,
	entry: gql`
		fragment AcfTimelineBlockFragment on AcfTimeline {
			blockTimeline {
					blocks {
						date
						content
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

AcfTimeline.displayName = "AcfTimeline";

