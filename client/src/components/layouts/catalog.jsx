import { useParams } from "react-router-dom";
import CatalogPage from "../pages/catalogPage";
import ProductPage from "../pages/productPage/productPage";

const Catalog = () => {
    const { productId } = useParams();
    return productId ? <ProductPage /> : <CatalogPage />;
};

export default Catalog;
