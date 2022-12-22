import React from "react";
import classes from "../../modules/header.module.css";
import { Link } from "react-router-dom";
import { useShopping } from "../hooks/useShopping";

const ShoppingCartButton = () => {
    const { cartItems } = useShopping();
    let count = cartItems.length || 0;
    const windowUp = () => {
        window.scrollTo(0, 0);
    };
    return (
        <Link
            to={"/shopping"}
            className={classes.shoppingCart}
            onClick={windowUp}
        >
            <span className="position-relative">
                <span className={classes.cartIcon}>
                    <i className="bi bi-cart3"></i>
                </span>
                <span className="position-absolute top--1 start-100 translate-middle badge rounded-pill bg-warning">
                    {count}
                </span>
            </span>
        </Link>
    );
};

export default ShoppingCartButton;
