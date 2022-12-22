import React from "react";
import whiteCart from "../../../images/catalog/clarity_shopping-cart-line.png";
import orangeCart from "../../../images/catalog/clarity_shopping-cart-line-orange.png";
import classes from "../../../modules/mainButtons.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MainCardButton = ({
    title,
    orange,
    onHoverButton,
    hoverButton,
    icon,
    onShopCart,
    back,
    ancer
}) => {
    const windowUp = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div onClick={onShopCart} className={classes.buttonWrapper}>
            {ancer ? (
                <Link to="/shopping" onClick={windowUp}>
                    <span
                        onMouseEnter={onHoverButton}
                        onMouseLeave={onHoverButton}
                        className={classes.buttonWhite}
                    >
                        {title}
                    </span>
                </Link>
            ) : (
                <button
                    style={{ backgroundColor: back, width: "100%" }}
                    href=""
                >
                    <span
                        onMouseEnter={onHoverButton}
                        onMouseLeave={onHoverButton}
                        className={
                            orange ? classes.buttonOrange : classes.buttonWhite
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
            )}
        </div>
    );
};

MainCardButton.defaultProps = {
    back: "#FFFFFF"
};

MainCardButton.propTypes = {
    title: PropTypes.string,
    orange: PropTypes.bool,
    hoverButton: PropTypes.bool,
    ancer: PropTypes.bool,
    icon: PropTypes.bool,
    onHoverButton: PropTypes.func,
    onShopCart: PropTypes.func,
    back: PropTypes.string
};
export default MainCardButton;
