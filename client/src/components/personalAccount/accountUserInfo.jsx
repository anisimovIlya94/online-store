import React from "react";
import classes from "../../modules/account.module.css";
import PropTypes from "prop-types";

const AccountUserInfo = ({ edit }) => {
    return (
        <div className="d-flex">
            <div className={classes.accountPhotoWrapper}>
                <img
                    className={classes.accountPhoto}
                    src={require("../../images/account/account-photo.png")}
                    alt=""
                />
                {edit ? (
                    <button className={classes.accountPhotoEdit}>
                        <i className="bi bi-camera-fill"></i>
                    </button>
                ) : null}
            </div>
        </div>
    );
};

AccountUserInfo.propTypes = {
    edit: PropTypes.bool
};

export default AccountUserInfo;
