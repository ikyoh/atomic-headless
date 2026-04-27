export default function parseJSON(value) {
    if (typeof value !== "string") return formatPreset(value);

    try {
        const parsed = JSON.parse(value);
        return formatPreset(parsed);
    } catch {
        return value;
    }
}

function formatPreset(obj) {
    if (Array.isArray(obj)) {
        return obj.map(formatPreset);
    }

    if (obj && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, val]) => [key, formatPreset(val)])
        );
    }

    if (typeof obj === "string" && obj.startsWith("var:preset|")) {
        return `var(${obj.replace("var:preset|", "--wp--preset--").replace(/\|/g, "--")})`;
    }

    return obj;
}