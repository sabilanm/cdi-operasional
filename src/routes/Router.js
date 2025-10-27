// src/routes/Router.js
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Badges = lazy(() => import("../views/ui/Badges"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const LoginLazy = lazy(() => import("../views/auth/Login"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard.jsx"));
/*****Routes******/
const LoginRoutes = [{ path: "/login", element: <LoginLazy /> }];

const FullLayoutRoutes = [
    {
        path: "/",
        element: <FullLayout />,
        children: [
            { path: "/badges", element: <PrivateRoute element={Badges} /> },
            {
                path: "/breadcrumbs",
                element: <PrivateRoute element={Breadcrumbs} />,
            },
            { path: "/", element: <Navigate to="/dashboard" /> },
            {
                path: "/dashboard",
                element: <PrivateRoute element={Dashboard} />,
            },
        ],
    },
];

const ThemeRoutes = [...LoginRoutes, ...FullLayoutRoutes];

export default ThemeRoutes;
