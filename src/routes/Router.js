// src/routes/Router.js
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
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
            { path: "/starter", element: <PrivateRoute element={Starter} /> },
            { path: "/about", element: <PrivateRoute element={About} /> },
            { path: "/alerts", element: <PrivateRoute element={Alerts} /> },
            { path: "/badges", element: <PrivateRoute element={Badges} /> },
            { path: "/buttons", element: <PrivateRoute element={Buttons} /> },
            { path: "/cards", element: <PrivateRoute element={Cards} /> },
            { path: "/grid", element: <PrivateRoute element={Grid} /> },
            { path: "/table", element: <PrivateRoute element={Tables} /> },
            { path: "/forms", element: <PrivateRoute element={Forms} /> },
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
