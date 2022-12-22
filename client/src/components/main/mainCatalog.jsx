import React from "react";
import { Link } from "react-router-dom";
import classes from "../../modules/main.module.css";

const MainCatalog = () => {
    const categories = [
        {
            _id: "main1",
            img: "magic.png",
            to: "638af9ce4fb10b01b6808625",
            name: "Magic: The Gathering"
        },
        {
            _id: "main2",
            img: "WarGames.png",
            to: "638af9ce4fb10b01b6808626",
            name: "Варгеймы"
        },
        {
            _id: "main3",
            img: "paints.png",
            to: "638af9ce4fb10b01b6808627",
            name: "Краски"
        },
        {
            _id: "main4",
            img: "acsessuars.jpg",
            to: "638af9ce4fb10b01b6808628",
            name: "Акксесуары для игр"
        }
    ];
    return (
        <div className={"d-flex " + classes.flex}>
            <Link to="/catalog/638af9ce4fb10b01b6808624">
                <div
                    className={"card border-light " + classes.bigCardWrapper}
                    style={{ borderRadius: "15px" }}
                >
                    <img
                        src={require("../../images/main/Games.jpg")}
                        className={"card-img-top " + classes.cardImage}
                    />
                    <div className={"card-body " + classes.cardBody}>
                        <p className={"card-text " + classes.cardSpan}>
                            Настольные игры
                        </p>
                    </div>
                </div>
            </Link>
            <div
                className={
                    "row row-cols-1 row-cols-md-2 g-4 " + classes.cardGrid
                }
            >
                {categories.map((cat) => {
                    return (
                        <div className={"col "} key={cat._id}>
                            <Link to={`/catalog/${cat.to}`}>
                                <div
                                    className={
                                        "card border-light " +
                                        classes.cardWrapper
                                    }
                                    style={{ borderRadius: "15px" }}
                                >
                                    <img
                                        src={require(`../../images/main/${cat.img}`)}
                                        className={
                                            "card-img-top " + classes.cardImage
                                        }
                                    />
                                    <div
                                        className={
                                            "card-body " + classes.cardBody
                                        }
                                    >
                                        <p
                                            className={
                                                "card-text " + classes.cardSpan
                                            }
                                        >
                                            {cat.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainCatalog;
