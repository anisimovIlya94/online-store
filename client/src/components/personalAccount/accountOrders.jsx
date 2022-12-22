import React from "react";
import classes from "../../modules/account.module.css";
import { Link } from "react-router-dom";

const AccountOrders = () => {
    return (
        <div>
            <h2 className={classes.ordersTitle}>Текущие заказы не найдены</h2>
            <Link to="/">
                <span className={classes.ordersLinkToCatalog}>
                    Перейти в каталог
                </span>
            </Link>
        </div>
    );
};

export default AccountOrders;
