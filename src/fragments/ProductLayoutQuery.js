import { gql } from '@apollo/client';
import {
  COMMON_BLOCK_FRAGMENT_ENTRIES,
  OPTION_NAVIGATION_FIELDS,
  PRODUCT_BLOCK_FRAGMENT_ENTRIES,
  PRODUCT_EDITOR_BLOCKS_FIELDS,
  SEO_FIELDS,
} from './layoutQueryParts';

export const GET_LAYOUT_QUERY = gql`
	${COMMON_BLOCK_FRAGMENT_ENTRIES}
	${PRODUCT_BLOCK_FRAGMENT_ENTRIES}

	query GetProductByUri($uri: String!) {
		productBy(uri: $uri) {
			title
      slug
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
				${PRODUCT_EDITOR_BLOCKS_FIELDS}
			}
      ${SEO_FIELDS}
    }

		${OPTION_NAVIGATION_FIELDS}

		footer: templatePart(id: "footer", idType: SLUG) {
			... on TemplatePart {
				editorBlocks {
					${PRODUCT_EDITOR_BLOCKS_FIELDS}
				}
			}
		}
	}
`;