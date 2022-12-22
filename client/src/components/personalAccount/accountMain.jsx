import React from "react";
import classes from "../../modules/account.module.css";
import AccountUserCard from "./accountUserCard";
import AccountUserRangs from "./accountUserRangs";
import MainCardButton from "../main/buttons/mainCardButton";
import MainCard from "../main/mainCard";
import AccountUserInfo from "./accountUserInfo";
import { useSelector } from "react-redux";
import { getCurrentUser, getLoadingStatus } from "../../store/user";
import { getCatalogLoadingStatus, getProductsRedux } from "../../store/catalog";
import { useHistory } from "react-router-dom";

const AccountMain = () => {
    let status;
    const history = useHistory();
    const currentUser = useSelector(getCurrentUser());
    if (currentUser?.isAdmin) {
        history.replace("/admin");
    }
    const userLoading = useSelector(getLoadingStatus());
    const isLoading = useSelector(getCatalogLoadingStatus());
    const products = useSelector(getProductsRedux());
    const bought = currentUser ? currentUser.bought : 0;

    const getProductById = (id) => {
        return products.find((prod) => prod._id === id);
    };

    const viewedProducts =
        currentUser && products
            ? currentUser.viewed
                .map((prod) => {
                    return getProductById(prod);
                })
                .filter((v) => v !== undefined)
            : [];

    if (bought <= 5000) {
        status = {
            name: "Новичок",
            discount: "5%",
            color: "#CD7F32",
            background: "linear-gradient(#573716, #2A2A2A)"
        };
    } else if (bought > 5000 && bought <= 10000) {
        status = {
            name: "Любитель",
            discount: "10%",
            color: "#c0c0c0",
            background: "linear-gradient(#5e5e5e, #2A2A2A)"
        };
    } else {
        status = {
            name: "Профессионал",
            discount: "15%",
            color: "#ffd700",
            background: "linear-gradient(#877200, #2A2A2A)"
        };
    }
    const procent = bought > 10000 ? 100 : Math.floor((bought / 10000) * 100);
    const events = [
        {
            id: "ev1",
            name: "dragons",
            label: "Игры по DungeonsDragons",
            date: "25 октября 2022 года, 17:00",
            img: "event1"
        },
        {
            id: "ev2",
            name: "nightGames",
            label: "Вечер настольных игр",
            date: "10 ноября 2022 года, 19:00",
            img: "event2"
        },
        {
            id: "ev3",
            name: "Warhammer",
            label: "Турнир Warhammer 40000",
            date: "19 октября 2022 года, 17:00",
            img: "event3"
        }
    ];
    return (
        <div className={classes.accountMainInfo}>
            <div className={classes.accountUserInfo}>
                {currentUser && !userLoading && (
                    <div className="d-flex">
                        <AccountUserInfo />
                        <span className={classes.userName}>
                            {currentUser.name + " " + currentUser.secondName}
                        </span>
                    </div>
                )}

                <div>
                    <span className={classes.icon}>
                        <i className="bi bi-check-lg"></i>
                    </span>
                    <span className={classes.userStatus}>{status.name}</span>
                </div>
            </div>
            <div className={classes.accountUserCard}>
                <p className={classes.userCardTitle}>Карта лояльности</p>
                <div className={classes.accountUserCardWrapper}>
                    <div className={classes.userCard}>
                        <AccountUserCard status={status} />
                    </div>
                    <div className={classes.userRangs}>
                        <AccountUserRangs bought={bought} />
                    </div>
                </div>
                <div className={classes.shoppingLineWrapper}>
                    <div className={classes.shoppingLine}>
                        <div
                            className={classes.shoppingOrangeLine}
                            style={{ width: `${procent}%` }}
                        ></div>
                    </div>
                    <p className={classes.totalPurchased}>{bought}/10000</p>
                </div>
                <div className={classes.allEventsWrapper}>
                    <p className={classes.userCardTitle}>Мои мероприятия</p>
                    {events.map((event) => {
                        return (
                            <div
                                key={event.id}
                                className={classes.myEventsWrapper}
                            >
                                <div className="d-flex">
                                    <img
                                        className={classes.myEventImage}
                                        src={require(`../../images/account/${event.img}.png`)}
                                        alt=""
                                    />
                                    <div className={classes.myEventInfo}>
                                        <p className={classes.myEventInfoTitle}>
                                            {event.label}
                                        </p>
                                        <p className={classes.myEventInfoDate}>
                                            {event.date}
                                        </p>
                                    </div>
                                </div>
                                <div className={classes.myEventsButton}>
                                    <MainCardButton
                                        title={"Подробнее"}
                                        orange={false}
                                        back="#fcf3ed"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {currentUser && !userLoading && viewedProducts.length > 0 && (
                    <div>
                        <p className={classes.userCardTitle}>
                            Ранее просматривали
                        </p>
                        <div className={classes.recommendedWrapper}>
                            <div className="container text-center">
                                <div className="row row-cols-3">
                                    {!isLoading &&
                                        viewedProducts.map((product) => {
                                            return (
                                                <div
                                                    key={product._id}
                                                    className={
                                                        "col " +
                                                        classes.recomendation
                                                    }
                                                >
                                                    <MainCard
                                                        cardInformation={
                                                            product
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountMain;
