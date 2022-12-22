import React from "react";
import LoginWindow from "../../personalAccount/loginWindow";
import classes from "../../../modules/account.module.css";

const LoginPage = () => {
    return (
        <div className={"d-flex " + classes.loginWrapper}>
            <div className={classes.loginWindow}>
                <div className={classes.loginMargin}>
                    <LoginWindow margin="0 0 30px -5px" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
