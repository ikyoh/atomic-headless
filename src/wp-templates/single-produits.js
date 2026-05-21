import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductsBigMenu from '../components/ProductsBigMenu';
import { GET_LAYOUT_QUERY } from '../fragments/ProductLayoutQuery';

export default function SingleProduct(props) {

	const { title, subtitle, slug, featuredImage, editorBlocks, template, seo } = props.data.productBy;
	const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });
	const footerBlocks = props.data.footer?.editorBlocks;
	const optionNavigation = props.data.optionNavigation?.settingsNavigation?.navigation || [];


	return (
		<Layout footerBlocks={footerBlocks} navigationItems={optionNavigation} seo={seo} slug={slug}>
			<ProductsBigMenu />
			<Hero featuredURL={featuredImage?.node?.mediaItemUrl} title={title} subtitle={subtitle?.subtitle} isImageContain={template.templateName ==='Page-header-contain'} />
			<main id="content">
				<WordPressBlocksViewer blocks={blockList} />
			</main>	
		</Layout>
	);
}

SingleProduct.query = GET_LAYOUT_QUERY;

SingleProduct.variables = ({ uri }) => {
	return { uri };
};