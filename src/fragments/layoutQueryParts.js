import blocks from '@/wp-blocks';
import { gql } from '@apollo/client';

export const COMMON_BLOCK_FRAGMENT_ENTRIES = gql`
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
`;

export const PRODUCT_BLOCK_FRAGMENT_ENTRIES = gql`
  ${blocks.OtherProductsSubcategoriesCards.fragments.entry}
`;

export const COMMON_EDITOR_BLOCKS_SPREADS = `
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
`;

export const PRODUCT_EDITOR_BLOCKS_SPREADS = `
  ...${blocks.OtherProductsSubcategoriesCards.fragments.key}
`;

export const COMMON_EDITOR_BLOCKS_FIELDS = `
  name
  __typename
  renderedHtml
  id: clientId
  parentId: parentClientId
  ${COMMON_EDITOR_BLOCKS_SPREADS}
`;

export const PRODUCT_EDITOR_BLOCKS_FIELDS = `
  ${COMMON_EDITOR_BLOCKS_FIELDS}
  ${PRODUCT_EDITOR_BLOCKS_SPREADS}
`;

export const OPTION_NAVIGATION_FIELDS = `
  optionNavigation {
    settingsNavigation {
      navigation {
        isDesktop
        isMobile
        label
        labelMobile
        slug
        icon {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const SEO_FIELDS = `
    seo {
    description
    title
    socialDescription
    socialTitle
    socialPicture {
        node {
            sourceUrl
        }
    }
    }
`;