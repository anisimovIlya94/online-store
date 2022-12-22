import React, { useState } from "react";
import Switcher from "../product/switcher";
import AccountLoginUserPage from "./accountLoginUserPage";
import AccountRegisterForm from "./accountRegisterForm";
import { useRouteMatch } from "react-router-dom";
import classes from "../../modules/account.module.css";
import PropTypes from "prop-types";

const LoginWindow = ({ margin, closeModal }) => {
    const [state, setState] = useState("login");
    const handleChange = (name) => {
        setState(name);
    };
    const { path } = useRouteMatch();
    const buttons = [
        { id: "butt3", label: "Вход", name: "login" },
        { id: "butt4", label: "Регистрация", name: "register" }
    ];
    return (
        <div style={{ backgroundColor: "inherit" }}>
            <h2 style={{ margin: margin }} className={classes.loginTitle}>
                Войдите или зарегистрируйтесь
            </h2>
            <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                <Switcher
                    buttons={buttons}
                    state={state}
                    onChange={handleChange}
                />
            </div>

            {state === "login" && (
                <AccountLoginUserPage path={path} closeModal={closeModal} />
            )}
            {state === "register" && (
                <AccountRegisterForm closeModal={closeModal} />
            )}
        </div>
    );
};

LoginWindow.propTypes = {
    margin: PropTypes.string,
    closeModal: PropTypes.func
};

export default LoginWindow;
