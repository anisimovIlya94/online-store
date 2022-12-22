import Header from "./components/header/header";
import Footer from "./components/footer";
import { useRef, useEffect } from "react";
import Main from "./components/layouts/main";
import Catalog from "./components/layouts/catalog";
import { Switch, Redirect, Route } from "react-router-dom";
import ShoppingCart from "./components/layouts/shoppingCart";
import Search from "./components/layouts/search";
import Admin from "./components/layouts/admin";
import ShoppingProvider from "./components/hooks/useShopping";
import PersonalAccount from "./components/layouts/personalAccount";
import ModalWindow from "./components/modalWindow/modalWindow";
import LoginWindow from "./components/personalAccount/loginWindow";
import CategoryProvider from "./components/hooks/useCategory";
import Login from "./components/layouts/login";
import ProtectedAdminRoute from "./components/common/protectedAdminRoute";
import ProtectedLoginRoute from "./components/common/protectedLoginRoute";
import { useDispatch } from "react-redux";
import { loadRecomendationsList } from "./store/recomendations";
import { loadUser } from "./store/user";
import localStorageService from "./components/services/localStorage.service";
import { loadProductsList } from "./store/catalog";
import InProcess from "./components/pages/processing/process";

function App() {
    const closeModalRef = useRef();
    const closeModal = () => {
        closeModalRef.current.click();
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadRecomendationsList());
        dispatch(loadProductsList());
        if (localStorageService.getUserIdToken()) {
            dispatch(loadUser());
        }
    }, []);
    return (
        <>
            <CategoryProvider>
                <div className="App">
                    <ShoppingProvider>
                        <div className="header">
                            <Header />
                        </div>
                        <ModalWindow reference={closeModalRef} id="login">
                            <LoginWindow
                                margin="0 0 30px -28px"
                                closeModal={closeModal}
                            />
                        </ModalWindow>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/shopping" component={ShoppingCart} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/catalog/:category?/:sub?/:productId?"
                                component={Catalog}
                            />
                            <Route path="/search/:name?" component={Search} />
                            <Route path="/process" component={InProcess} />
                            <ProtectedLoginRoute
                                path="/persaccount/:accountPage?"
                                component={PersonalAccount}
                            />
                            <ProtectedAdminRoute
                                path="/admin/:adminPage?"
                                component={Admin}
                            />
                            <Redirect from="*" to="/" />
                        </Switch>
                        <Footer />
                    </ShoppingProvider>
                </div>
            </CategoryProvider>
        </>
    );
}

export default App;
