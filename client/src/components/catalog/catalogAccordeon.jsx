import React, { useEffect, useRef } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import classes from "../../modules/catalog.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import PropTypes from "prop-types";

const Accordeon = ({ displayName, onDisplay, name, title }) => {
    const { category } = useParams();
    const display = name === displayName;
    const collapseRef = useRef();
    const toggleShow = () => {
        onDisplay(name);
    };
    useEffect(() => {
        if (category === name) {
            toggleShow();
        }
    }, [category]);
    useEffect(() => {
        const newCollapse = new BsCollapse(collapseRef.current, {
            toggle: false
        });
        display ? newCollapse.show() : newCollapse.hide();
    }, [display]);

    const { getSubcategoriesByCategory } = useCategory();
    const subcategories = getSubcategoriesByCategory(name);
    return (
        <div className={"card my-2 "} style={{ border: "1px solid #fff" }}>
            <div className="card-body">
                <div
                    className={
                        "d-flex justify-content-between " +
                        classes.sortingCategorias
                    }
                >
                    {
                        <NavLink
                            activeClassName={classes.accordeonNavlinkAllActive}
                            className={classes.sortingCategoriasAncer}
                            to={`/catalog/${name}`}
                        >
                            {title}
                        </NavLink>
                    }
                    <i
                        className={
                            "bi bi-caret-" +
                            (!display ? "down-fill " : "up-fill ") +
                            classes.buttonIcon
                        }
                        onClick={toggleShow}
                        role={"button"}
                    ></i>
                </div>
                <div
                    className="collapse"
                    ref={collapseRef}
                    id={"name" + "title"}
                >
                    {subcategories.map((sub) => {
                        return (
                            <div key={sub._id}>
                                <NavLink
                                    activeClassName={
                                        classes.accordeonNavlinkActive
                                    }
                                    className={classes.accordeonNavlink}
                                    to={`/catalog/${name}/${sub._id}`}
                                >
                                    {sub.name}
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

Accordeon.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    onDisplay: PropTypes.func.isRequired,
};

export default Accordeon;
