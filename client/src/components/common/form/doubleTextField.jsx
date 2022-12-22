import React from "react";
import classes from "../../../modules/catalog.module.css";
import PropTypes from "prop-types";

const DoubleTextField = ({ label, name, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name, value: { ...value, [target.name]: target.value } });
    };
    return (
        <div className="mb-4">
            <label className="mb-2" style={{ fontSize: "17px" }} htmlFor={name}>
                {label}
            </label>
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
                    onChange={handleChange}
                    name="min"
                    value={value ? value.min : 0}
                    type="text"
                />
                <label className={classes.label} htmlFor="">
                    До
                </label>
                <input
                    className={classes.priceInput + " " + "mx-2"}
                    onChange={handleChange}
                    name="max"
                    value={value ? value.max : 0}
                    type="text"
                />
            </div>
        </div>
    );
};

DoubleTextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DoubleTextField;
