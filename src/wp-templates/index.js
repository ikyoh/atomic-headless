import frontPage from './front-page';
import PageTemplate from "./page";
import SingleTemplate from "./single";
import SingleProduct from "./single-produits";

const templates = {
  page: PageTemplate,
  single: SingleTemplate,
  'single-produits': SingleProduct,
  'front-page': frontPage,
};

export default templates;
