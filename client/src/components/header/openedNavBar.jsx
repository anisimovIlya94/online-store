import React, { useState } from "react";
import closeIcon from "../../images/header/close-icon.png";
import closeIconActive from "../../images/header/close-icon — active.png";
import classes from "../../modules/navBar.module.css";
import NavCategory from "./navCategory";
import { useCategory } from "../hooks/useCategory";
import { NavLink } from "react-router-dom";

const initialData = { name: "" };

const OpenedNavBar = () => {
    const [hoverClose, setHoverClose] = useState(false);
    const [data, setData] = useState(initialData);
    const { categories, subcategories, isLoading } = useCategory();
    const subs = data.name
        ? subcategories.filter((sub) => sub.category === data.name)
        : [];
    const handleCategoryHover = (name) => {
        setData({ name: name });
    };
    if (isLoading) {
        return "Loading...";
    }
    return (
        <>
            <div className={classes.openedCatalog}>
                <div className={classes.leftColumn}>
                    <button
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        className={classes.closeBtn}
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                    >
                        <img src={hoverClose ? closeIconActive : closeIcon} />
                        <span
                            className={
                                hoverClose
                                    ? classes.closeBtnSpanHover
                                    : classes.closeBtnSpan
                            }
                        >
                            Закрыть
                        </span>
                    </button>
                    <ul className={classes.categories}>
                        <NavCategory
                            link={""}
                            name={"all"}
                            withArrow={false}
                            onHover={handleCategoryHover}
                            value="Все категории"
                        />
                        {categories.map((category) => {
                            return (
                                <NavCategory
                                    link={category._id}
                                    key={category._id + "22"}
                                    name={category._id}
                                    withArrow={true}
                                    value={category.name}
                                    onHover={handleCategoryHover}
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className={classes.rightColumn}>
                    {data.name ? (
                        <div className={classes.center}>
                            <div className="container text-center">
                                <ul className="row row-cols-4 mw-100 ">
                                    {subs.map((subcategory) => (
                                        <div
                                            className={classes.gg}
                                            key={subcategory._id}
                                        >
                                            <li
                                                className={
                                                    "col mb-5 " + classes.hh
                                                }
                                            >
                                                <NavLink
                                                    activeClassName={
                                                        classes.activeNavLinks
                                                    }
                                                    to={`/catalog/${subcategory.category}/${subcategory._id}`}
                                                    className={classes.navLinks}
                                                >
                                                    <span data-bs-dismiss="offcanvas">
                                                        {subcategory.name}
                                                    </span>
                                                </NavLink>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default OpenedNavBar;
