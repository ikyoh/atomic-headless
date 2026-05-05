import CardZoomLink from "@/components/CardZoomLink";
import { gql } from "@apollo/client";

export default async function OtherProductsCategoriesCards() {


	const GET_PRODUCT_NO_PARENTS = gql`
		query ProductsNoParent {
			products(where: {parent: 0}) {
				nodes {
					id
					uri
					title
					featuredImage {
						node {
						altText
						mediaItemUrl
						mimeType
						}
					}
				}
			}
		}
	`;

	const { data } = await client.query({
	query: GET_PRODUCT_NO_PARENTS,
	});

	console.log('data', data)
	
	return (
		<>
			{products?.nodes?.map((product) => (
				product.featuredImage && (
					<CardZoomLink
						key={product.id}
						imageURL={product.featuredImage?.node?.mediaItemUrl}
						text={product.title}
						link={product.uri}
					/>
				)
			))}
		</>
	);
}

OtherProductsCategoriesCards.fragments = {
	key: `OtherProductsCategoriesCardsBlockFragment`,
	entry: gql`
		fragment OtherProductsCategoriesCardsBlockFragment on OtherProductsCategoriesCards {
			__typename
		}
	`,
};

OtherProductsCategoriesCards.displayName = "OtherProductsCategoriesCards";