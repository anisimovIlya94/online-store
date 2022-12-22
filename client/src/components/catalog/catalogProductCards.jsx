import React from "react";
import MainCard from "../main/mainCard";
import classes from "../../modules/catalog.module.css";
import UseWindowDimensions from "../useWindowDimensions";
import PropTypes from "prop-types";

const CatalogProductCards = ({ productsCrop, sortBy, onChangeSort }) => {
    if (productsCrop.length === 0) {
        return <h2>Товары не найдены</h2>;
    }
    const { width } = UseWindowDimensions();
    const handleGetRows = () => {
        if (width >= 1800) {
            return "4";
        } else if (width > 1370 && width < 1800) {
            return "3";
        } else {
            return "2";
        }
    };
    return (
        <div className={"container text-center " + classes.center}>
            <div
                className={
                    `row row-cols-${handleGetRows()} ` + classes.catalogTable
                }
            >
                <button
                    onClick={onChangeSort}
                    className={classes.sortingPriceButton}
                >
                    <p style={{ marginRight: "10px" }}>Стоимость</p>
                    <span>
                        {sortBy === "asc" ? (
                            <i className="bi bi-chevron-down"></i>
                        ) : (
                            <i className="bi bi-chevron-up"></i>
                        )}
                    </span>
                </button>
                {productsCrop.map((product) => {
                    return (
                        <div
                            className={"col " + classes.catalogCard}
                            key={product._id}
                        >
                            <MainCard cardInformation={product} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

CatalogProductCards.propTypes = {
    sortBy: PropTypes.string.isRequired,
    productsCrop: PropTypes.array.isRequired,
    onChangeSort: PropTypes.func.isRequired,
};

export default CatalogProductCards;
