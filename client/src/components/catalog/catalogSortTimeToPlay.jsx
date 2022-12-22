import React, { useState, useEffect, useRef } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import classes from "../../modules/catalog.module.css";
import PropTypes from "prop-types";

const CatalogSortingTimeToPlay = ({ name, data, onChange }) => {
    const [display, setDisaplay] = useState(true);
    const collapseRef = useRef();
    const toggleDisplay = () => {
        setDisaplay((prevState) => !prevState);
    };
    const handleChange = (checkName) => {
        onChange(
            name,
            data.map((check) => {
                if (check.name === checkName) {
                    return { ...check, checked: !check.checked };
                }
                return check;
            })
        );
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
            <div className={"card-body "}>
                <div
                    className={
                        "d-flex justify-content-between " +
                        classes.allCategoriasButton
                    }
                >
                    {"Время игры"}
                    <i
                        className={
                            "bi bi-caret-" +
                            (!display ? "down-fill" : "up-fill")
                        }
                        onClick={toggleDisplay}
                    ></i>
                </div>
                <div
                    className="collapse"
                    ref={collapseRef}
                    id={"name" + "title"}
                >
                    <div className={classes.checkboxesWrapper}>
                        {data.map((check) => {
                            return (
                                <div
                                    key={check.name + check.value}
                                    className={classes.sortChackboxWrapper}
                                >
                                    <input
                                        type="checkbox"
                                        name={check.name}
                                        checked={check.checked}
                                        onChange={() =>
                                            handleChange(check.name)
                                        }
                                    />
                                    <label
                                        className={classes.checkboxLabel}
                                        htmlFor={check.name}
                                    >
                                        {check.value}
                                        {!check.checked && (
                                            <span
                                                className={classes.checkboxSpan}
                                            >
                                                (1)
                                            </span>
                                        )}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

CatalogSortingTimeToPlay.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CatalogSortingTimeToPlay;
