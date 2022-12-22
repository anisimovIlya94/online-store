import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import ShoppingCardButton from "../shoppingCart/shoppingCartButton";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";
import classes from "../../modules/textField.module.css";
import { signUp as signUpRedux } from "../../store/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const AccountRegisterForm = ({ closeModal }) => {
    const [data, setData] = useState({
        name: "",
        telephone: "",
        secondName: "",
        email: "",
        password: "",
        secondPassword: "",
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [hoverButton, setHoverButton] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
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
        const transformData = {
            ...data,
            bought: 0,
            shoppingCart: [],
            viewed: [],
            orders: [],
            isAdmin: false
        };
        delete transformData.secondPassword;
        dispatch(signUpRedux(transformData));
        setTimeout(() => {
            closeModal();
            history.replace("/persaccount");
        }, 1000);
    };
    const validatorConfig = {
        email: {
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            minSymbols: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigital: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            minSymbols: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        telephone: {
            minSymbols: {
                message: "Номер должен состоять минимум из 11 символов",
                value: 11
            }
        },
        secondPassword: {
            isDifference: {
                message: "Пароли не совпадают",
                passwordValue: data.password
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className={classes.formWrapper}>
                <TextField
                    placeholder="Введите имя"
                    label="Имя *"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    placeholder="Введите фамилию"
                    label="Фамилия"
                    name="secondName"
                    value={data.secondName}
                    onChange={handleChange}
                    error={errors.secondName}
                />
                <TextField
                    placeholder="Введите Email"
                    label="Email *"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    placeholder="Телефон"
                    label="Ваш телефон *"
                    name="telephone"
                    value={data.telephone}
                    onChange={handleChange}
                    error={errors.telephone}
                />
                <TextField
                    placeholder="Введите Пароль"
                    label="Пароль *"
                    name="password"
                    value={data.password}
                    type="password"
                    onChange={handleChange}
                    error={errors.password}
                />
                <TextField
                    placeholder="Подтверждение пароля"
                    label="Подтверждение пароля *"
                    name="secondPassword"
                    type="password"
                    value={data.secondPassword}
                    onChange={handleChange}
                    error={errors.secondPassword}
                />
                <CheckBoxField
                    value={data.licence}
                    onChange={handleChange}
                    name="licence"
                    error={errors.licence}
                >
                    <span className={classes.checkBox}>
                        согласен с обработкой моих данных, в порядке
                        предусмотренном публичной офертой
                    </span>
                </CheckBoxField>
                <div style={{ marginTop: "30px" }}>
                    <ShoppingCardButton
                        onClick={handleSubmit}
                        title="Регистрация"
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

AccountRegisterForm.propTypes = {
    closeModal: PropTypes.func
};

export default AccountRegisterForm;
