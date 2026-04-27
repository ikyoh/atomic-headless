import CardZoomLink from "@/components/CardZoomLink";
import { gql, useQuery } from "@apollo/client";
import { usePathname } from 'next/navigation';

export default function OtherProductsSubcategoriesCards() {

	const pathname = usePathname()
	const slugs = pathname.split('/').filter(Boolean); 
	const uri = slugs[slugs.length - 1]; // Get the last segment of the URL

	const GET_SUBCATEGORIES = gql`
		query GetProductsSubcategories($uri: String!) {
			productBy(uri: $uri) {
				title
				uri
				children {
					nodes {
						... on Product {
						id
						title
						uri
						featuredImage {
							node {
							altText
							mediaItemUrl
							}
						}
						options {
							image {
							node {
								altText
								mediaItemUrl
							}
							}
						}
						featuredImage {
							node {
							altText
							mediaType
							}
						}
					}
				}
			}
		}
	}
	`;
	
const { data, loading, error } = useQuery(GET_SUBCATEGORIES, {
		variables: { uri: uri },
		skip: !uri,});

	if (loading) return null;
	if (error) return <p>Error: {error.message}</p>;


	return (
		<>
			{data?.productBy?.children?.nodes?.map((product) => (
				(product.options?.image?.node?.mediaItemUrl || product.featuredImage?.node?.mediaItemUrl) && (
					<CardZoomLink
						key={product.id}
						imageURL={product.options?.image?.node?.mediaItemUrl || product.featuredImage?.node?.mediaItemUrl}
						text={product.title}
						link={product.uri}
					/>
				)
			))}
		</>
	);

}




OtherProductsSubcategoriesCards.fragments = {
	key: `OtherProductsSubcategoriesCardsBlockFragment`,
	entry: gql`
		fragment OtherProductsSubcategoriesCardsBlockFragment on OtherProductsSubcategoriesCards {
			__typename
		}
	`,
};

OtherProductsSubcategoriesCards.displayName = "OtherProductsSubcategoriesCards";