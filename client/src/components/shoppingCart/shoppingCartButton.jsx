import React from "react";
import whiteCart from "../../images/catalog/clarity_shopping-cart-line.png";
import orangeCart from "../../images/catalog/clarity_shopping-cart-line-orange.png";
import classes from "../../modules/shoppingCart.module.css";
import PropTypes from "prop-types";

const ShoppingCardButton = ({
    title,
    orange,
    onHoverButton,
    hoverButton,
    icon,
    onClick,
    buttonWidth,
    modal,
    disabled,
    background
}) => {
    return (
        <div className={classes.buttonWrapperAllWidth}>
            <button
                id="liveToastBtn"
                disabled={disabled}
                type="button"
                style={{
                    backgroundColor: background ? background : "inherit",
                    width: "100%"
                }}
                onClick={onClick}
                data-bs-dismiss={modal ? "modal" : null}
            >
                <span
                    style={buttonWidth ? { width: buttonWidth } : null}
                    onMouseEnter={onHoverButton}
                    onMouseLeave={onHoverButton}
                    className={
                        orange
                            ? disabled
                                ? classes.buttonOrangeDisabled
                                : classes.buttonOrange
                            : classes.buttonWhite
                    }
                >
                    {title}
                    {icon && orange && (
                        <img
                            style={{ margin: "0 0 0 10px" }}
                            src={hoverButton ? orangeCart : whiteCart}
                            alt=""
                        />
                    )}
                </span>
            </button>
        </div>
    );
};

ShoppingCardButton.propTypes = {
    title: PropTypes.string,
    orange: PropTypes.bool,
    onHoverButton: PropTypes.func,
    hoverButton: PropTypes.bool,
    icon: PropTypes.bool,
    onClick: PropTypes.func,
    buttonWidth: PropTypes.string,
    modal: PropTypes.bool,
    disabled: PropTypes.bool,
    background: PropTypes.string
};

export default ShoppingCardButton;
