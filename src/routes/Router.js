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
const JobdescAdminList = lazy(() =>
    import("../features/jobdesc_admin/ui/List")
);
const JobdescCreate = lazy(() => import("../features/jobdesc_admin/ui/Create"));
const JobdescEdit = lazy(() => import("../features/jobdesc_admin/ui/Edit"));
const MyActivityList = lazy(() => import("../features/my_activities/ui/List"));
const ApprovalList = lazy(() => import("../features/approval/ui/List"));
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
const PositionList = lazy(() => import("../features/position/ui/List"));
const PositionCreate = lazy(() => import("../features/position/ui/Create"));
const PositionEdit = lazy(() => import("../features/position/ui/Edit"));
const BranchAreaList = lazy(() => import("../features/branchArea/ui/List"));
const BranchAreaCreate = lazy(() => import("../features/branchArea/ui/Create"));
const BranchAreaEdit = lazy(() => import("../features/branchArea/ui/Edit"));
const AreaList = lazy(() => import("../features/areas/ui/List"));
const AreaCreate = lazy(() => import("../features/areas/ui/Create"));
const AreaEdit = lazy(() => import("../features/areas/ui/Edit"));
const CLevelList = lazy(() => import("../features/cLevel/ui/List"));
const CLevelCreate = lazy(() => import("../features/cLevel/ui/Create"));
const CLevelEdit = lazy(() => import("../features/cLevel/ui/Edit"));
const DireksiAreaList = lazy(() => import("../features/direksi_area/ui/List"));
const DireksiAreaCreate = lazy(() =>
    import("../features/direksi_area/ui/Create")
);
const DireksiAreaEdit = lazy(() => import("../features/direksi_area/ui/Edit"));
const UsersList = lazy(() => import("../features/users/ui/List"));
const UsersCreate = lazy(() => import("../features/users/ui/Create"));
const UsersEdit = lazy(() => import("../features/users/ui/Edit"));
const UsersDetail = lazy(() => import("../features/users/ui/Detail"));
const SpecialAssignmentList = lazy(() =>
    import("../features/special_assignemnt/ui/List")
);
const SpecialAssignmentCreate = lazy(() =>
    import("../features/special_assignemnt/ui/Create")
);
const SpecialAssignmentDetail = lazy(() =>
    import("../features/special_assignemnt/ui/Detail")
);
const SpecialAssignmentEdit = lazy(() =>
    import("../features/special_assignemnt/ui/Edit")
);
const TargetPelunasanList = lazy(() =>
    import("../features/target_pelunasan/ui/List")
);
const TargetPelunasanCreate = lazy(() =>
    import("../features/target_pelunasan/ui/Create")
);
const TargetPelunasanEdit = lazy(() =>
    import("../features/target_pelunasan/ui/Edit")
);
const MyAssignmentList = lazy(() =>
    import("../features/my_assignment/ui/List")
);
const MyAssignmentDetail = lazy(() =>
    import("../features/my_assignment/ui/Detail")
);
const ProfitLossList = lazy(() => import("../features/profit_loss/ui/List"));
const ProfitLossCreate = lazy(() =>
    import("../features/profit_loss/ui/Create")
);
const ProfitLossEdit = lazy(() => import("../features/profit_loss/ui/Edit"));

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
                path: "/master-kpi/jobdescs",
                element: <PrivateRoute element={JobdescAdminList} />,
            },
            {
                path: "/master-kpi/jobdescs/create",
                element: <PrivateRoute element={JobdescCreate} />,
            },
            {
                path: "/master-kpi/jobdescs/:id/edit",
                element: <PrivateRoute element={JobdescEdit} />,
            },
            {
                path: "/approvals",
                element: <PrivateRoute element={ApprovalList} />,
            },
            {
                path: "/my-activities",
                element: <PrivateRoute element={MyActivityList} />,
            },
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
            {
                path: "/position",
                element: <PrivateRoute element={PositionList} />,
            },
            {
                path: "/position/create",
                element: <PrivateRoute element={PositionCreate} />,
            },
            {
                path: "/position/:id/edit",
                element: <PrivateRoute element={PositionEdit} />,
            },
            {
                path: "/branch-areas",
                element: <PrivateRoute element={BranchAreaList} />,
            },
            {
                path: "/branch-areas/create",
                element: <PrivateRoute element={BranchAreaCreate} />,
            },
            {
                path: "/branch-areas/:id/edit",
                element: <PrivateRoute element={BranchAreaEdit} />,
            },
            {
                path: "/areas",
                element: <PrivateRoute element={AreaList} />,
            },
            {
                path: "/areas/create",
                element: <PrivateRoute element={AreaCreate} />,
            },
            {
                path: "/areas/:id/edit",
                element: <PrivateRoute element={AreaEdit} />,
            },
            {
                path: "/c-level",
                element: <PrivateRoute element={CLevelList} />,
            },
            {
                path: "/c-level/create",
                element: <PrivateRoute element={CLevelCreate} />,
            },
            {
                path: "/c-level/:id/edit",
                element: <PrivateRoute element={CLevelEdit} />,
            },
            {
                path: "/direksi-area",
                element: <PrivateRoute element={DireksiAreaList} />,
            },
            {
                path: "/direksi-area/create",
                element: <PrivateRoute element={DireksiAreaCreate} />,
            },
            {
                path: "/direksi-area/:id/edit",
                element: <PrivateRoute element={DireksiAreaEdit} />,
            },
            {
                path: "/users",
                element: <PrivateRoute element={UsersList} />,
            },
            {
                path: "/users/create",
                element: <PrivateRoute element={UsersCreate} />,
            },
            {
                path: "/users/:id/detail",
                element: <PrivateRoute element={UsersDetail} />,
            },
            {
                path: "/users/:id/edit",
                element: <PrivateRoute element={UsersEdit} />,
            },
            {
                path: "/master-kpi/special-assignment",
                element: <PrivateRoute element={SpecialAssignmentList} />,
            },
            {
                path: "/master-kpi/special-assignment/create",
                element: <PrivateRoute element={SpecialAssignmentCreate} />,
            },
            {
                path: "/master-kpi/special-assignment/:id/detail",
                element: <PrivateRoute element={SpecialAssignmentDetail} />,
            },
            {
                path: "/master-kpi/special-assignment/:id/edit",
                element: <PrivateRoute element={SpecialAssignmentEdit} />,
            },
            {
                path: "/master-kpi/target-pelunasan",
                element: <PrivateRoute element={TargetPelunasanList} />,
            },
            {
                path: "/master-kpi/target-pelunasan/create",
                element: <PrivateRoute element={TargetPelunasanCreate} />,
            },
            {
                path: "master-kpi/target-pelunasan/:id/edit",
                element: <PrivateRoute element={TargetPelunasanEdit} />,
            },
            {
                path: "/my-assignments",
                element: <PrivateRoute element={MyAssignmentList} />,
            },
            {
                path: "/my-assignments/:id/detail",
                element: <PrivateRoute element={MyAssignmentDetail} />,
            },
            {
                path: "/profit-loss",
                element: <PrivateRoute element={ProfitLossList} />,
            },
            {
                path: "/profit-loss/create",
                element: <PrivateRoute element={ProfitLossCreate} />,
            },
            {
                path: "/profit-loss/:id/edit",
                element: <PrivateRoute element={ProfitLossEdit} />,
            },
        ],
    },
];

// ----------------------
// Combine all routes
// ----------------------
const ThemeRoutes = [...LoginRoutes, ...FullLayoutRoutes];

export default ThemeRoutes;
