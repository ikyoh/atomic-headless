import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {
  return null;
}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://atomic.fr",
    sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
  });
}
