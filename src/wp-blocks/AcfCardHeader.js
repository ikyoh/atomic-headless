import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import parseJSON from "../lib/parseJSON";

export default function AcfCardHeader({attributes, innerBlocks}) {

	const data = parseJSON(attributes?.data) || {};

	return (
		<Card className="border border-primary overflow-hidden">
            <CardHeader className='text-center bg-primary text-white text-lg font-bold uppercase pt-4 pb-3'>
                {data.title}
            </CardHeader>
			<CardContent className='p-6'>
				{Array.isArray(innerBlocks) && innerBlocks.length > 0 && (
					<WordPressBlocksViewer blocks={innerBlocks} />
				)}
			</CardContent>
		</Card>
	);
}

AcfCardHeader.fragments = {
	key: `AcfCardHeaderBlockFragment`,
	entry: gql`
		fragment AcfCardHeaderBlockFragment on AcfCardHeader {
			attributes {
				data
			}
		}
	`,
};

AcfCardHeader.displayName = "AcfCardHeader";

