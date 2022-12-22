import React, { useEffect, useRef, useState } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import classes from "../../modules/catalog.module.css";
import DoubleRangeSlider from "./catalogRange";
import PropTypes from "prop-types";

const CatalogSortRanges = ({
    title,
    rouble,
    initialState,
    data,
    onChange,
    name
}) => {
    const [display, setDisaplay] = useState(true);
    const collapseRef = useRef();
    const { min: minInitial, max: maxInitial } = initialState;
    const { min, max } = data;
    const toggleDisplay = () => {
        setDisaplay((prevState) => !prevState);
    };
    const handleChangeValues = (data) => {
        onChange(name, { min: data[0], max: data[1] });
    };
    const handleChangeInputs = (e) => {
        onChange(name, { ...data, [e.target.name]: +e.target.value });
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
                    {title}
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
                    <div
                        className={
                            "d-flex justify-content-center align-items-center my-4 " +
                            classes.priceAllInputs
                        }
                    >
                        <label className={classes.label} htmlFor="">
                            От
                        </label>
                        <input
                            className={classes.priceInput + " " + "mx-2"}
                            onChange={handleChangeInputs}
                            name="min"
                            value={minInitial === min ? "" : min}
                            placeholder={minInitial}
                            type="text"
                        />
                        <label className={classes.label} htmlFor="">
                            До
                        </label>
                        <input
                            className={classes.priceInput + " " + "mx-2"}
                            onChange={handleChangeInputs}
                            name="max"
                            value={maxInitial === max ? "" : max}
                            placeholder={maxInitial}
                            type="text"
                        />
                        {rouble && <span className={classes.rouble}>₽</span>}
                    </div>
                    <div className={classes.range}>
                        <DoubleRangeSlider
                            value={data}
                            onChange={handleChangeValues}
                            min={minInitial}
                            max={maxInitial}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

CatalogSortRanges.propTypes = {
    title: PropTypes.string.isRequired,
    rouble: PropTypes.bool.isRequired,
    initialState: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CatalogSortRanges;
