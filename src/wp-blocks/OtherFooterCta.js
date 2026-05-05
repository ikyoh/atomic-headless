import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export default function OtherFooterCta({ innerBlocks, ...props }) {

	return (
		<div className="py-10 space-y-5 custom_gradient">
			{Array.isArray(innerBlocks) && innerBlocks.length > 0 && (
				<WordPressBlocksViewer blocks={innerBlocks} />
			)}
		</div>
	);
}

OtherFooterCta.fragments = {
	key: `OtherFooterCtaBlockFragment`,
	entry: gql`
		fragment OtherFooterCtaBlockFragment on OtherFooterCta {
			__typename
		}
	`,
};

OtherFooterCta.displayName = "OtherFooterCta";