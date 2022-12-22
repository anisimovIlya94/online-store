import React, { useState } from "react";
import classes from "../../../modules/textField.module.css";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
    textarea,
    note
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    let booleanValue = Boolean(value);
    return textarea ? (
        <div className={"mb-4 "}>
            <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label mb-2"
                style={{ fontSize: "17px", textAlign: "left" }}
            >
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                className={classes.inputBoarder}
                id="exampleFormControlTextarea1"
                rows="3"
                name={name}
                value={value}
                onChange={handleChange}
            ></textarea>
        </div>
    ) : (
        <div className="mb-4">
            <label className="mb-2" style={{ fontSize: "17px" }} htmlFor={name}>
                {label}
            </label>
            <div
                className={"input-group has-validation " + classes.inputWrapper}
            >
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={classes.inputBoarder}
                />
                {type === "password" && (
                    <button
                        className={classes.lookButton}
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <i className="bi bi-eye"></i>
                        ) : (
                            <i className="bi bi-eye-slash"></i>
                        )}
                    </button>
                )}
                {error && booleanValue && (
                    <div className={classes.error}>{error}</div>
                )}
                {note && (
                    <p style={{ fontSize: "15px", margin: "10px 0 0 0" }}>
                        {note}
                    </p>
                )}
            </div>
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    textarea: PropTypes.bool,
    note: PropTypes.string
};

export default TextField;
