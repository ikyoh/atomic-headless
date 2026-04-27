import { gql, useQuery } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import Image from "next/image";
import parseJSON from "../lib/parseJSON";

export default function AcfItemPicture({attributes, innerBlocks}) {

	const data = parseJSON(attributes?.data) || {};

	const imageId = data?.image

	const GET_MEDIA = gql`
		query GetMedia($id: ID!) {
			mediaItem(id: $id, idType: DATABASE_ID) {
				mediaItemUrl
				altText
				mimeType
			}
		}
	`;

	const { data: mediaData, loading } = useQuery(GET_MEDIA, {
		variables: { id: imageId },
		skip: !imageId,
	});

	if (loading || !mediaData || !mediaData.mediaItem) {
		return <div>Loading...</div>;
	}

	return (
        <div className='flex items-start gap-3'>
			<div className="bg-primary rounded-full overflow-hidden w-7.5 h-7.5 p-x shadow-md shadow-primary/20 -mt-1">
				<Image
					src={mediaData.mediaItem.mediaItemUrl}
					alt={mediaData.mediaItem.altText || 'Alt text not available'}
					width={200}
					height={200}
					className="object-cover w-full h-full"
					unoptimized={mediaData.mediaItem.mimeType === "image/svg+xml" ? true : false}
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
		}
	`,
};

AcfItemPicture.displayName = "AcfItemPicture";

