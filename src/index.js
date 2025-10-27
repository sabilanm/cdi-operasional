// src/index.js
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <Suspense fallback={<Loader />}>
            <AuthProvider>
                <BrowserRouter basename="/cdi_operasional">
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </Suspense>
    </Provider>
);

reportWebVitals();
