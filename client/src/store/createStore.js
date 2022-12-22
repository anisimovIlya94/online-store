import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./catalog";
import recomendationsReducer from "./recomendations";
import userReducer from "./user";

const rootReduser = combineReducers({
    recomendations: recomendationsReducer,
    user: userReducer,
    products: productsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReduser
    });
}
