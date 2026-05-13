import Footer from "@/components/Footer";
import GoTop from "./GoTop";
import H2TopOffsetHighlighter from "./H2TopOffsetHighlighter";
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({ children, footerBlocks, navigationItems = [] }) {

    console.log('LAYOUT navigationItems', navigationItems)

    return (
        <>
            <H2TopOffsetHighlighter />
            <Header navigationItems={navigationItems} />
            {children}
            <GoTop />
            <Footer editorBlocks={footerBlocks} />
            <Menu isMobile navigationItems={navigationItems} />
        </>
    );
}