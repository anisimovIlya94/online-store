import React from "react";
import classes from "../../modules/account.module.css";
import PropTypes from "prop-types";

const AccountUserRangs = ({ bought }) => {
    const handleStatus = (status) => {
        switch (status) {
        case "Новичок":
            return bought < 1000 ? "В процессе" : "Получено";
            break;
        case "Любитель":
            if (bought > 1000) {
                return bought < 5000 ? "В процессе" : "Получено";
            } else {
                return "Закрыто";
            }
            break;
        case "Профессионал":
            if (bought > 5000) {
                return bought < 10000 ? "В процессе" : "Получено";
            } else {
                return "Закрыто";
            }
            break;
        default:
            break;
        }
    };
    return (
        <div className={classes.rangsWrapper}>
            <div className={"d-flex " + classes.rangeItem}>
                <img
                    className={classes.rangsImageBronze}
                    src={require("../../images/account/medal-bronze.png")}
                    alt=""
                />
                <div>
                    <span className={classes.rangeProcents}>5%</span>
                    <span>{"Новичок"}</span>
                    <div className={classes.rangeItemWrapper}>
                        <p className={classes.rangeProcentStatus}>
                            {handleStatus("Новичок")}
                        </p>
                        <p className={classes.rangePurpose}>1000</p>
                    </div>
                </div>
            </div>
            <div className={"d-flex " + classes.rangeItem}>
                <img
                    className={classes.rangeImageOther}
                    src={require("../../images/account/medal-silver.png")}
                    alt=""
                />
                <div>
                    <span
                        className={
                            classes.rangeProcents +
                            " " +
                            (bought < 1000 ? classes.disabled : null)
                        }
                    >
                        10%
                    </span>
                    <span className={bought < 1000 ? classes.disabled : ""}>
                        {"Любитель"}
                    </span>
                    <div className={classes.rangeItemWrapper}>
                        <p
                            className={
                                classes.rangeProcentStatus +
                                " " +
                                (bought < 1000 ? classes.disabled : null)
                            }
                        >
                            {handleStatus("Любитель")}
                        </p>
                        <p className={classes.rangePurpose}>5000</p>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <img
                    className={classes.rangeImageOther}
                    src={require("../../images/account/medal-gold.png")}
                    alt=""
                />
                <div>
                    <span
                        className={
                            classes.rangeProcents +
                            " " +
                            (bought < 5000 ? classes.disabled : null)
                        }
                    >
                        15%
                    </span>
                    <span className={bought < 5000 ? classes.disabled : ""}>
                        {"Профессионал"}
                    </span>
                    <div className={classes.rangeItemWrapper}>
                        <p
                            className={
                                classes.rangeProcentStatus +
                                " " +
                                (bought < 5000 ? classes.disabled : null)
                            }
                        >
                            {handleStatus("Профессионал")}
                        </p>
                        <p className={classes.rangePurpose}>10000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

AccountUserRangs.propTypes = {
    bought: PropTypes.number
};

export default AccountUserRangs;
