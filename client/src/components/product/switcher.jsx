import React from "react";
import classes from "../../modules/product.module.css";
import PropTypes from "prop-types";

const Switcher = ({ buttons, state, onChange }) => {
    return (
        <>
            <ul className={classes.infoNavigation}>
                {buttons.map((buttonName) => {
                    return (
                        <li key={buttonName.id} className={classes.actived}>
                            <button
                                style={{ background: "inherit" }}
                                className={
                                    classes.infoNavigationButton +
                                    " " +
                                    (state === buttonName.name
                                        ? `${classes.active}`
                                        : null)
                                }
                                onClick={() => onChange(buttonName.name)}
                            >
                                {buttonName.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className={classes.infoLine}></div>
        </>
    );
};

Switcher.propTypes = {
    buttons: PropTypes.array,
    state: PropTypes.string,
    onChange: PropTypes.func
};

export default Switcher;
