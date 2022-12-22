import React from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import classes from "../../../modules/admin.module.css";
import Navigation from "../../navigation";
import AdminMain from "../../admin/adminMain";
import AdminCreateProduct from "../../admin/adminCreateProduct";
import AdminRecomendations from "../../admin/adminRecomendations";

const AdminPage = () => {
    const { adminPage } = useParams();
    return (
        <div className={classes.adminWrapper}>
            <Navigation />
            <h2 className={classes.title}>Администрирование</h2>
            <div className={classes.adminMainWrapper}>
                <div className={classes.adminMainNavigation}>
                    <ul className={classes.adminMainNavList}>
                        <li>
                            <Link
                                to="/admin"
                                className={
                                    classes.adminMainNavButton +
                                    " " +
                                    (adminPage ? null : classes.active)
                                }
                            >
                                Редактирование товаров
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/addProduct"
                                className={
                                    classes.adminMainNavButton +
                                    " " +
                                    (adminPage === "addProduct"
                                        ? classes.active
                                        : null)
                                }
                            >
                                Добавление товара
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/recommendationsSettings"
                                className={
                                    classes.adminMainNavButton +
                                    " " +
                                    (adminPage === "recommendationsSettings"
                                        ? classes.active
                                        : null)
                                }
                            >
                                Настройки рекомендаций
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.adminRight}>
                    <Switch>
                        <Route exact path="/admin" component={AdminMain} />
                        <Route
                            path="/admin/addProduct"
                            component={AdminCreateProduct}
                        />
                        <Route
                            path="/admin/recommendationsSettings"
                            component={AdminRecomendations}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
