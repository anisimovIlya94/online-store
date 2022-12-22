import React, { useState } from "react";
import CatalogSortCategorias from "./catalogSortCategorias";
import CatalogSortRanges from "./catalogSortRanges";
import CatalogSortingTimeToPlay from "./catalogSortTimeToPlay";
import classes from "../../modules/catalog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editFilters, getFilters } from "../../store/catalog";

const CatalogSort = () => {
    const filters = useSelector(getFilters());
    const dispatch = useDispatch();
    const [data, setData] = useState(filters);
    const handleChange = (name, content) => {
        setData((prevState) => ({ ...prevState, [name]: content }));
    };
    const handleSubmit = () => {
        dispatch(editFilters(data));
    };
    return (
        <>
            <CatalogSortCategorias />
            <CatalogSortRanges
                name={"currentPrice"}
                title="Цена"
                rouble={true}
                initialState={{ min: 20, max: 47000 }}
                data={data.currentPrice}
                onChange={handleChange}
            />
            <CatalogSortRanges
                name={"quantity"}
                title="Кол-во игроков"
                rouble={false}
                initialState={{ min: 2, max: 6 }}
                data={data.quantity}
                onChange={handleChange}
            />
            <CatalogSortRanges
                name={"age"}
                title="Возрастное ограничение"
                rouble={false}
                initialState={{ min: 6, max: 18 }}
                data={data.age}
                onChange={handleChange}
            />
            <CatalogSortingTimeToPlay
                name={"time"}
                data={data.time}
                onChange={handleChange}
            />
            <div className={classes.catalogViewWrapper}>
                <button
                    onClick={handleSubmit}
                    className={classes.catalogViewButton}
                >
                    <span className={classes.catalogViewSpan}>Показать</span>
                </button>
            </div>
        </>
    );
};

export default CatalogSort;
