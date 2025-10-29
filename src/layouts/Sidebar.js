import { useState, useEffect } from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import Logo from "./LogoSidebar";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./sidebar.css";
import { Icon } from "@iconify/react";
import ToastNotification from "../components/common/ToastNotification";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenMyTask, setIsOpenMyTask] = useState(false);
    const [isOpenMaster, setIsOpenMaster] = useState(false);
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
            setIsOpenMyTask(false);
        } else if (
            location.pathname.startsWith("/not-started") ||
            location.pathname.startsWith("/in-progress") ||
            location.pathname.startsWith("/done")
        ) {
            setIsOpenMyTask(true);
            setIsOpenMaster(false);
        } else {
            setIsOpenMyTask(false);
            setIsOpenMaster(false);
        }
    }, [location.pathname]);

    const isActive = (path) => location.pathname.startsWith(path);
    // console.log("lok", location.pathname);

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
        {
            title: "Kompetensi",
            path: "/competencies",
            icon: "bi bi-journals",
        },
        {
            title: "Assignment",
            path: "/assignment",
            icon: "bi bi-journal-bookmark",
        },
        {
            title: "Minimum Scores",
            path: "/minimum-scores",
            icon: "bi bi-layout-text-sidebar-reverse",
        },
        {
            title: "MyTask",
            icon: "bi bi-list-task",
            children: [
                {
                    title: "Not Started",
                    path: "/not-started",
                    icon: "bi bi-view-list",
                    badge: total.not_started,
                },
                // {
                //     title: "In Progress",
                //     path: "/in-progress",
                //     icon: "bi bi-view-list",
                //     badge: InProgress,
                // },
                {
                    title: "Done",
                    path: "/done",
                    icon: "bi bi-view-list",
                    badge: total.done,
                },
            ],
        },
        {
            title: "Questionnaires",
            path: "/questionnaires",
            icon: "bi bi-clipboard-data",
        },
        {
            title: "Scoreboard",
            path: "/scoreboard",
            icon: "bi-bar-chart-line",
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
    // console.log(allowedMenus);
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

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Logout server
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get(
                            process.env.REACT_APP_TOKEN
                        )}`,
                    },
                }
            );

            // Hapus semua cookie
            const cookiesToRemove = [
                "operasional_token",
                "operasional_menu",
                "operasional_profileImage",
                "operasional_branch",
                "operasional_division",
                "operasional_name",
                "operasional_user",
                "operasional_role",
                "operasional_totalNotif",
            ];
            cookiesToRemove.forEach((cookie) =>
                Cookies.remove(cookie, { path: "/" })
            );

            dispatch(logout());

            ToastNotification.success("Logout successful");

            // Redirect cepat sebelum Sidebar re-render
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout Error:", error);
            ToastNotification.error("Logout failed. Please try again.");
        }
    };

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
                                        className={`nav-link px-4 py-2 ${
                                            (item.title === "MyTask" &&
                                                isOpenMyTask) ||
                                            (item.title === "Master" &&
                                                isOpenMaster)
                                                ? "text-[#004D40] fade show bg-[#E0F7FA]"
                                                : "text-[#004D40] bg-[#E0F7FA] hover:bg-[#E0F7FA]"
                                        }`}
                                        onClick={() => {
                                            if (item.title === "MyTask") {
                                                setIsOpenMyTask(!isOpenMyTask);
                                            }
                                            if (item.title === "Master") {
                                                setIsOpenMaster(!isOpenMaster);
                                            }
                                        }}
                                    >
                                        <i className={item.icon}></i>
                                        <span className="ms-3 d-inline-block">
                                            {item.title}
                                        </span>
                                    </NavLink>
                                    {(item.title === "MyTask" &&
                                        isOpenMyTask) ||
                                    (item.title === "Master" &&
                                        isOpenMaster) ? (
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
                                                            {child.badge >
                                                                0 && (
                                                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full shadow-md min-w-[18px] text-center">
                                                                    {
                                                                        child.badge
                                                                    }
                                                                </span>
                                                            )}
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
                                            ? "flex items-center px-4 py-2 rounded-l-full bg-[#00BCD4] text-white font-semibold shadow-md"
                                            : "flex items-center px-4 py-2 text-[#004D40] hover:bg-[#00BCD4] hover:rounded-l-full hover:text-white"
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
            <hr className="border-2 border-grey-400" />
            {/* logout */}
            <div className="bg-[#E0F7FA] text-[#004D40] p-6 flex flex-col items-center justify-center h-16">
                <button
                    className="w-44 flex flex-row items-center justify-center gap-2 px-4 py-2
                   rounded-lg bg-[#B2DFDB]/80 hover:bg-[#80CBC4]/90
                   text-[#004D40] shadow-md transition"
                    onClick={handleLogout}
                >
                    <Icon
                        icon="solar:logout-2-outline"
                        width="20"
                        height="20"
                    />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
