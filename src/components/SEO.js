import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image. NOTE: Must be an absolute url.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, socialDescription, socialTitle, socialpicture, slug }) {
  if (!title && !description) {
    return null;
  }

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        {/* <meta property="twitter:card" content="summary_large_image" /> */}

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={socialTitle || title} />
            {/* <meta property="twitter:title" content={title} /> */}
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={socialDescription || description} />
            {/* <meta property="twitter:description" content={description} /> */}
          </>
        )}

        {socialpicture && (
          <>
            <meta property="og:image" content={socialpicture.node.sourceUrl} />
            {/* <meta property="twitter:image" content={socialpicture.node.sourceUrl} /> */}
          </>
        )}

        {slug && (
          <>
            <meta property="og:url" content={process.env.NEXT_PUBLIC_WORDPRESS_URL + '/' + slug} />
            {/* <meta property="twitter:url" content={url} /> */}
          </>
        )}
      </Head>
    </>
  );
}