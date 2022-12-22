import React from "react";
import burger from "../../images/header/бургер.png";
import burgerActive from "../../images/header/бургер-active.png";
import classes from "../../modules/navBar.module.css";
import VkLogo from "../vkLogo";
import OpenedNavBar from "./openedNavBar";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ onHover, burgerState }) => {
    return (
        <div className={classes.wrapper}>
            <ul className={classes.navFlex}>
                <li
                    onMouseEnter={() => onHover()}
                    onMouseLeave={() => onHover()}
                >
                    <button
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop"
                    >
                        <img
                            className={classes.burger}
                            src={burgerState ? burgerActive : burger}
                            alt=""
                        />
                        <span
                            className={
                                burgerState
                                    ? classes.navLinkHover
                                    : classes.navLinks
                            }
                        >
                            Каталог
                        </span>
                    </button>
                </li>
                <li>
                    <NavLink
                        activeClassName={classes.activeNavLinks}
                        className={classes.navLinks}
                        to="/catalog/638af9ce4fb10b01b6808626"
                    >
                        <span>Warhammer</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        activeClassName={classes.activeNavLinks}
                        className={classes.navLinks}
                        to="/catalog/638af9ce4fb10b01b6808625"
                    >
                        <span>Magic:the Cathering</span>
                    </NavLink>
                </li>
                <li>
                    <Link to="/process" className={classes.navLinks}>
                        <span>Мероприятия</span>
                    </Link>
                </li>
                <li>
                    <Link className={classes.navLinks} to="/process">
                        <span>О центре</span>
                    </Link>
                </li>
                <li>
                    <Link className={classes.navLinks} to="/process">
                        <span>Контакты</span>
                    </Link>
                </li>
                <li>
                    <VkLogo />
                </li>
            </ul>
            {
                <div>
                    <div
                        className={"offcanvas offcanvas-top " + classes.open}
                        tabIndex="-1"
                        id="offcanvasTop"
                        aria-labelledby="offcanvasTopLabel"
                    >
                        <div className="offcanvas-header">
                            <OpenedNavBar />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

NavBar.propTypes = {
    burgerState: PropTypes.bool.isRequired,
    onHover: PropTypes.func.isRequired
};

export default NavBar;
