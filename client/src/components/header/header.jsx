import React, { useState } from "react";
import classes from "../../modules/header.module.css";
import logo from "../../images/header/header-logo.png";
import magnifier from "../../images/header/Vector.png";
import telephone from "../../images/header/telephone.png";
import ShoppingCartButton from "./shoppingCartButton";
import NavBar from "./navBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentUser,
    getLoadingStatus,
    getLoggedInStatus,
    logOut as logOutRedux
} from "../../store/user";
import { getProductsRedux } from "../../store/catalog";

const Header = () => {
    const [cart, setCart] = useState(false);
    const [burger, setBurger] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [searchingInput, setInput] = useState("");
    const [searchingProducts, setSearchingProducts] = useState([]);
    const products = useSelector(getProductsRedux());
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const userLoading = useSelector(getLoadingStatus());
    const isLoggedIn = useSelector(getLoggedInStatus());
    const handleToggleCart = () => {
        setCart(!cart);
    };
    const handleToggleBurger = () => {
        setBurger(!burger);
    };
    const handleLogOut = () => {
        dispatch(logOutRedux());
    };
    const handleGoingToAccount = () => {
        window.scrollTo(0, 0);
    };
    const handleChangeInput = (e) => {
        const { value } = e.target;
        setInput(value);
        if (value) {
            const currentName = value.toLowerCase().trim();
            setSearchingProducts(
                products.filter((prod) => {
                    return prod.name.toLowerCase().includes(currentName);
                })
            );

            setSearchShow(true);
        } else {
            setSearchingProducts([]);
            setSearchShow(false);
        }
    };
    const handleCloseSearch = () => {
        setSearchingProducts([]);
        setSearchShow(false);
        setInput("");
    };
    return (
        <div className={classes.header}>
            <div className={classes.wrapper}>
                <div className={classes.hat}>
                    <div className="container text-center mw-100">
                        <div className="row justify-content-between">
                            <div className="col">
                                <Link
                                    to="/"
                                    onClick={handleGoingToAccount}
                                    href=""
                                >
                                    {" "}
                                    <img
                                        className={classes.image}
                                        src={logo}
                                        alt="#"
                                    />
                                </Link>
                            </div>
                            <div className="col ">
                                <div
                                    className={
                                        "nav-item dropdown " + classes.search
                                    }
                                >
                                    <input
                                        className={
                                            "nav-link dropdown-toggle " +
                                            classes.input
                                        }
                                        type="text"
                                        placeholder="Найти игру"
                                        style={{ color: "#2A2A2A" }}
                                        onChange={handleChangeInput}
                                        value={searchingInput}
                                    />

                                    {searchingInput && (
                                        <button
                                            onClick={handleCloseSearch}
                                            className={classes.close}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                    <Link
                                        onClick={handleCloseSearch}
                                        to={`/search/${searchingInput}`}
                                        className={classes.magnifier}
                                    >
                                        <img src={magnifier} alt="" />
                                    </Link>
                                    <div
                                        className={
                                            "w-100 dropdown-menu " +
                                            (searchShow ? "show" : "")
                                        }
                                    >
                                        {searchingInput &&
                                        searchingProducts.length === 0 ? (
                                                <li
                                                    style={{ margin: "0 0 0 10px" }}
                                                    className={
                                                        classes.searchingCardName
                                                    }
                                                >
                                                    Товары не найдены
                                                </li>
                                            ) : (
                                                <ul>
                                                    {searchingProducts
                                                        .slice(0, 4)
                                                        .map((prod) => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        prod._id +
                                                                        "search"
                                                                    }
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <img
                                                                            className={
                                                                                classes.searchingImage
                                                                            }
                                                                            src={require(`../../images/product/productsLibrary/${prod.images[0]}`)}
                                                                            alt=""
                                                                        />
                                                                        <div
                                                                            className={
                                                                                classes.searchingCardInfo
                                                                            }
                                                                        >
                                                                            <Link
                                                                                onClick={
                                                                                    handleCloseSearch
                                                                                }
                                                                                to={`/catalog/${prod.categories[0]}/${prod.subcategories[0]}/${prod._id}`}
                                                                                className={
                                                                                    classes.searchingCardName
                                                                                }
                                                                            >
                                                                                {
                                                                                    prod.name
                                                                                }
                                                                            </Link>
                                                                            <p
                                                                                className={
                                                                                    classes.searchingCardPrice
                                                                                }
                                                                            >
                                                                                {
                                                                                    prod.currentPrice
                                                                                }{" "}
                                                                                ₽
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="dropdown-divider" />
                                                                </li>
                                                            );
                                                        })}
                                                    <Link
                                                        onClick={handleCloseSearch}
                                                        to={`/search/${searchingInput}`}
                                                        className={
                                                            classes.searchingLinkAll
                                                        }
                                                    >
                                                        Все результаты
                                                    </Link>
                                                </ul>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex">
                                <img
                                    className={classes.telephone}
                                    src={telephone}
                                    alt=""
                                />
                                <p className={classes.telephoneNumber}>
                                    +7 (495) 911-10-11
                                </p>
                            </div>
                            <div className="col">
                                {!userLoading && isLoggedIn ? (
                                    currentUser && currentUser.isAdmin ? (
                                        <div className="col">
                                            <button
                                                className={classes.adminButton}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="bi bi-gear-fill"></i>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link
                                                        className={
                                                            classes.adminLink
                                                        }
                                                        to="/admin"
                                                    >
                                                        Администрирование
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a
                                                        className={
                                                            classes.adminOut
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={handleLogOut}
                                                        href="/"
                                                    >
                                                        Выход
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                className={classes.fff}
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <i className="bi bi-person-gear"></i>
                                            </button>
                                            <ul className={"dropdown-menu "}>
                                                <li>
                                                    <Link
                                                        to={"/persaccount"}
                                                        className={
                                                            classes.menuLink
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            handleGoingToAccount()
                                                        }
                                                    >
                                                        Профиль
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={
                                                            "/persaccount/orders"
                                                        }
                                                        className={
                                                            classes.menuLink
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            handleGoingToAccount()
                                                        }
                                                    >
                                                        Заказы
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={"/"}
                                                        className={
                                                            classes.menuLink
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            handleGoingToAccount()
                                                        }
                                                    >
                                                        Мероприятия
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={
                                                            "/persaccount/settings"
                                                        }
                                                        className={
                                                            classes.menuLink
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            handleGoingToAccount()
                                                        }
                                                    >
                                                        Настройки
                                                    </Link>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>
                                                <li>
                                                    <a
                                                        className={
                                                            classes.menuLink
                                                        }
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={handleLogOut}
                                                        href="/"
                                                    >
                                                        Выход
                                                    </a>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#login"
                                            className={classes.personalAccount}
                                        >
                                            <span className={classes.fff}>
                                                <i className="bi bi-person-fill-slash"></i>
                                            </span>
                                        </button>
                                    </>
                                )}
                                {!currentUser?.isAdmin && (
                                    <ShoppingCartButton
                                        onHover={handleToggleCart}
                                        cart={cart}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar onHover={handleToggleBurger} burgerState={burger} />
        </div>
    );
};

export default Header;
