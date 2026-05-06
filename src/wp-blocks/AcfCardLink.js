import { gql } from "@apollo/client";
import CardZoomLink from "../components/CardZoomLink";

export default function AcfCardLink({blockCardWithLink}) {

	console.log('blockCardWithLink', blockCardWithLink)

	return (
		<CardZoomLink
			imageURL={blockCardWithLink.image.node.mediaItemUrl}
			text={blockCardWithLink.label}
			link={blockCardWithLink.link}
		/>
	);
}

AcfCardLink.fragments = {
	key: `AcfCardLinkBlockFragment`,
	entry: gql`
		fragment AcfCardLinkBlockFragment on AcfCardLink {
			blockCardWithLink {
				label
				link
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

AcfCardLink.displayName = "AcfCardLink";

