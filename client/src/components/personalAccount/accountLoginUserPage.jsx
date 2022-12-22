import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import ShoppingCardButton from "../shoppingCart/shoppingCartButton";
import { validator } from "../../utils/validator";
import classes from "../../modules/textField.module.css";
import { getAuthError, logIn as logInRedux } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const AccountLoginUserPage = ({ path, closeModal }) => {
    const [data, setData] = useState({
        password: "",
        email: ""
    });
    const history = useHistory();
    const loginError = useSelector(getAuthError());
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const [hoverButton, setHoverButton] = useState(false);
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const status = dispatch(logInRedux(data));
        status.then((data) => {
            if (data) {
                if (path && path.includes("login")) {
                    history.replace("/");
                }
                closeModal();
                history.replace("/persaccount");
            }
        });
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className={classes.formWrapper}>
                <TextField
                    placeholder="Введите Email"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    placeholder="Введите Пароль"
                    label="Пароль"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                {loginError && (
                    <p style={{ color: "red", fontSize: "15px" }}>
                        {loginError}
                    </p>
                )}
                <div style={{ marginTop: "30px" }}>
                    <ShoppingCardButton
                        onClick={handleSubmit}
                        title="Войти"
                        orange={true}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                        icon={false}
                        buttonWidth={"250px"}
                        modal={false}
                        disabled={!isValid}
                    />
                </div>
            </form>
        </>
    );
};

AccountLoginUserPage.propTypes = {
    path: PropTypes.string,
    closeModal: PropTypes.func
};

export default AccountLoginUserPage;
