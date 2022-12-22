import React, { useState } from "react";
import classes from "../../modules/admin.module.css";
import { useCategory } from "../hooks/useCategory";
import TextField from "../common/form/textField";
import ModalWindow from "../modalWindow/modalWindow";
import AdminEditProduct from "./adminEditProduct";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getCatalogLoadingStatus, getProductsRedux } from "../../store/catalog";

const AdminMain = () => {
    const [inputData, setData] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [selectProd, setSelectprod] = useState();
    const { getCategoryById, getSubCategoryById } = useCategory();
    const products = useSelector(getProductsRedux());
    const isLoading = useSelector(getCatalogLoadingStatus());
    const filteredProducts = inputData
        ? products.filter(
            (prod) =>
                prod.name
                    .toLowerCase()
                    .includes(inputData.toLocaleLowerCase().trim()) ||
                prod.code === +inputData.trim()
        )
        : products;
    const sortedProducts = _.orderBy(
        filteredProducts,
        [sortBy.iter],
        [sortBy.order]
    );
    const handleSort = (item) => {
        if (item === sortBy.iter) {
            setSortBy({
                iter: item,
                order: sortBy.order === "asc" ? "desc" : "asc"
            });
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };
    const renderSortArrow = (column) => {
        if (sortBy.iter === column) {
            if (sortBy.order === "asc") {
                return <i className="bi bi-arrow-up-circle"></i>;
            } else {
                return <i className="bi bi-arrow-down-circle"></i>;
            }
        }
        return null;
    };
    const handleChange = (data) => {
        setData(data.value);
    };
    const handleSelectProd = (prod) => {
        setSelectprod(prod);
    };
    if (isLoading) {
        return "loading...";
    }
    return (
        <div className={classes.adminProductsWrapper}>
            <div style={{ maxWidth: "500px" }}>
                <TextField
                    placeholder="Введите название товара или код"
                    label="Поиск товара"
                    name="email"
                    value={inputData}
                    onChange={handleChange}
                />
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th
                                role={"button"}
                                style={{ width: "100px" }}
                                onClick={() => handleSort("code")}
                                scope="col"
                            >
                                Код {renderSortArrow("code")}
                            </th>
                            <th
                                role={"button"}
                                onClick={() => handleSort("name")}
                                scope="col"
                            >
                                Название {renderSortArrow("name")}
                            </th>
                            <th
                                role={"button"}
                                onClick={() => handleSort("categories")}
                                scope="col"
                            >
                                Категории {renderSortArrow("categories")}
                            </th>
                            <th
                                role={"button"}
                                onClick={() => handleSort("subcategories")}
                                scope="col"
                            >
                                Подкатегории {renderSortArrow("subcategories")}
                            </th>
                            <th
                                style={{ width: "100px" }}
                                role={"button"}
                                onClick={() => handleSort("currentPrice")}
                                scope="col"
                            >
                                Цена {renderSortArrow("currentPrice")}
                            </th>
                            <th role={"button"} scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {sortedProducts.map((prod) => {
                            return (
                                <tr key={prod._id + "admin"}>
                                    <th scope="row">{prod.code}</th>
                                    <td>{prod.name}</td>
                                    <td>
                                        {prod.categories.map(
                                            (cat) => getCategoryById(cat).name
                                        )}
                                    </td>
                                    <td>
                                        {prod.subcategories.map(
                                            (sub) =>
                                                getSubCategoryById(sub).name
                                        )}
                                    </td>
                                    <td>{prod.currentPrice}</td>
                                    <td>
                                        <button
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editProduct"
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleSelectProd(prod)
                                            }
                                        >
                                            Изменить
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {
                    <ModalWindow id="editProduct">
                        {selectProd ? (
                            <AdminEditProduct prod={selectProd} />
                        ) : (
                            <></>
                        )}
                    </ModalWindow>
                }
            </div>
        </div>
    );
};

export default AdminMain;
