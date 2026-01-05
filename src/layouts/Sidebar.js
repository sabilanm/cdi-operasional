import { useState, useEffect } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Logo from "./LogoSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./sidebar.css";
// import { useDispatch } from "react-redux";
// import { logout } from "../store/auth/authSlice";

const Sidebar = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenMaster, setIsOpenMaster] = useState(false);
    const [isOpenScoreboard, setIsOpenScoreboard] = useState(false);
    const [isOpenAssignment, setIsOpenAssignment] = useState(false);
    const [isOpenPNL, setIsOpenPNL] = useState(false);
    const [isOpenTargetPelunasan, setIsOpenTargetPelunasan] = useState(false);
    const [isOpenActionPlan, setIsOpenActionPlan] = useState(false);
    const [isOpenKPIAdmin, setIsOpenKPIAdmin] = useState(false);
    const location = useLocation();
    const menusEncoded = Cookies.get("operasional_menu");
    const myTasks = Cookies.get("operasional_mytask");
    const total = myTasks ? JSON.parse(myTasks) : { done: 0, not_started: 0 };
    let allowedMenus = [];

    // Check if the cookie exists
    if (menusEncoded) {
        try {
            // Decode and parse cookie value
            const menusDecoded = decodeURIComponent(menusEncoded);
            allowedMenus = JSON.parse(menusDecoded);
        } catch (error) {
            console.error("Failed to parse menus:", error);
        }
    } else {
        console.warn("No menus found in cookies, using default allowedMenus.");
        // Here you can set a default allowedMenus if needed
        allowedMenus = []; // or provide a default list
    }

    // Update the collapse state based on the current route
    useEffect(() => {
        if (
            location.pathname.startsWith("/master-kpi/jobdescs") ||
            location.pathname.startsWith("/my-activities") ||
            location.pathname.startsWith("/scoreboards") ||
            location.pathname.startsWith("/approvals")
        ) {
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(true);
            setIsOpenMaster(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/roles") ||
            location.pathname.startsWith("/menus") ||
            location.pathname.startsWith("/permissions") ||
            location.pathname.startsWith("/branches") ||
            location.pathname.startsWith("/division") ||
            location.pathname.startsWith("/position") ||
            location.pathname.startsWith("/areas") ||
            location.pathname.startsWith("/branch-areas") ||
            location.pathname.startsWith("/c-level") ||
            location.pathname.startsWith("/direksi-area")
        ) {
            setIsOpenMaster(true);
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/master-kpi/special-assignment") ||
            location.pathname.startsWith("/my-assignments")
        ) {
            setIsOpenMaster(false);
            setIsOpenAssignment(true);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/profit-loss") ||
            location.pathname.startsWith("/approval-profit-loss")
        ) {
            setIsOpenMaster(false);
            setIsOpenAssignment(false);
            setIsOpenPNL(true);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/target-pelunasan") ||
            location.pathname.startsWith("/master-kpi/target-pelunasan") ||
            location.pathname.startsWith("/pelunasan/submit")
        ) {
            setIsOpenMaster(false);
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(true);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/masterKPI") ||
            location.pathname.startsWith("/action-plan")
        ) {
            setIsOpenMaster(false);
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(true);
            setIsOpenKPIAdmin(false);
        } else if (
            location.pathname.startsWith("/KPIAdmin") ||
            location.pathname.startsWith("/KPIScoring") ||
            location.pathname.startsWith("/approvalKPIAdmin") ||
            location.pathname.startsWith("/overview")
        ) {
            setIsOpenMaster(false);
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(true);
        } else {
            setIsOpenMaster(false);
            setIsOpenAssignment(false);
            setIsOpenPNL(false);
            setIsOpenScoreboard(false);
            setIsOpenTargetPelunasan(false);
            setIsOpenActionPlan(false);
            setIsOpenKPIAdmin(false);
        }
    }, [location.pathname]);

    const isActive = (path) => location.pathname.startsWith(path);

    const menu = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: "bi bi-columns-gap",
        },
        {
            title: "Users",
            path: "/users",
            icon: "bi bi-people",
        },
        // Scoreboard
        {
            title: "Scoreboards",
            icon: "bi bi-bar-chart-steps",
            children: [
                {
                    title: "Create Task",
                    path: "/master-kpi/jobdescs",
                    icon: "bi bi-clipboard-check",
                },
                {
                    title: "Task Execution",
                    path: "/my-activities",
                    icon: "bi bi-person-workspace",
                },
                {
                    title: "Approval",
                    path: "/approvals",
                    icon: "bi bi-check2-square",
                },
                {
                    title: "Final Scoreboards",
                    path: "/scoreboards",
                    icon: "bi bi-clipboard-data",
                },
            ],
        },
        // Special Assignments
        {
            title: "Special Assignments",
            icon: "bi bi-pen ",
            children: [
                {
                    title: "Create Task",
                    path: "/master-kpi/special-assignment",
                    icon: "bi bi-clipboard-check",
                },
                {
                    title: "Task Execution",
                    path: "/my-assignments",
                    icon: "bi bi-person-workspace",
                },
            ],
        },
        // Profit n Loss
        {
            title: "Profit & Loss",
            icon: "bi bi-bar-chart-line",
            children: [
                {
                    title: "Submission",
                    path: "/profit-loss",
                    icon: "bi bi-upload",
                },
                {
                    title: "Approval",
                    path: "/approval-profit-loss",
                    icon: "bi bi-check2-square",
                },
            ],
        },
        // Target Pelunasan
        {
            title: "Target Pelunasan",
            icon: "bi bi-flag",
            children: [
                {
                    title: "Target Setup",
                    path: "/master-kpi/target-pelunasan",
                    icon: "bi bi-gear",
                },
                {
                    title: "Submit",
                    path: "/pelunasan/submit",
                    icon: "bi bi-gear",
                },
                {
                    title: "Target Overview",
                    path: "/target-pelunasan",
                    icon: "bi bi-clipboard-data",
                },
            ],
        },
        // Action Plan
        {
            title: "Action Plan & KPI BOH",
            icon: "bi bi-bullseye",
            children: [
                {
                    title: "Master KPI",
                    path: "/masterKPI",
                    icon: "bi bi-gear",
                },
                {
                    title: "Action Plan",
                    path: "/action-plan",
                    icon: "bi bi-bullseye",
                },
            ],
        },
        // KPI Admin
        {
            title: "KPI Admin",
            icon: "bi bi-bullseye",
            children: [
                {
                    title: "Master KPI Admin",
                    path: "/KPIAdmin",
                    icon: "bi bi-gear",
                },
                {
                    title: "Scoring",
                    path: "/KPIScoring",
                    icon: "bi bi-gear",
                },
                {
                    title: "Approval",
                    path: "/approvalKPIAdmin",
                    icon: "bi bi-gear",
                },
                {
                    title: "Overview",
                    path: "/overview",
                    icon: "bi bi-bullseye",
                },
            ],
        },
        {
            title: "Master",
            icon: "bi bi-hdd-stack",
            children: [
                {
                    title: "Roles",
                    path: "/roles",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Menus",
                    path: "/menus",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Permissions",
                    path: "/permissions",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Branch",
                    path: "/branches",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Division",
                    path: "/division",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Position",
                    path: "/position",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Areas",
                    path: "/areas",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Branch Area",
                    path: "/branch-areas",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "C Level",
                    path: "/c-level",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
                {
                    title: "Direksi Area",
                    path: "/direksi-area",
                    icon: "bi bi-folder2",
                    badge: 0,
                },
            ],
        },
    ];

    // Menyaring navigasi berdasarkan allowedMenus
    const filteredNavigation = menu.filter((navi) => {
        if (navi.children) {
            navi.children = navi.children.filter((child) =>
                allowedMenus.includes(child.path.slice(1))
            );
            return navi.children.length > 0;
        }
        return allowedMenus.includes(navi.path.slice(1));
    });

    return (
        <div className="fixed flex flex-col w-64 h-screen z-50" id="dotCanvas">
            {/* Sidebar Header */}
            <div className="bg-gradient-to-b from-[#80DEEA] to-[#E0F7FA] text-white p-6 flex flex-col items-center justify-center h-36">
                <Logo />
            </div>
            {/* Sidebar Menu */}
            <div className="flex-1 bg-[#E0F7FA] pt-4 pb-4 pl-4 overflow-auto">
                <Nav vertical>
                    {filteredNavigation.map((item, index) => (
                        // {menu.map((item, index) => (
                        <NavItem
                            key={index}
                            className="sidenav-bg cursor-pointer"
                        >
                            {item.children ? (
                                <>
                                    <NavLink
                                        className={`nav-link px-3 py-2 ${
                                            (item.title === "Scoreboards" &&
                                                isOpenScoreboard) ||
                                            (item.title === "Master" &&
                                                isOpenMaster) ||
                                            (item.title ===
                                                "Special Assignments" &&
                                                isOpenAssignment) ||
                                            (item.title === "Profit & Loss" &&
                                                isOpenPNL) ||
                                            (item.title ===
                                                "Target Pelunasan" &&
                                                isOpenTargetPelunasan) ||
                                            (item.title ===
                                                "Action Plan & KPI BOH" &&
                                                isOpenActionPlan) ||
                                            (item.title === "KPI Admin" &&
                                                isOpenKPIAdmin)
                                                ? "text-[#004D40] fade show bg-[#E0F7FA]"
                                                : "text-[#004D40] bg-[#E0F7FA] hover:bg-[#E0F7FA]"
                                        }`}
                                        onClick={() => {
                                            if (item.title === "Master") {
                                                setIsOpenMaster(!isOpenMaster);
                                            }
                                            if (item.title === "Scoreboards") {
                                                setIsOpenScoreboard(
                                                    !isOpenScoreboard
                                                );
                                            }
                                            if (
                                                item.title ===
                                                "Special Assignments"
                                            ) {
                                                setIsOpenAssignment(
                                                    !isOpenAssignment
                                                );
                                            }
                                            if (
                                                item.title === "Profit & Loss"
                                            ) {
                                                setIsOpenPNL(!isOpenPNL);
                                            }
                                            if (
                                                item.title ===
                                                "Target Pelunasan"
                                            ) {
                                                setIsOpenTargetPelunasan(
                                                    !isOpenTargetPelunasan
                                                );
                                            }
                                            if (
                                                item.title ===
                                                "Action Plan & KPI BOH"
                                            ) {
                                                setIsOpenActionPlan(
                                                    !isOpenActionPlan
                                                );
                                            }
                                            if (item.title === "KPI Admin") {
                                                setIsOpenKPIAdmin(
                                                    !isOpenKPIAdmin
                                                );
                                            }
                                        }}
                                    >
                                        <i className={item.icon}></i>
                                        <span className="ms-2 d-inline-block">
                                            {item.title}
                                        </span>
                                    </NavLink>
                                    {(item.title === "Master" &&
                                        isOpenMaster) ||
                                    (item.title === "Scoreboards" &&
                                        isOpenScoreboard) ||
                                    (item.title === "Special Assignments" &&
                                        isOpenAssignment) ||
                                    (item.title === "Profit & Loss" &&
                                        isOpenPNL) ||
                                    (item.title === "Target Pelunasan" &&
                                        isOpenTargetPelunasan) ||
                                    (item.title === "Action Plan & KPI BOH" &&
                                        isOpenActionPlan) ||
                                    (item.title === "KPI Admin" &&
                                        isOpenKPIAdmin) ? (
                                        <ul className="nav-children bg-[#E0F7FA] hover:bg-[#E0F7FA]">
                                            {item.children.map(
                                                (child, childIndex) => (
                                                    <NavItem
                                                        key={childIndex}
                                                        className="bg-[#E0F7FA] hover:bg-[#E0F7FA]"
                                                    >
                                                        <NavLink
                                                            onClick={() =>
                                                                navigate(
                                                                    child.path
                                                                )
                                                            }
                                                            className={
                                                                isActive(
                                                                    child.path
                                                                )
                                                                    ? "flex items-center px-4 py-2 rounded-l-full bg-[#00BCD4] text-white font-semibold shadow-md"
                                                                    : "flex items-center px-4 py-2 text-[#004D40] hover:rounded-l-full hover:bg-[#00BCD4] hover:text-white"
                                                            }
                                                        >
                                                            <span className="d-inline-block">
                                                                <i
                                                                    class={
                                                                        child.icon
                                                                    }
                                                                ></i>{" "}
                                                                {child.title}
                                                            </span>
                                                        </NavLink>
                                                    </NavItem>
                                                )
                                            )}
                                        </ul>
                                    ) : null}
                                </>
                            ) : (
                                <NavLink
                                    key={index}
                                    onClick={() => navigate(item.path)}
                                    className={
                                        location.pathname.startsWith(item.path)
                                            ? "flex items-center px-3 py-2 rounded-l-full bg-[#00BCD4] text-white font-semibold shadow-md"
                                            : "flex items-center px-3 py-2 text-[#004D40] hover:bg-[#00BCD4] hover:rounded-l-full hover:text-white"
                                    }
                                >
                                    <i className={item.icon}></i>
                                    <span className="ms-2 d-inline-block">
                                        {item.title}
                                    </span>
                                </NavLink>
                            )}
                        </NavItem>
                    ))}
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
