import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {
  return null;
}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: "https://www.atomic.fr",
    sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
  });
}
