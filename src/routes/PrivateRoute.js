// src/routes/PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

// Higher Order Component for Private Routes
const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = Cookies.get("operational_token");
    const location = useLocation();

    // Redirect to login if no token and save the current location
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
