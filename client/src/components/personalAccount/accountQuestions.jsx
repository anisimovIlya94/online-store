import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "../../modules/account.module.css";
import { getCurrentUser } from "../../store/user";
import TextField from "../common/form/textField";
import ShoppingCardButton from "../shoppingCart/shoppingCartButton";

const AccountQuestions = () => {
    const [data, setData] = useState({ name: "", telephone: "", question: "" });
    const [submited, setSubmited] = useState(false);
    // const [errors, setErrors] = useState({});
    const [hoverButton, setHoverButton] = useState(false);
    const currentUser = useSelector(getCurrentUser());
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmited(true);
        console.log(data);
    };
    // const validatorConfig = {
    //   name: {
    //     isRequired: {
    //       message: `Поле обязательно для заполнения`,
    //     },
    //   },
    //   telephone: {
    //     isRequired: {
    //       message: `Поле обязательно для заполнения`,
    //     },
    //   },
    //   question: {
    //     isRequired: {
    //       message: `Поле обязательно для заполнения`,
    //     },
    //   },
    // };
    useEffect(() => {
        if (currentUser) {
            setData({
                name: currentUser.name,
                telephone: currentUser.telephone,
                question: ""
            });
        }
    }, [currentUser]);
    return (
        <div className={classes.questionsWrapper}>
            <h2 className={classes.questionsTitle}>Остались вопросы?</h2>
            {submited ? (
                <p>Спасибо за обращение, мы в скором времени вам перезвоним</p>
            ) : (
                <form onSubmit={handleSubmit} className={classes.formWrapper}>
                    <TextField
                        placeholder="Имя"
                        label="Ваше имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        // error={errors.name}
                    />
                    <TextField
                        placeholder="Телефон"
                        label="Ваш телефон"
                        name="telephone"
                        value={data.telephone}
                        onChange={handleChange}
                        // error={errors.telephone}
                    />
                    <TextField
                        placeholder="Комментарий"
                        label="Ваш комментарий"
                        name="question"
                        textarea={true}
                        value={data.question}
                        onChange={handleChange}
                        // error={errors.question}
                    />
                    <ShoppingCardButton
                        onClick={handleSubmit}
                        title="Заказать звонок"
                        orange={true}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                        icon={false}
                        buttonWidth="100%"
                        modal={false}
                    />
                </form>
            )}
        </div>
    );
};

export default AccountQuestions;
