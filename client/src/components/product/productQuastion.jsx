import React from "react";
import classes from "../../modules/product.module.css";
import PropTypes from "prop-types";

const ProductQuastion = ({
    display,
    collapseRef,
    toggleDisplay,
    title,
    text
}) => {
    return (
        <div
            style={{ border: "0px solid #fcf3ed" }}
            className={"card my-2 " + classes.quastionWrapper}
        >
            <div className={"card-body " + classes.questionbb}>
                <div
                    className={
                        "d-flex justify-content-between " + classes.quastionHead
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
                    <div className={classes.questionBody}>{text}</div>
                </div>
            </div>
        </div>
    );
};

ProductQuastion.propTypes = {
    display: PropTypes.bool,
    toggleDisplay: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.object,
    collapseRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

export default ProductQuastion;
