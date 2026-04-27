import CardZoomLink from "@/components/CardZoomLink";
import { gql, useQuery } from "@apollo/client";

export default function OtherProductsCategoriesCards() {


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

const { data, loading, error } = useQuery(GET_PRODUCT_NO_PARENTS);

if (loading) return null;
if (error) return <p>Error: {error.message}</p>;


	
	return (
		<>
			{data?.products?.nodes?.map((product) => (
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