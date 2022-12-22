import React, { useState } from "react";
import Navigation from "../../navigation";
import ShoppingCartItem from "../../shoppingCart/shoppingCartItem";
import classes from "../../../modules/shoppingCart.module.css";
import ShoppingCardButton from "../../shoppingCart/shoppingCartButton";
import { Link, useHistory } from "react-router-dom";
import { useShopping } from "../../hooks/useShopping";
import { useSelector } from "react-redux";
import { getCurrentUser, getLoadingStatus } from "../../../store/user";

const ShoppingCart = () => {
    const history = useHistory();
    const { cartItems, isLoading, resultPrice } = useShopping();
    const userLoading = useSelector(getLoadingStatus());
    const currentUser = useSelector(getCurrentUser());
    const [hoverButton, setHoverButton] = useState(false);
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleSubmitBuying = () => {
        console.log(resultPrice);
    };
    const handleReturnToMain = () => {
        history.push("/");
    };
    if (isLoading) {
        return (
            <div style={{ padding: "148px 0 85px 10px" }}>
                <div className="d-flex ">
                    <div className={classes.loading}>
                        <div
                            style={{ width: "5rem", height: "5rem" }}
                            className="spinner-border text-warning"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div style={{ padding: "148px 0 85px 10px" }}>
            <Navigation />
            <h2 className={classes.title}>Корзина</h2>
            <div className="d-flex ">
                <div>
                    {cartItems
                        .filter((c) => c !== undefined)
                        .map((cart) => {
                            return (
                                <ShoppingCartItem key={cart._id} cart={cart} />
                            );
                        })}
                </div>

                {cartItems.length > 0 && (
                    <div className={classes.buyingWrapper}>
                        <p className={classes.buyingSum}>
                            Сумма:{" "}
                            <span className={classes.buyingSpan}>
                                {resultPrice} ₽
                            </span>
                        </p>
                        <label className={classes.buyingLabel} htmlFor="">
                            Промокод:
                        </label>
                        <div className={classes.buyingInputWrapper}>
                            <input
                                className={classes.buyingInput}
                                type="text"
                            />
                            <button className={classes.buyingInputButton}>
                                <i className="bi bi-check-lg"></i>
                            </button>
                        </div>
                        <ShoppingCardButton
                            onClick={handleSubmitBuying}
                            title="Оформить заказ"
                            orange={true}
                            onHoverButton={toggleHoverButton}
                            hoverButton={hoverButton}
                            icon={false}
                        />
                        <ShoppingCardButton
                            onClick={handleSubmitBuying}
                            title="Купить в один клик"
                            orange={false}
                        />
                    </div>
                )}
                {((cartItems.length === 0 && !isLoading) ||
                    (!currentUser && !userLoading)) && (
                    <div className={classes.emptyCartWrapper}>
                        <div className={classes.emptyCartImage}>
                            <i className="bi bi-cart4"></i>
                        </div>
                        <p className={classes.emptyCartTitle}>
                            Ваша корзина пуста
                        </p>
                        <Link to="/" onClick={handleReturnToMain}>
                            <span className={classes.emptyCartLink}>
                                Нажмите здесь
                            </span>
                        </Link>
                        <span className={classes.emptyCartText}>
                            , чтобы продолжить покупки
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
