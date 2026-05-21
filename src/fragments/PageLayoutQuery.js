import { gql } from '@apollo/client';
import {
  COMMON_BLOCK_FRAGMENT_ENTRIES,
  COMMON_EDITOR_BLOCKS_FIELDS,
  OPTION_NAVIGATION_FIELDS,
  SEO_FIELDS,
} from './layoutQueryParts';

export const GET_LAYOUT_QUERY = gql`
  ${COMMON_BLOCK_FRAGMENT_ENTRIES}

  query GetPage(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      slug
      subtitle {
        subtitle
      }
      template {
        templateName
      }
      navigationInterne {
        navigationInterne {
          ancre
          intitule
            icon {
              node {
                mediaItemUrl
              }
            }
        }
      }
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      editorBlocks {
        ${COMMON_EDITOR_BLOCKS_FIELDS}
      }
      ${SEO_FIELDS}
    }
    ${OPTION_NAVIGATION_FIELDS}
  

    footer: templatePart(id: "footer", idType: SLUG) {
      ... on TemplatePart {
        editorBlocks {
          ${COMMON_EDITOR_BLOCKS_FIELDS}
        }
      }
    }
  }
`;