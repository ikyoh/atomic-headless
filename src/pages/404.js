import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import ProductsBigMenu from "@/components/ProductsBigMenu";
import blocks from "@/wp-blocks";
import { gql } from "@apollo/client";
import { WordPressBlocksViewer } from "@faustwp/blocks";
import { flatListToHierarchical, getGraphqlEndpoint } from "@faustwp/core";
import { print } from "graphql";
import "../../faust.config.js";

const PAGE_404_QUERY = gql`
	${blocks.CoreParagraph.fragments.entry}
	${blocks.CoreColumns.fragments.entry}
	${blocks.CoreColumn.fragments.entry}
	${blocks.CoreButtons.fragments.entry}
	${blocks.CoreButton.fragments.entry}
	${blocks.CoreQuote.fragments.entry}
	${blocks.CoreImage.fragments.entry}
	${blocks.CoreSeparator.fragments.entry}
	${blocks.CoreList.fragments.entry}
	${blocks.CoreHeading.fragments.entry}
	${blocks.OtherFooterCta.fragments.entry}
	${blocks.OtherProductsCategoriesCards.fragments.entry}
	${blocks.AcfCardHeader.fragments.entry}
	${blocks.AcfCardPicture.fragments.entry}
	${blocks.AcfCardLink.fragments.entry}
	${blocks.AcfItemPicture.fragments.entry}
	${blocks.AcfTeam.fragments.entry}
	${blocks.AcfCarousel.fragments.entry}
	${blocks.AcfCarouselRoundedCards.fragments.entry}
	${blocks.AcfCarouselLabelCards.fragments.entry}
	${blocks.AcfKnowHowCard.fragments.entry}
	${blocks.AcfLogos.fragments.entry}
	${blocks.AcfYoutube.fragments.entry}
	${blocks.AcfTimeline.fragments.entry}
	${blocks.AcfAccordionPicture.fragments.entry}
	${blocks.CoreGroup.fragments.entry}

	query Get404Page($uri: String!) {
		pageBy(uri: $uri) {
			title
			subtitle {
				subtitle
			}
			featuredImage {
				node {
					mediaItemUrl
				}
			}
			editorBlocks {
				name
				__typename
				renderedHtml
				id: clientId
				parentId: parentClientId
			}
		}

		footer: templatePart(id: "footer", idType: SLUG) {
			... on TemplatePart {
				editorBlocks {
					name
					__typename
					renderedHtml
					id: clientId
					parentId: parentClientId
					...${blocks.CoreParagraph.fragments.key}
					...${blocks.CoreColumns.fragments.key}
					...${blocks.CoreColumn.fragments.key}
					...${blocks.CoreButtons.fragments.key}
					...${blocks.CoreButton.fragments.key}
					...${blocks.CoreQuote.fragments.key}
					...${blocks.CoreImage.fragments.key}
					...${blocks.CoreSeparator.fragments.key}
					...${blocks.CoreList.fragments.key}
					...${blocks.CoreHeading.fragments.key}
					...${blocks.OtherFooterCta.fragments.key}
					...${blocks.OtherProductsCategoriesCards.fragments.key}
					...${blocks.AcfCardPicture.fragments.key}
					...${blocks.AcfCardLink.fragments.key}
					...${blocks.AcfCardHeader.fragments.key}
					...${blocks.AcfItemPicture.fragments.key}
					...${blocks.AcfTeam.fragments.key}
					...${blocks.AcfCarousel.fragments.key}
					...${blocks.AcfCarouselRoundedCards.fragments.key}
					...${blocks.AcfCarouselLabelCards.fragments.key}
					...${blocks.AcfKnowHowCard.fragments.key}
					...${blocks.AcfLogos.fragments.key}
					...${blocks.AcfYoutube.fragments.key}
					...${blocks.AcfAccordionPicture.fragments.key}
					...${blocks.AcfTimeline.fragments.key}
					...${blocks.CoreGroup.fragments.key}
				}
			}
		}
	}
`;

export default function Custom404({ data }) {
	const page = data?.page;
	const footerBlocks = data?.footer?.editorBlocks;

	if (!page) {
		return (
			<Layout footerBlocks={footerBlocks}>
				<ProductsBigMenu />
				<main id="content">
					<h1>Page not found</h1>
				</main>
			</Layout>
		);
	}

	const blockList = flatListToHierarchical(page.editorBlocks ?? [], {
		childrenKey: "innerBlocks",
	});

	return (
		<Layout footerBlocks={footerBlocks}>
			<ProductsBigMenu />
			<Hero
				featuredURL={page.featuredImage?.node?.mediaItemUrl}
				title={page.title}
				subtitle={page.subtitle?.subtitle}
			/>
			<main id="content">
				<WordPressBlocksViewer blocks={blockList} />
			</main>
		</Layout>
	);
}

async function fetchPageByUri({ endpoint, uri }) {
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: print(PAGE_404_QUERY),
			variables: {
				uri,
			},
		}),
	});
    console.log('response', response)

	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(
			`WPGraphQL request failed: ${response.status} ${response.statusText} - ${errorBody}`
		);
	}

	const payload = await response.json();
	if (payload.errors?.length) {
		const message = payload.errors.map((error) => error.message).join("; ");
		throw new Error(`WPGraphQL errors: ${message}`);
	}

	return payload.data ?? null;
}

export async function getStaticProps() {
	const endpoint = getGraphqlEndpoint();

	try {
		const attempts = ["page-404", "/page-404", "/page-404/"];

		let data = null;
		for (const uri of attempts) {
			data = await fetchPageByUri({ endpoint, uri });
			if (data?.pageBy) {
				break;
			}
		}

		return {
			props: {
				data: data?.pageBy
					? { page: data.pageBy, footer: data.footer ?? null }
					: null,
			},
			revalidate: false,
		};
	} catch (error) {
		console.error("Failed to fetch 404 page data", error);
		return {
			props: {
				data: null,
			},
			revalidate: false,
		};
	}
}
