import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import ShoppingCardButton from "../shoppingCart/shoppingCartButton";
import classes from "../../modules/textField.module.css";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import PropTypes from "prop-types";

const AccountEditUserPage = ({ currentUser }) => {
    const [data, setData] = useState({
        name: currentUser.name,
        telephone: currentUser.telephone,
        secondName: currentUser.secondName,
        email: currentUser.email
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [hoverButton, setHoverButton] = useState(false);
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser({ ...currentUser, ...data }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: `Поле обязательно для заполнения`
            }
        },
        telephone: {
            isRequired: {
                message: `Поле обязательно для заполнения`
            },
            minSymbols: {
                message: "Номер должен состоять минимум из 11 символов",
                value: 11
            }
        },
        email: {
            isRequired: {
                message: `Поле обязательно для заполнения`
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    return (
        <>
            <h2 className={classes.editTitle}>Изменить данные</h2>
            <form onSubmit={handleSubmit} className={classes.formWrapper}>
                <TextField
                    placeholder="Имя"
                    label="Ваше имя *"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    placeholder="Фамилия"
                    label="Ваша фамилия"
                    name="secondName"
                    value={data.secondName}
                    onChange={handleChange}
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
                    placeholder="Email"
                    label="Ваш email *"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <div style={{ marginTop: "30px" }}>
                    <ShoppingCardButton
                        onClick={handleSubmit}
                        title="Сохранить"
                        orange={true}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                        icon={false}
                        buttonWidth={"250px"}
                        modal={true}
                        disabled={!isValid}
                    />
                </div>
            </form>
        </>
    );
};

AccountEditUserPage.propTypes = {
    currentUser: PropTypes.object
};

export default AccountEditUserPage;
