import React from "react";
import MainWrapper from "../../main/mainWrapper";
import MainCatalog from "../../main/mainCatalog";
import MainButton from "../../main/buttons/mainButton";
import Slick from "../../main/slick";
import MainEvents from "../../main/mainEvents";
import {
    getRecomendationsStatus,
    getSpecialOffers,
    getTimeToBuy
} from "../../../store/recomendations";
import { useSelector } from "react-redux";
import {
    getCatalogLoadingStatus,
    getProductsRedux
} from "../../../store/catalog";

const MainPage = () => {
    const timeToBuy = useSelector(getTimeToBuy());
    const specialOffers = useSelector(getSpecialOffers());
    const recomendationsLoading = useSelector(getRecomendationsStatus());
    const productsLoading = useSelector(getCatalogLoadingStatus());
    const products = useSelector(getProductsRedux());

    const getProductByCode = (code) => {
        return products.find((prod) => prod.code === code);
    };

    const getTimeToBuingProducts = () => {
        return timeToBuy.map((code) => {
            return getProductByCode(code.value);
        });
    };
    const getSpecialOffersProducts = () => {
        return specialOffers.map((code) => {
            return getProductByCode(code.value);
        });
    };
    return (
        <div style={{ padding: "0 0 85px 0" }}>
            <MainWrapper title="Каталог" marginTop="190px">
                <MainCatalog />
            </MainWrapper>
            <MainButton title="Весь каталог" />
            {!productsLoading && !recomendationsLoading && (
                <>
                    <MainWrapper title="Успей купить" marginTop="110px">
                        <Slick cards={getTimeToBuingProducts()} />
                    </MainWrapper>
                    <MainWrapper
                        title="Специальные предложения"
                        marginTop="110px"
                    >
                        <Slick cards={getSpecialOffersProducts()} />
                    </MainWrapper>
                </>
            )}
            <MainWrapper title="Ближайшие мероприятия" marginTop="110px">
                <MainEvents />
            </MainWrapper>
        </div>
    );
};

export default MainPage;
