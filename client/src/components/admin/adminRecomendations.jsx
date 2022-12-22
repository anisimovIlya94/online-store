import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import classes from "../../modules/admin.module.css";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
    changeSpecialOffers,
    changeTimeToBuy,
    getRecomendationsStatus,
    getSpecialOffers,
    getTimeToBuy
} from "../../store/recomendations";

const AdminRecomendations = () => {
    const [data, setData] = useState({
        timeToBuy: "",
        specialOffers: ""
    });
    const dispatch = useDispatch();
    const handleChangeData = () => {
        setData({
            timeToBuy: timeToBuy.map((code) => code.value).join(","),
            specialOffers: specialOffers.map((code) => code.value).join(",")
        });
    };
    const [selectedRecomendation, setSelectedRecomendation] = useState();
    const timeToBuy = useSelector(getTimeToBuy());
    const specialOffers = useSelector(getSpecialOffers());
    const isLoading = useSelector(getRecomendationsStatus());
    useEffect(() => {
        if (!isLoading) {
            handleChangeData();
        }
    }, [isLoading]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmitRecomendation = (recName) => {
        const resultArray = data[recName].split(",").map((code) => {
            return { _id: nanoid(), value: +code };
        });
        recName === "timeToBuy"
            ? dispatch(changeTimeToBuy(resultArray))
            : dispatch(changeSpecialOffers(resultArray));
        setSelectedRecomendation();
    };
    return (
        <div className={classes.adminAddWrapper}>
            <table className="table mb-5">
                <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Коды товаров</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <th scope="row">Успей купить</th>
                        {!isLoading && selectedRecomendation === "timeToBuy" ? (
                            <td style={{ transform: "translate(0,-20px)" }}>
                                <TextField
                                    placeholder="Введите коды"
                                    name="timeToBuy"
                                    value={data.timeToBuy}
                                    onChange={handleChange}
                                />
                            </td>
                        ) : (
                            <td>{data.timeToBuy}</td>
                        )}
                        <td>
                            {selectedRecomendation === "timeToBuy" ? (
                                <button
                                    onClick={() => {
                                        handleSubmitRecomendation("timeToBuy");
                                    }}
                                    className="btn btn-primary"
                                    disabled={!data.timeToBuy}
                                >
                                    Сохранить
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedRecomendation("timeToBuy");
                                    }}
                                    className="btn btn-success"
                                >
                                    Изменить
                                </button>
                            )}
                        </td>
                        {selectedRecomendation === "timeToBuy" && (
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedRecomendation();
                                        handleChangeData();
                                    }}
                                    className="btn btn-danger"
                                >
                                    Закрыть
                                </button>
                            </td>
                        )}
                    </tr>
                    <tr>
                        <th scope="row">Специальные предложения</th>
                        {!isLoading &&
                        selectedRecomendation === "specialOffers" ? (
                                <td style={{ transform: "translate(0,-20px)" }}>
                                    <TextField
                                        placeholder="Введите коды"
                                        name="specialOffers"
                                        value={data.specialOffers}
                                        onChange={handleChange}
                                    />
                                </td>
                            ) : (
                                <td>{data.specialOffers}</td>
                            )}
                        <td>
                            {selectedRecomendation === "specialOffers" ? (
                                <button
                                    onClick={() => {
                                        handleSubmitRecomendation(
                                            "specialOffers"
                                        );
                                    }}
                                    className="btn btn-primary"
                                    disabled={!data.specialOffers}
                                >
                                    Сохранить
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedRecomendation(
                                            "specialOffers"
                                        );
                                    }}
                                    className="btn btn-success"
                                >
                                    Изменить
                                </button>
                            )}
                        </td>
                        {selectedRecomendation === "specialOffers" && (
                            <td>
                                <button
                                    onClick={() => {
                                        setSelectedRecomendation();
                                        handleChangeData();
                                    }}
                                    className="btn btn-danger"
                                >
                                    Закрыть
                                </button>
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminRecomendations;
