import AsideNavigation from '@/components/AsideNavigation';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import { AsideProvider } from '@/context/AsideContext';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import ProductsBigMenu from '../components/ProductsBigMenu';
import { GET_LAYOUT_QUERY } from '../fragments/PageLayoutQuery';

export default function PageTemplate(props) {

	const { title, subtitle, slug, featuredImage, editorBlocks, navigationInterne, template, seo } = props.data.page;
	const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });
	const footerBlocks = props.data.footer?.editorBlocks;
	const optionNavigation = props.data.optionNavigation?.settingsNavigation?.navigation || [];


	return (
    <AsideProvider>
      <Layout footerBlocks={footerBlocks} navigationItems={optionNavigation} seo={seo} slug={slug}>
        <ProductsBigMenu />
        <Hero featuredURL={featuredImage?.node?.mediaItemUrl} title={title} subtitle={subtitle.subtitle} />
        {navigationInterne?.navigationInterne && <AsideNavigation items={navigationInterne.navigationInterne} />}
        {/* {template?.templateName === "Page-realisations" && <AsideAchievementsTags />} */}
        <main id="content">
          <WordPressBlocksViewer blocks={blockList} />
        </main>
      </Layout>
    </AsideProvider>
	);
}

PageTemplate.query = GET_LAYOUT_QUERY;

PageTemplate.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

