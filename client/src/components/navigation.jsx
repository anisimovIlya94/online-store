import React, { useEffect, useState } from "react";
import classes from "../modules/catalog.module.css";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useCategory } from "./hooks/useCategory";
import PropTypes from "prop-types";

const Navigation = ({ productName }) => {
    const [names, setNames] = useState([]);
    const path = useRouteMatch().url.split("/");
    const par = useParams();
    const { getCategoryById, getSubCategoryById, isLoading } = useCategory();
    useEffect(() => {
        if (!isLoading) {
            getArrayOfNames(path);
        }
    }, [isLoading, par]);
    const getArrayOfNames = (path) => {
        if (path[1] === "catalog") {
            const arrayOfNames = [{ name: "Каталог", path: "/catalog" }];
            if (par.category) {
                const categoryName = getCategoryById(par.category);
                arrayOfNames.push({
                    name: categoryName.name,
                    path: `/catalog/${par.category}`
                });
            }
            if (par.sub) {
                const subName = getSubCategoryById(par.sub);
                arrayOfNames.push({
                    name: subName.name,
                    path: `/catalog/${par.category}/${par.sub}`
                });
            }
            if (par.productId) {
                arrayOfNames.push({
                    name: productName,
                    path: `/catalog/${par.category}/${par.sub}/${par.productId}`
                });
            }
            setNames(arrayOfNames);
        } else if (path[1] === "shopping") {
            setNames([{ name: "Корзина", path: "/shopping" }]);
        } else if (path[1] === "persaccount") {
            const arrayOfNames = [
                { name: "Личный кабинет", path: "/persaccount" }
            ];
            if (par.accountPage === "orders") {
                arrayOfNames.push({
                    name: "Заказы",
                    path: `/persaccount/${par.accountPage}`
                });
            }
            if (par.accountPage === "settings") {
                arrayOfNames.push({
                    name: "Настройки",
                    path: `/persaccount/${par.accountPage}`
                });
            }
            setNames(arrayOfNames);
        } else if (path[1] === "admin") {
            const arrayOfNames = [
                { name: "Администрирование", path: "/admin" }
            ];
            if (par.adminPage === "addProduct") {
                arrayOfNames.push({
                    name: "Добавление товара",
                    path: `/admin/${par.adminPage}`
                });
            }
            if (par.adminPage === "recommendationsSettings") {
                arrayOfNames.push({
                    name: "Настройки рекомендаций",
                    path: `/admin/${par.adminPage}`
                });
            }
            setNames(arrayOfNames);
        }
    };
    const handleReturnMain = () => {
        window.scrollTo(0, 0);
    };
    const arrow = ">";
    return (
        <ul className="navigation-flex">
            <li>
                <Link
                    to={"/"}
                    onClick={handleReturnMain}
                    className={classes.navigation}
                >
                    Главная
                </Link>
            </li>
            <li className="navigation-button">{arrow}</li>
            {names.length > 0 &&
                names.map((param, index) => {
                    const isLastIndex = index + 1 === names.length;
                    if (param) {
                        return (
                            <div className="d-flex" key={param.name + "11"}>
                                <Link
                                    to={param.path}
                                    className={
                                        isLastIndex
                                            ? classes.navigationDisabled
                                            : classes.navigation
                                    }
                                    style={{
                                        cursor: isLastIndex
                                            ? "default"
                                            : "cursor"
                                    }}
                                >
                                    {param.name}
                                </Link>
                                <li className="navigation-button">
                                    {isLastIndex ? "" : arrow}
                                </li>
                            </div>
                        );
                    }
                })}
        </ul>
    );
};

Navigation.propTypes = {
    productName: PropTypes.string
};

export default Navigation;
