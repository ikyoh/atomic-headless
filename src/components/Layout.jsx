import Footer from "@/components/Footer";
import GoTop from "./GoTop";
import H2TopOffsetHighlighter from "./H2TopOffsetHighlighter";
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({ children }) {
    return (
        <>
            <H2TopOffsetHighlighter />
            <Header />
            {children}
            <GoTop />
            <Footer />
            <Menu isMobile />
        </>
    );
}