import React from "react";
import { Link } from "react-router-dom";
import classes from "../../modules/header.module.css";

const SearchingCard = ({ product }) => {
    return (
        <li>
            <div className="d-flex align-items-center">
                <img
                    className={classes.searchingImage}
                    src={require(`../../images/product/productsLibrary/${product._id}/1.jpg`)}
                    alt=""
                />
                <div className={classes.searchingCardInfo}>
                    <Link
                        to={`/catalog/${product.categories[0]}/${product.subcategories[0]}/${product._id}`}
                        className={classes.searchingCardName}
                    >
                        {product.name}
                    </Link>
                    <p className={classes.searchingCardPrice}>
                        {product.currentPrice} ₽
                    </p>
                </div>
            </div>
            <hr className="dropdown-divider" />
        </li>
    );
};

export default SearchingCard;
