import Footer from "@/components/Footer";
import GoTop from "./GoTop";
import H2TopOffsetHighlighter from "./H2TopOffsetHighlighter";
import Header from "./Header";
import SEO from "./SEO";

export default function Layout({ children, footerBlocks, seo, slug, navigationItems = [] }) {


    return (
        <>
            <SEO title={seo?.titre || "Atomic Néon"}
                description={seo?.description || "Atomic Néon, fabriquant d'enseignes, signalétiques et de néons sur mesure, alliant savoir-faire traditionnel et innovation pour créer des pièces uniques et lumineuses."}
                socialpicture={seo?.socialpicture || null}
                slug={slug || null}
            />
            <H2TopOffsetHighlighter />
            <Header navigationItems={navigationItems} />
            {children}
            <GoTop />
            <Footer editorBlocks={footerBlocks} />
        </>
    );
}