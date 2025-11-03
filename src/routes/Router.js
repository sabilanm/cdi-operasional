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
const RoleEdit = lazy(() => import("../features/roles/ui/Edit"));
const MenuList = lazy(() => import("../features/menus/ui/List"));
const MenuCreate = lazy(() => import("../features/menus/ui/Create"));
const MenuEdit = lazy(() => import("../features/menus/ui/Edit"));
const PermissionsList = lazy(() => import("../features/permissions/ui/List"));
const PermissionsCreate = lazy(() =>
    import("../features/permissions/ui/Create")
);
const PermissionsEdit = lazy(() => import("../features/permissions/ui/Edit"));
const BranchList = lazy(() => import("../features/branch/ui/List"));
const BranchCreate = lazy(() => import("../features/branch/ui/Create"));
const BranchEdit = lazy(() => import("../features/branch/ui/Edit"));
const DivisionList = lazy(() => import("../features/division/ui/List"));
const DivisionCreate = lazy(() => import("../features/division/ui/Create"));
const DivisionEdit = lazy(() => import("../features/division/ui/Edit"));

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
            {
                path: "/roles/:id/edit",
                element: <PrivateRoute element={RoleEdit} />,
            },
            { path: "/menus", element: <PrivateRoute element={MenuList} /> },
            {
                path: "/menus/create",
                element: <PrivateRoute element={MenuCreate} />,
            },
            {
                path: "/menus/:id/edit",
                element: <PrivateRoute element={MenuEdit} />,
            },
            {
                path: "/permissions",
                element: <PrivateRoute element={PermissionsList} />,
            },
            {
                path: "/permissions/create",
                element: <PrivateRoute element={PermissionsCreate} />,
            },
            {
                path: "/permissions/:id/edit",
                element: <PrivateRoute element={PermissionsEdit} />,
            },
            {
                path: "/branches",
                element: <PrivateRoute element={BranchList} />,
            },
            {
                path: "/branches/create",
                element: <PrivateRoute element={BranchCreate} />,
            },
            {
                path: "/branches/:id/edit",
                element: <PrivateRoute element={BranchEdit} />,
            },
            {
                path: "/division",
                element: <PrivateRoute element={DivisionList} />,
            },
            {
                path: "/division/create",
                element: <PrivateRoute element={DivisionCreate} />,
            },
            {
                path: "/division/:id/edit",
                element: <PrivateRoute element={DivisionEdit} />,
            },
        ],
    },
];

// ----------------------
// Combine all routes
// ----------------------
const ThemeRoutes = [...LoginRoutes, ...FullLayoutRoutes];

export default ThemeRoutes;
