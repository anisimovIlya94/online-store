import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import classes from "../../modules/admin.module.css";
import DoubleTextField from "../common/form/doubleTextField";
import ShoppingCardButton from "../shoppingCart/shoppingCartButton";
import MultiSelectField from "../common/form/multiSelectField";
import { useCategory } from "../hooks/useCategory";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    handleChangeProduct,
    handleCreateProduct,
    handleRemoveProduct
} from "../../store/catalog";
import PropTypes from "prop-types";

const initialState = {
    name: "",
    code: "",
    age: "",
    bigPrice: "",
    currentPrice: "",
    description: "",
    quantity: { min: "", max: "" },
    time: { min: "", max: "" },
    images: "",
    categories: [],
    subcategories: []
};

const AdminEditProduct = ({ prod }) => {
    const [data, setData] = useState(initialState);
    const [deleteState, setDelete] = useState(false);
    const [changedStatus, setChangedStatus] = useState();
    const [deleteStatus, setDeleteStatus] = useState(false);
    const history = useHistory();
    const { getCategoryById, getSubCategoryById } = useCategory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (prod) {
            setChangedStatus(false);
            setDeleteStatus(false);
            const images = prod.images.join(",");
            setData({
                name: prod.name,
                code: +prod.code,
                age: +prod.age,
                description: prod.description,
                bigPrice: prod.bigPrice ? +prod.bigPrice : "",
                currentPrice: +prod.currentPrice,
                quantity: prod.quantity ? prod.quantity : { min: "", max: "" },
                time: prod.time ? prod.time : { min: "", max: "" },
                images: images,
                categories: prod.categories,
                subcategories: prod.subcategories
            });
        }
    }, [prod]);
    const [errors, setErrors] = useState({});
    const [hoverButton, setHoverButton] = useState(false);
    const { categories, subcategories } = useCategory();
    const categoriesList = categories.map((category) => ({
        value: category._id,
        label: category.name
    }));
    const subcategoriesList = subcategories.map((category) => ({
        value: category._id,
        label: category.name
    }));
    const defaultCategories =
        prod &&
        prod.categories.map((category) => ({
            value: category,
            label: getCategoryById(category).name
        }));
    const defaultSubcategories =
        prod &&
        prod.subcategories.map((sub) => ({
            value: sub,
            label: getSubCategoryById(sub).name
        }));
    const toggleHoverButton = () => {
        setHoverButton(!hoverButton);
    };
    const handleDelete = () => {
        const status = dispatch(handleRemoveProduct(prod._id));
        status.then((data) => {
            if (!data) {
                setDeleteStatus(true);
                setDeleteQuestion();
            }
        });
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleGoToProduct = () => {
        history.replace(
            `/catalog/${prod.categories[0]}/${prod.subcategories[0]}/${prod._id}`
        );
    };
    const setDeleteQuestion = () => {
        setDelete((prevState) => !prevState);
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
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        code: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        },
        age: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        },
        currentPrice: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        },
        descriprion: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        },
        categories: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        },
        subcategories: {
            isRequired: {
                message: "Поле обязательно обязательна для заполнения"
            }
        }
    };
    const handleSubmit = () => {
        const isValid = validate();
        if (!isValid) return;
        const transformedData = {
            name: data.name,
            description: data.description,
            code: +data.code,
            age: +data.age,
            bigPrice: data.bigPrice ? +data.bigPrice : "",
            currentPrice: +data.currentPrice,
            quantity: data.quantity.min ? data.quantity : "",
            time: data.time.min ? data.time : "",
            images: data.images.split(","),
            categories: data.categories,
            subcategories: data.subcategories
        };
        const status = prod
            ? dispatch(handleChangeProduct(prod._id, transformedData))
            : dispatch(handleCreateProduct(nanoid(), transformedData));
        status.then(() => {
            setChangedStatus(true);
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.formWrapper}>
                <TextField
                    placeholder="Введите название"
                    label="Название товара *"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    placeholder="Введите код "
                    label="Код товара *"
                    name="code"
                    value={data.code}
                    onChange={handleChange}
                    error={errors.code}
                />
                <TextField
                    placeholder="Введите минимальный возраст"
                    label="Минимальный возраст *"
                    name="age"
                    value={data.age}
                    onChange={handleChange}
                    error={errors.age}
                />
                <TextField
                    placeholder="Введите сумму без скидки"
                    label="Сумма без скидки"
                    name="bigPrice"
                    value={data.bigPrice}
                    onChange={handleChange}
                />
                <TextField
                    placeholder="Введите основную сумму"
                    label="Основная сумма / со скидкой *"
                    name="currentPrice"
                    value={data.currentPrice}
                    onChange={handleChange}
                    error={errors.currentPrice}
                />
                <TextField
                    placeholder="Введите названия картинок"
                    label="Имена картинок *"
                    name="images"
                    value={data.images}
                    onChange={handleChange}
                    error={errors.images}
                    note={
                        "Имена должны быть с расширением(например, flower.jpg), записываются через запятую. Первая картинка в списке будет главной"
                    }
                />
                <TextField
                    textarea={true}
                    placeholder="Введите описание товара"
                    label="Описание товара *"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    error={errors.description}
                />
                <DoubleTextField
                    label="Количество игроков"
                    name="quantity"
                    value={data.quantity}
                    onChange={handleChange}
                />
                <DoubleTextField
                    label="Время игры, мин."
                    name="time"
                    value={data.time}
                    onChange={handleChange}
                />
                <MultiSelectField
                    prodId={prod ? prod._id : "123"}
                    options={categoriesList}
                    onChange={handleChange}
                    defaultValue={defaultCategories}
                    name="categories"
                    label="Выберите категории товара"
                />
                <MultiSelectField
                    prodId={prod ? prod._id : "234"}
                    options={subcategoriesList}
                    onChange={handleChange}
                    defaultValue={defaultSubcategories}
                    name="subcategories"
                    label="Выберите подкатегории товара"
                />
                {!deleteStatus && (
                    <div style={{ marginTop: "30px" }}>
                        <ShoppingCardButton
                            onClick={handleSubmit}
                            title={changedStatus ? "Сохранено" : "Сохранить"}
                            orange={true}
                            onHoverButton={toggleHoverButton}
                            hoverButton={hoverButton}
                            icon={false}
                            buttonWidth={"250px"}
                            modal={false}
                            disabled={!isValid}
                            background="inherit"
                        />
                    </div>
                )}
                {prod && !deleteStatus && (
                    <ShoppingCardButton
                        onClick={handleGoToProduct}
                        title="Перейти к товару"
                        orange={false}
                        onHoverButton={toggleHoverButton}
                        hoverButton={hoverButton}
                        icon={false}
                        buttonWidth={"250px"}
                        modal={true}
                        disabled={!isValid}
                    />
                )}
            </form>
            {prod && (
                <button
                    onClick={setDeleteQuestion}
                    className="btn btn-danger rounded-pill mt-3 w-100"
                >
                    {deleteStatus ? "Удалено" : "Удалить товар"}
                </button>
            )}
            {deleteState && (
                <>
                    <p style={{ textAlign: "center", margin: "10px 0" }}>
                        Вы уверены?
                    </p>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger me-5"
                        >
                            Да
                        </button>
                        <button
                            onClick={setDeleteQuestion}
                            className="btn btn-success"
                        >
                            Нет
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

AdminEditProduct.propTypes = {
    prod: PropTypes.object
};

export default AdminEditProduct;
