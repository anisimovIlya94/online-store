import React, { useState } from "react";
import classes from "../../modules/main.module.css";
import MainCardButton from "./buttons/mainCardButton";
import { useShopping } from "../hooks/useShopping";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateUser } from "../../store/user";
import PropTypes from "prop-types";

const MainCard = ({ cardInformation }) => {
    const [hoverButton, setHoverButton] = useState(false);
    const currentUser = useSelector(getCurrentUser());
    const dispatch = useDispatch();
    const { getItemById } = useShopping();
    const isInCart = getItemById(cardInformation._id);
    const history = useHistory();
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch(
                updateUser({
                    ...currentUser,
                    shoppingCart: [
                        ...currentUser.shoppingCart,
                        cardInformation._id
                    ]
                })
            );
        }
    };
    const handleGoToCart = () => {
        window.scrollTo(0, 0);
        history.push("/shopping");
    };
    const handleGetToProductCard = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div
            className={"card border-light " + classes.mainCardWrapper}
            style={{ borderRadius: "15px" }}
        >
            <img
                src={require(`../../images/product/productsLibrary/${cardInformation.images[0]}`)}
                className={"card-img-top " + classes.imageSize}
                alt="..."
            />
            <div className="card-body">
                <Link
                    onClick={handleGetToProductCard}
                    to={`/catalog/${cardInformation.categories[0]}/${cardInformation.subcategories[0]}/${cardInformation._id}`}
                    className={classes.productLinkStyle}
                >
                    <h5 className={classes.mainCardTitle}>
                        {cardInformation.name}
                    </h5>
                </Link>

                <p className={classes.mainCardPrice}>
                    {cardInformation.currentPrice} ₽
                </p>
                {isInCart ? (
                    <MainCardButton
                        title={"В корзине"}
                        ancer={true}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                    />
                ) : (
                    <MainCardButton
                        title={"В корзину"}
                        orange={true}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                        icon={true}
                        onShopCart={handleAddToCart}
                    />
                )}
                <MainCardButton title={"Купить в один клик"} orange={false} />
            </div>
        </div>
    );
};


MainCard.propTypes = {
    cardInformation: PropTypes.object.isRequired
};

export default MainCard;
