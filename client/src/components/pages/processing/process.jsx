import React from "react";
import { Link } from "react-router-dom";

const InProcess = () => {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <h1 style={{ margin: "150px 0 10px 30px", fontSize: "20px" }}>
                Страница находится в разработке,
            </h1>
            <Link
                to="/"
                style={{
                    margin: "10px 0 0 30px",
                    fontSize: "20px",
                    color: "#FB791B"
                }}
            >
                Перейти на главную страницу
            </Link>
        </div>
    );
};

export default InProcess;
