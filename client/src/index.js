import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

reportWebVitals();
