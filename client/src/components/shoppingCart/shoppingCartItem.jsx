import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../modules/shoppingCart.module.css";
import { useShopping } from "../hooks/useShopping";
import PropTypes from "prop-types";

const ShoppingCartItem = ({ cart }) => {
    const [count, setCount] = useState(1);
    const { removeItem, handleChangePrice } = useShopping();
    const handleChangeIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        handleChangePrice(cart.name, cart.currentPrice * newCount);
    };
    const handleChangeDecrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            handleChangePrice(cart.name, cart.currentPrice * newCount);
        }
    };
    return (
        <li className={classes.order}>
            <img
                className={classes.orderImage}
                src={require(`../../images/product/productsLibrary/${cart.images[0]}`)}
                alt=""
            />
            <Link
                to={`/catalog/${cart.categories[0]}/${cart.subcategories[0]}/${cart._id}`}
                className={classes.orderName}
            >
                {cart.name}
            </Link>
            <p
                className={
                    cart.bigPrice
                        ? classes.orderBigPrice
                        : classes.orderBigPriceHiden
                }
            >
                {cart.bigPrice + "₽"}
            </p>
            <p className={classes.orderCurrentPrice}>{cart.currentPrice}₽</p>
            <div className={classes.countButtons}>
                <button
                    className={classes.countButton}
                    onClick={handleChangeDecrement}
                >
                    -
                </button>
                <p className={classes.orderCount}>{count} шт</p>
                <button
                    className={classes.countButton}
                    onClick={handleChangeIncrement}
                >
                    +
                </button>
            </div>
            <button
                onClick={() => removeItem(cart._id)}
                className={classes.deleteButton}
            >
                <i className="bi bi-trash3-fill"></i>
            </button>
        </li>
    );
};

ShoppingCartItem.propTypes = {
    cart: PropTypes.object
};

export default ShoppingCartItem;
