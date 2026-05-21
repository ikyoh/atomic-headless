import { gql } from '@apollo/client';
import { CoreBlocks } from '@faustwp/blocks';

export default function CoreButton(props) {
  return <CoreBlocks.CoreButton {...props} />;
}

CoreButton.fragments = {
  key: 'CoreButtonBlockFragment',
  entry: gql`
    fragment CoreButtonBlockFragment on CoreButton {
      attributes {
        anchor
        gradient
        text
        textColor
        style
        fontSize
        fontFamily
        linkTarget
        rel
        url
        backgroundColor
        cssClassName
        linkClassName
      }
    }
  `,
};

CoreButton.config = CoreBlocks.CoreButton.config;
CoreButton.displayName = 'CoreButton';
