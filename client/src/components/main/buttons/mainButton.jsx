import React from "react";
import { Link } from "react-router-dom";
import classes from "../../../modules/main.module.css";
import PropTypes from "prop-types";

const MainButton = ({ title }) => {
    return (
        <div className={classes.buttonMargin}>
            <div className={classes.buttonWrapper}>
                <Link to={"/catalog"}>
                    <span className={classes.buttonSpan}>{title}</span>
                </Link>
            </div>
        </div>
    );
};

MainButton.propTypes = {
    title: PropTypes.string.isRequired
};

export default MainButton;
