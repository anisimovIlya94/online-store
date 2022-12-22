import React from "react";
import { Link, Redirect, Route, Switch, useParams } from "react-router-dom";
import classes from "../../../modules/account.module.css";
import Navigation from "../../navigation";
import AccountMain from "../../personalAccount/accountMain";
import AccountOrders from "../../personalAccount/accountOrders";
import AccountSettings from "../../personalAccount/accountSettings";

const PersonalAccountPage = () => {
    const { accountPage } = useParams();
    const handleReturnToAccountPage = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className={classes.accountWrapper}>
            <Navigation />
            <h2 className={classes.title}>Личный кабинет</h2>
            <div className={classes.accountMainWrapper}>
                <div className={classes.accountMainNavigation}>
                    <ul className={classes.accountMainNavList}>
                        <li>
                            <Link
                                to={"/persaccount"}
                                onClick={handleReturnToAccountPage}
                            >
                                <span
                                    className={
                                        classes.accountMainNavButton +
                                        " " +
                                        (accountPage ? null : classes.active)
                                    }
                                >
                                    Профиль
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/persaccount/orders`}
                                onClick={handleReturnToAccountPage()}
                                className={classes.accountMainNavButton}
                            >
                                <span
                                    className={
                                        classes.accountMainNavButton +
                                        " " +
                                        (accountPage !== "orders"
                                            ? null
                                            : classes.active)
                                    }
                                >
                                    Заказы
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button className={classes.accountMainNavButton}>
                                Мероприятия
                            </button>
                        </li>
                        <li>
                            <Link
                                to={`/persaccount/settings`}
                                href=""
                                onClick={handleReturnToAccountPage()}
                                className={classes.accountMainNavButton}
                            >
                                <span
                                    className={
                                        classes.accountMainNavButton +
                                        " " +
                                        (accountPage !== "settings"
                                            ? null
                                            : classes.active)
                                    }
                                >
                                    Настройки
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.accountRight}>
                    <Switch>
                        <Route
                            exact
                            path="/persaccount"
                            component={AccountMain}
                        />
                        <Route
                            path="/persaccount/orders"
                            component={AccountOrders}
                        />
                        <Route
                            path="/persaccount/settings"
                            component={AccountSettings}
                        />
                        <Redirect from="/persaccount/*" to="/persaccount" />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default PersonalAccountPage;
