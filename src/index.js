// src/index.js
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/cdi_operasional">
            <App />
        </BrowserRouter>
    </Suspense>
);

reportWebVitals();
