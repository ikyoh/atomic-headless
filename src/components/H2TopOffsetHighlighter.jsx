"use client"

import { useEffect } from "react";

export default function H2TopOffsetHighlighter() {
    useEffect(() => {
        let frameId = null;

        const updateH2Highlight = () => {
            const headings = document.querySelectorAll("h2");

            headings.forEach((heading) => {
                const rect = heading.getBoundingClientRect();
                const isAtTopOffset = rect.top <= 60 && rect.bottom >= 60;

                heading.classList.toggle("h2-top-60-active", isAtTopOffset);
            });
        };

        const onScrollOrResize = () => {
            if (frameId !== null) return;

            frameId = window.requestAnimationFrame(() => {
                updateH2Highlight();
                frameId = null;
            });
        };

        updateH2Highlight();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }

            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, []);

    return null;
}
