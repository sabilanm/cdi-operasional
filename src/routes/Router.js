// src/routes/Router.js
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Layouts
const FullLayout = lazy(() => import("../layouts/FullLayout"));

// Pages
const LoginLazy = lazy(() => import("../features/auth/ui/Login"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const RoleList = lazy(() => import("../features/roles/ui/List"));
const RoleCreate = lazy(() => import("../features/roles/ui/Create"));

// UI Components (Private)
const Badges = lazy(() => import("../views/ui/Badges"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

// ----------------------
// Public routes (no layout)
// ----------------------
const LoginRoutes = [
    { path: "/login", element: <LoginLazy /> },
    { path: "*", element: <NotFound /> }, // wildcard public route → blank 404
];

// ----------------------
// Protected routes (with FullLayout)
// ----------------------
const FullLayoutRoutes = [
    {
        path: "/",
        element: <FullLayout />,
        children: [
            {
                path: "/dashboard",
                element: <PrivateRoute element={DashboardPage} />,
            },
            { path: "/badges", element: <PrivateRoute element={Badges} /> },
            {
                path: "/breadcrumbs",
                element: <PrivateRoute element={Breadcrumbs} />,
            },
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "*", element: <Navigate to="/dashboard" /> },
            // wildcard internal → redirect ke dashboard atau bisa diganti NotFound khusus internal
            { path: "/roles", element: <PrivateRoute element={RoleList} /> },
            {
                path: "/roles/create",
                element: <PrivateRoute element={RoleCreate} />,
            },
        ],
    },
];

// ----------------------
// Combine all routes
// ----------------------
const ThemeRoutes = [...LoginRoutes, ...FullLayoutRoutes];

export default ThemeRoutes;
