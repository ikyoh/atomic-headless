export function normalizeBlockAttributes(attributes = {}) {
    const result = { ...attributes };

    Object.keys(result).forEach((key) => {
    const value = result[key];

    if (typeof value === "string") {
        const first = value.trim()[0];

        if (first === "{" || first === "[") {
        try {
            result[key] = JSON.parse(value);
        } catch {}
        }
    }
    });

    return result;
}

export function normalizeBlocks(blocks = []) {
    return blocks.map((block) => ({
    ...block,
    attributes: normalizeBlockAttributes(block.attributes),
    innerBlocks: block.innerBlocks
        ? normalizeBlocks(block.innerBlocks)
        : [],
    }));
}