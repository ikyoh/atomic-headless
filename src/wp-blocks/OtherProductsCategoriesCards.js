import CardZoomLink from "@/components/CardZoomLink";
import { gql, useQuery } from "@apollo/client";

export default function OtherProductsCategoriesCards() {

	const GET_PRODUCTS = gql`
	query Products {
		products(first: 500) {
			nodes {
				parentId
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
				options {
					order
					image {
					node {
						altText
						mediaItemUrl
						mimeType
					}
					}
				}
				children {
					nodes {
						id
					}
				}
			}
		}
	}
`;

	const { data, loading } = useQuery(GET_PRODUCTS, {
	query: GET_PRODUCTS,
	});

	console.log('data', data)
	if (loading) return null

	return (
		<>
			{data?.products?.nodes?.filter(product => product.parentId === null).sort((a, b) => (a.options?.order || 0) - (b.options?.order || 0)).map((product) => (
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