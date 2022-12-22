import React from "react";
import { NavLink } from "react-router-dom";
import arrow from "../../images/header/arrow.png";
import classes from "../../modules/navCategory.module.css";
import { useCategory } from "../hooks/useCategory";
import PropTypes from "prop-types";

const NavCategory = ({ name, withArrow, onHover, onLeave, value, link }) => {
    const { isLoading } = useCategory();
    if (isLoading) {
        return "Loading...";
    }
    return (
        <li className={classes.category}>
            <NavLink
                activeClassName={classes.activeLink}
                className={classes.link}
                to={`/catalog/${link}`}
                onMouseOver={() => onHover(name)}
                onMouseLeave={onLeave}
            >
                <span data-bs-dismiss="offcanvas">{value}</span>
            </NavLink>
            {withArrow ? (
                <img className={classes.arrow} src={arrow} alt="" />
            ) : null}
        </li>
    );
};

NavCategory.propTypes = {
    withArrow: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func,
    link: PropTypes.string
};

export default NavCategory;
