import { gql } from '@apollo/client';
import { CoreBlocks } from '@faustwp/blocks';

export default function CoreHeading(props) {
  return <CoreBlocks.CoreHeading {...props} />;
}

CoreHeading.fragments = {
  key: 'CoreHeadingBlockFragment',
  entry: gql`
    fragment CoreHeadingBlockFragment on CoreHeading {
      attributes {
        align
        anchor
        backgroundColor
        content
        fontFamily
        fontSize
        gradient
        level
        style
        textColor
        cssClassName
      }
    }
  `,
};

CoreHeading.config = CoreBlocks.CoreHeading.config;
CoreHeading.displayName = 'CoreHeading';
