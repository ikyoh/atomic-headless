import { gql } from '@apollo/client';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductsBigMenu from '../components/ProductsBigMenu';
import blocks from '../wp-blocks';

export default function SingleProduct(props) {

	const { title, subtitle, featuredImage, editorBlocks, template } = props.data.productBy;
	const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });
	const footerBlocks = props.data.footer?.editorBlocks;


	return (
	<Layout footerBlocks={footerBlocks}>
		<ProductsBigMenu />
		<Hero featuredURL={featuredImage?.node?.mediaItemUrl} title={title} subtitle={subtitle?.subtitle} isImageContain={template.templateName ==='Page-header-contain'} />
		<main id="content">
			<WordPressBlocksViewer blocks={blockList} />
		</main>	
	</Layout>
	);
}

SingleProduct.variables = ({ uri }) => {
	return { uri };
};

SingleProduct.query = gql`
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

	query GetProductByUri($uri: String!) {
		productBy(uri: $uri) {
			title
			subtitle {
				subtitle
			}
			id
			template {
				templateName
			}
			featuredImage {
				node {
					altText
					mediaItemUrl
				}
			}
			editorBlocks {
				name
				__typename
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
					...${blocks.OtherProductsSubcategoriesCards.fragments.key}
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