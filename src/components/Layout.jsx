import Footer from "@/components/Footer";
import GoTop from "./GoTop";
import H2TopOffsetHighlighter from "./H2TopOffsetHighlighter";
import Header from "./Header";

export default function Layout({ children, footerBlocks, navigationItems = [] }) {


    return (
        <>
            <H2TopOffsetHighlighter />
            <Header navigationItems={navigationItems} />
            {children}
            <GoTop />
            <Footer editorBlocks={footerBlocks} />
        </>
    );
}