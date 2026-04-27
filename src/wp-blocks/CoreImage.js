import { gql } from "@apollo/client";
import { getStyles, useBlocksTheme } from "@faustwp/blocks";
import Image from "next/image";
import Link from 'next/link';

// Helper function to parse size values, handling "auto" and pixel values.
const parseSize = (size) => {
    if (typeof size === 'string' && size.endsWith('px')) {
        return parseFloat(size.replace('px', ''));
    }
    if (typeof size === 'number') {
        return size;
    }
    return undefined; // Return undefined for "auto" or other unhandled cases.
};


export default function CoreImage({ attributes, mediaDetails, ...props }) {

	const theme = useBlocksTheme();
	const styles = getStyles(theme, {
		...props,
		attributes: attributes,
	});

    // Use width/height from attributes if available, otherwise from mediaDetails.
    // This gives priority to dimensions set in the editor.
    const width = parseSize(attributes.width) || mediaDetails.width;
    const height = parseSize(attributes.height) || mediaDetails.height;

    // The style object for the Next.js Image component.
    // It's often best to let Next.js handle layout, but we can pass specific styles.
    const imageStyle = {
        ...styles,
        // Let Next.js handle width and height for responsive images unless you have specific needs.
        // If the layout is "responsive", width and height on the style object can cause issues.
        // If you need to constrain size, do it on a container or use fill with a sized parent.
    };

    // The style for the figure container.
    const figureStyle = {
        ...styles,
        // The 'height' property from getStyles might be intended for the container.
        // If the image is set to fill, the container needs a defined size.
    };

    const image = (
        <Image
            src={attributes.url}
            alt={attributes.alt || 'Image'}
            width={width}
            height={height}
            style={imageStyle}
        />
    );


  return (
        <figure className={attributes.cssClassName} style={figureStyle}>
            {attributes.href ? (
                <Link href={attributes.href} target={attributes.linkTarget} rel={attributes.rel}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </figure>
  );
}

CoreImage.fragments = {
  key: `CustomCoreImageBlockFragment`,
  entry: gql`
    fragment CustomCoreImageBlockFragment on CoreImage {
mediaDetails {
          height
          width
          sizes {
            mimeType
            width
            height
          }
        }
        attributes {
          url
          alt
          width
          height
          cssClassName
          href
          linkTarget
          align
          style
          src
        }
    }
  `,
};

CoreImage.displayName = "CoreImage";
