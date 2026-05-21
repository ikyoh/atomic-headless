import AsideNavigation from '@/components/AsideNavigation';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { flatListToHierarchical } from '@faustwp/core';
import HeroYoutube from '../components/HeroYoutube';
import Layout from '../components/Layout';
import ProductsBigMenu from '../components/ProductsBigMenu';
import { GET_LAYOUT_QUERY } from '../fragments/PageLayoutQuery';

export default function Component(props) {

	const { title, subtitle, slug, featuredImage, editorBlocks, navigationInterne, template, seo } = props.data.page;
  const blockList = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });
  const footerBlocks = props.data.footer?.editorBlocks;
	const optionNavigation = props.data.optionNavigation?.settingsNavigation?.navigation || [];

  return (
    <Layout footerBlocks={footerBlocks} navigationItems={optionNavigation} seo={seo} slug={slug}>
      <ProductsBigMenu />
      <HeroYoutube title={title} subtitle={subtitle.subtitle} />
            {navigationInterne?.navigationInterne && <AsideNavigation items={navigationInterne.navigationInterne} />}
        <main id="content">
          <WordPressBlocksViewer blocks={blockList} />
        </main>
    </Layout>
  );
}

Component.query = GET_LAYOUT_QUERY

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};