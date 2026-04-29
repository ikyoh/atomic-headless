import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import Image from "next/image";


export default function AcfItemPicture({innerBlocks, blockItemPicture}) {


	return (
        <div className='flex items-start gap-3 my-3'>
			<div className="bg-primary rounded-full overflow-hidden w-7.5 h-7.5 p-x shadow-md shadow-primary/20 -mt-1">
				<Image
					src={blockItemPicture.image.node.mediaItemUrl}
					alt={blockItemPicture.image.node.altText || 'Alt text not available'}
					width={200}
					height={200}
					className="object-cover w-full h-full"
					unoptimized={blockItemPicture.image.node.mimeType === "image/svg+xml" ? true : false}
				/>
			</div>
				{Array.isArray(innerBlocks) && innerBlocks.length > 0 && (
					<WordPressBlocksViewer blocks={innerBlocks} />
				)}
		</div>
	);
}

AcfItemPicture.fragments = {
	key: `AcfItemPictureBlockFragment`,
	entry: gql`
		fragment AcfItemPictureBlockFragment on AcfItemPicture {
			attributes {
				data
			}
			blockItemPicture {
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

AcfItemPicture.displayName = "AcfItemPicture";

