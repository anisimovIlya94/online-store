import React, { useEffect, useRef, useState } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import Accordeon from "./catalogAccordeon";
import classes from "../../modules/catalog.module.css";
import { NavLink } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";

const CatalogSortCategorias = () => {
    const [display, setDisaplay] = useState(true);
    const [displayName, setDisplayName] = useState("");
    const collapseRef = useRef();
    const { categories, isLoading } = useCategory();
    const handleDisplayName = (name) => {
        if (name !== displayName) {
            setDisplayName(name);
        } else {
            setDisplayName("");
        }
    };
    const toggleDisplay = () => {
        setDisaplay((prevState) => !prevState);
    };
    useEffect(() => {
        const newCollapse = new BsCollapse(collapseRef.current, {
            toggle: false
        });
        display ? newCollapse.show() : newCollapse.hide();
    }, [display]);
    return (
        <div
            style={{ border: "1px solid #fff" }}
            className={"card my-2 " + classes.catalogSortWrapper}
        >
            <div className={"card-body " + classes.borderBottom}>
                <div
                    className={
                        "d-flex justify-content-between " +
                        classes.allCategoriasButton
                    }
                >
                    <NavLink
                        activeClassName={classes.accordeonNavlinkAllActive}
                        className={classes.accordeonNavlinkAll}
                        to={"/catalog"}
                    >
                        {"Все категории"}
                    </NavLink>
                    <i
                        className={
                            "bi bi-caret-" +
                            (!display ? "down-fill" : "up-fill")
                        }
                        onClick={toggleDisplay}
                        role={"button"}
                    ></i>
                </div>
                <div
                    className="collapse"
                    ref={collapseRef}
                    id={"name" + "title"}
                >
                    {!isLoading &&
                        categories.map((category) => {
                            return (
                                <Accordeon
                                    key={category._id}
                                    name={category._id}
                                    onDisplay={handleDisplayName}
                                    displayName={displayName}
                                    title={category.name}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
export default CatalogSortCategorias;
