import { getSitemapProps } from "@faustwp/core";

export default function Sitemap() {}

export function getServerSideProps(ctx) {
    return getSitemapProps(ctx, {
        frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
        sitemapPathsToIgnore: ["/wp-sitemap-users-*","/wp-sitemap-taxonomies-*","/wp-sitemap-posts-wp_template_*"],
    });
}
