// src/routes/Router.js
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Helper untuk membungkus PrivateRoute
const priv = (Component) => <PrivateRoute element={Component} />;

// Layout
const FullLayout = lazy(() => import("../layouts/FullLayout"));

// Auth & General Pages
const LoginLazy = lazy(() => import("../features/auth/ui/Login"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

// UI Components
const Badges = lazy(() => import("../views/ui/Badges"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

// --- Feature Imports ---
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

const ScoreboardList = lazy(() => import("../features/scoreboard/ui/List"));
const ScoreboardDetail = lazy(() => import("../features/scoreboard/ui/Detail"));
const ScoreboardDetailUser = lazy(() =>
    import("../features/scoreboard/ui/DetailUser")
);

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
const SpecialAssignmentDetailUser = lazy(() =>
    import("../features/special_assignemnt/ui/DetailUser")
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
const TargetPelunasanSubmit = lazy(() =>
    import("../features/target_pelunasan_kpi/ui/listSubmit")
);
const TargetPelunasanSubmitCreate = lazy(() =>
    import("../features/target_pelunasan_kpi/ui/Create")
);
const TargetPelunasanSubmitEdit = lazy(() =>
    import("../features/target_pelunasan_kpi/ui/Edit")
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
const ApprovalProfitLossList = lazy(() =>
    import("../features/approval_pnl/ui/List")
);
const TargetPelunasanKPIList = lazy(() =>
    import("../features/target_pelunasan_kpi/ui/List")
);
const ActionPlanList = lazy(() => import("../features/action_plan/ui/List"));
const ActionPlanMaster = lazy(() =>
    import("../features/action_plan/ui/ListMaster")
);
const ActionPlanMasterCreate = lazy(() =>
    import("../features/action_plan/ui/CreateMaster")
);
const ActionPlanMasterEdit = lazy(() =>
    import("../features/action_plan/ui/EditMaster")
);
const MasterKPIAdmin = lazy(() => import("../features/KPIAdmin/ui/List"));
const MasterKPIAdminCreate = lazy(() =>
    import("../features/KPIAdmin/ui/Create")
);
const MasterKPIAdminEdit = lazy(() => import("../features/KPIAdmin/ui/Edit"));
const KPIScoring = lazy(() => import("../features/scoring_kpi/ui/List"));
const KPIScoringDetail = lazy(() => import("../features/scoring_kpi/ui/Input"));
const ApprovalKPIAdmin = lazy(() => import("../features/approval_kpi/ui/List"));
const ApprovalKPIAdminDetail = lazy(() =>
    import("../features/approval_kpi/ui/Detail")
);
const Overview = lazy(() => import("../features/kpi_admin_overview/ui/List"));

// ----------------------
// Public routes
// ----------------------
const LoginRoutes = [
    { path: "/login", element: <LoginLazy /> },
    { path: "*", element: <NotFound /> },
];

// ----------------------
// Protected routes
// ----------------------
const FullLayoutRoutes = [
    {
        path: "/",
        element: <FullLayout />,
        children: [
            { index: true, element: <Navigate to="/dashboard" /> },

            { path: "dashboard", element: priv(DashboardPage) },

            // UI
            { path: "badges", element: priv(Badges) },
            { path: "breadcrumbs", element: priv(Breadcrumbs) },

            // Roles
            { path: "roles", element: priv(RoleList) },
            { path: "roles/create", element: priv(RoleCreate) },
            { path: "roles/:id/edit", element: priv(RoleEdit) },

            // Menus
            { path: "menus", element: priv(MenuList) },
            { path: "menus/create", element: priv(MenuCreate) },
            { path: "menus/:id/edit", element: priv(MenuEdit) },

            // Permissions
            { path: "permissions", element: priv(PermissionsList) },
            { path: "permissions/create", element: priv(PermissionsCreate) },
            { path: "permissions/:id/edit", element: priv(PermissionsEdit) },

            // Branch
            { path: "branches", element: priv(BranchList) },
            { path: "branches/create", element: priv(BranchCreate) },
            { path: "branches/:id/edit", element: priv(BranchEdit) },

            // Division
            { path: "division", element: priv(DivisionList) },
            { path: "division/create", element: priv(DivisionCreate) },
            { path: "division/:id/edit", element: priv(DivisionEdit) },

            // Position
            { path: "position", element: priv(PositionList) },
            { path: "position/create", element: priv(PositionCreate) },
            { path: "position/:id/edit", element: priv(PositionEdit) },

            // Branch Area
            { path: "branch-areas", element: priv(BranchAreaList) },
            { path: "branch-areas/create", element: priv(BranchAreaCreate) },
            { path: "branch-areas/:id/edit", element: priv(BranchAreaEdit) },

            // Areas
            { path: "areas", element: priv(AreaList) },
            { path: "areas/create", element: priv(AreaCreate) },
            { path: "areas/:id/edit", element: priv(AreaEdit) },

            // C-Level
            { path: "c-level", element: priv(CLevelList) },
            { path: "c-level/create", element: priv(CLevelCreate) },
            { path: "c-level/:id/edit", element: priv(CLevelEdit) },

            // Direksi Area
            { path: "direksi-area", element: priv(DireksiAreaList) },
            { path: "direksi-area/create", element: priv(DireksiAreaCreate) },
            { path: "direksi-area/:id/edit", element: priv(DireksiAreaEdit) },

            // Users
            { path: "users", element: priv(UsersList) },
            { path: "users/create", element: priv(UsersCreate) },
            { path: "users/:id/detail", element: priv(UsersDetail) },
            { path: "users/:id/edit", element: priv(UsersEdit) },

            // Jobdesc
            { path: "master-kpi/jobdescs", element: priv(JobdescAdminList) },
            {
                path: "master-kpi/jobdescs/create",
                element: priv(JobdescCreate),
            },
            {
                path: "master-kpi/jobdescs/:id/edit",
                element: priv(JobdescEdit),
            },

            // Special Assignment
            {
                path: "master-kpi/special-assignment",
                element: priv(SpecialAssignmentList),
            },
            {
                path: "master-kpi/special-assignment/create",
                element: priv(SpecialAssignmentCreate),
            },
            {
                path: "master-kpi/special-assignment/:id/detail",
                element: priv(SpecialAssignmentDetail),
            },
            {
                path: "master-kpi/special-assignment/:id/detail/:assignment_detail_id/assignment_detail",
                element: priv(SpecialAssignmentDetailUser),
            },
            {
                path: "master-kpi/special-assignment/:id/edit",
                element: priv(SpecialAssignmentEdit),
            },
            {
                path: "master-kpi/special-assignment/:id/edit",
                element: priv(SpecialAssignmentEdit),
            },

            // Target Pelunasan
            {
                path: "master-kpi/target-pelunasan",
                element: priv(TargetPelunasanList),
            },
            {
                path: "master-kpi/target-pelunasan/create",
                element: priv(TargetPelunasanCreate),
            },
            {
                path: "master-kpi/target-pelunasan/:id/edit",
                element: priv(TargetPelunasanEdit),
            },
            {
                path: "pelunasan/submit",
                element: priv(TargetPelunasanSubmit),
            },
            {
                path: "pelunasan/submit/create",
                element: priv(TargetPelunasanSubmitCreate),
            },
            {
                path: "pelunasan/submit/:id/edit",
                element: priv(TargetPelunasanSubmitEdit),
            },

            // My Assignment
            { path: "my-assignments", element: priv(MyAssignmentList) },
            {
                path: "my-assignments/:id/detail",
                element: priv(MyAssignmentDetail),
            },

            // Approval
            { path: "approvals", element: priv(ApprovalList) },

            // My Activity
            { path: "my-activities", element: priv(MyActivityList) },

            // Scoreboard
            { path: "scoreboards", element: priv(ScoreboardList) },
            { path: "scoreboards/:id/detail", element: priv(ScoreboardDetail) },
            {
                path: "scoreboards/:branchId/user/:userId/position/:positionId",
                element: priv(ScoreboardDetailUser),
            },

            { path: "/profit-loss", element: priv(ProfitLossList) },
            { path: "/profit-loss/create", element: priv(ProfitLossCreate) },
            { path: "/profit-loss/:id/edit", element: priv(ProfitLossEdit) },
            {
                path: "/approval-profit-loss",
                element: priv(ApprovalProfitLossList),
            },
            {
                path: "/target-pelunasan",
                element: priv(TargetPelunasanKPIList),
            },
            {
                path: "/action-plan",
                element: priv(ActionPlanList),
            },
            {
                path: "/masterKPI",
                element: priv(ActionPlanMaster),
            },
            {
                path: "/masterKPI/create",
                element: priv(ActionPlanMasterCreate),
            },
            {
                path: "/masterKPI/:id/edit",
                element: priv(ActionPlanMasterEdit),
            },
            {
                path: "/KPIAdmin",
                element: priv(MasterKPIAdmin),
            },
            {
                path: "/KPIAdmin/create",
                element: priv(MasterKPIAdminCreate),
            },
            {
                path: "/KPIAdmin/:id/edit",
                element: priv(MasterKPIAdminEdit),
            },
            {
                path: "/KPIScoring",
                element: priv(KPIScoring),
            },
            {
                path: "/KPIScoring/user/:id",
                element: priv(KPIScoringDetail),
            },
            {
                path: "/approvalKPIAdmin",
                element: priv(ApprovalKPIAdmin),
            },
            {
                path: "/approvalKPIAdmin/:id/detail",
                element: priv(ApprovalKPIAdminDetail),
            },
            {
                path: "/overview",
                element: priv(Overview),
            },
            // Internal Wildcard
            { path: "*", element: <Navigate to="/dashboard" /> },
        ],
    },
];

// ----------------------
// Combine routes
// ----------------------
const ThemeRoutes = [...LoginRoutes, ...FullLayoutRoutes];

export default ThemeRoutes;
