export function parseSlug(slug) {
    const parts = slug.split('_');
    if (parts.length < 2) throw new Error("Slug invalide");

    const [product, ...rest] = parts;
    const title = rest.pop().replace(/-/g, ' ');

    return {
        product,
        tags: rest.map(tag => tag.toUpperCase()),
        title
    };
}