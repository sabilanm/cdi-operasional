// src/layouts/Header.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Button } from "reactstrap";

import logo from "../assets/images/logos/logo.png";
import axios from "axios";
import Cookies from "js-cookie";
import "./header.css";
// import { useSelector } from "react-redux";

const Header = () => {
    // from state redux
    // const { user, token } = useSelector((state) => state.auth);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    // const displayImage = user?.image || Cookies.get("operasional_profileImage");
    const name = Cookies.get("operasional_name");
    const userId = Cookies.get("operasional_user");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasFailed, setHasFailed] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    let isSidebarOpen = false;
    let clickedToggleButton = false;

    const showMobilemenu = () => {
        clickedToggleButton = true; // tandai kalau tombol diklik

        const sidebar = document.getElementById("sidebarArea");
        const dot = document.getElementById("dotCanvas");

        if (window.innerWidth < 768) {
            if (isSidebarOpen) {
                // Tutup
                sidebar.classList.remove(
                    "showSidebar",
                    "sidebarArea-mobile",
                    "block"
                );
                sidebar.classList.add("hidden");
                dot.classList.remove("dotCanvas-mobile");
                isSidebarOpen = false;
                document.removeEventListener("click", handleOutsideClick);
            } else {
                // Buka
                sidebar.classList.add(
                    "showSidebar",
                    "sidebarArea-mobile",
                    "block"
                );
                sidebar.classList.remove("hidden");
                dot.classList.add("dotCanvas-mobile");
                isSidebarOpen = true;

                // Tambah listener klik luar (sedikit delay supaya gak nabrak klik tombol)
                setTimeout(() => {
                    document.addEventListener("click", handleOutsideClick);
                }, 10);
            }
        } else if (window.innerWidth < 1000) {
            if (isSidebarOpen) {
                // Tutup sidebar
                sidebar.classList.remove(
                    "showSidebar",
                    "sidebarArea-mobile",
                    "block"
                );
                sidebar.classList.add("hidden");
                dot.classList.remove("dotCanvas-mobile");
                isSidebarOpen = false;
                document.removeEventListener("click", handleOutsideClick);
            } else {
                // Buka sidebar
                sidebar.classList.add(
                    "showSidebar",
                    "sidebarArea-mobile",
                    "block"
                );
                sidebar.classList.remove("hidden");
                dot.classList.add("dotCanvas-mobile");
                isSidebarOpen = true;

                setTimeout(() => {
                    document.addEventListener("click", handleOutsideClick);
                }, 10);
            }
        } else {
            sidebar.classList.toggle("hideSidebar");
        }
    };

    const handleOutsideClick = (event) => {
        const sidebar = document.getElementById("sidebarArea");
        const toggleButton = document.getElementById("toggleSidebarBtn");

        if (clickedToggleButton) {
            clickedToggleButton = false;
            return;
        }

        if (
            window.innerWidth < 1000 && // berlaku untuk mobile + tablet
            sidebar &&
            !sidebar.contains(event.target) &&
            (!toggleButton || !toggleButton.contains(event.target))
        ) {
            sidebar.classList.remove(
                "showSidebar",
                "sidebarArea-mobile",
                "block"
            );
            sidebar.classList.add("hidden");

            const dot = document.getElementById("dotCanvas");
            dot.classList.remove("dotCanvas-mobile");

            isSidebarOpen = false;
            document.removeEventListener("click", handleOutsideClick);
        }
    };

    // Fungsi untuk menangani klik di luar dropdown
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setNotificationOpen(false);
        }
    };

    // Menambahkan event listener saat dropdown terbuka
    useEffect(() => {
        if (notificationOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationOpen]);

    const handleMyAccountClick = () => {
        navigate(`/users/${userId}/edit`);
    };

    // Fungsi untuk mengambil notifikasi dari API
    const fetchNotifications = useCallback(async () => {
        if (loading || !hasMore || hasFailed) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_API_BASE_URL
                }/notifications/list?limit=5&offset=${page * 5}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("_token")}`,
                    },
                }
            );
            console.log("API Response:", response.data); // Tambahkan log ini
            if (response.data.data.length > 0) {
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    ...response.data.data,
                ]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setHasFailed(true);
        }
        setLoading(false);
    }, [page, hasMore, loading, hasFailed]);

    // Use fetchNotifications in useEffect when notifications open
    useEffect(() => {
        if (notificationOpen && notifications.length === 0) {
            fetchNotifications();
        }
    }, [notificationOpen, notifications.length, fetchNotifications]);

    return (
        <Navbar
            // color="primary"
            expand="md"
            style={{
                position: "fixed",
                zIndex: "999",
                width: "-webkit-fill-available",
                // backgroundColor: "#E2F5FF",
                backgroundColor: "#B2EBF2",
            }}
        >
            <div className="d-flex align-items-center">
                <NavbarBrand className="d-lg-none">
                    {/* <LogoWhite /> */}
                    <img
                        style={{ width: "40px", height: "40px" }}
                        src={logo}
                        alt="Logo"
                    />
                </NavbarBrand>
                <Button
                    id="toggleSidebarBtn"
                    onClick={(e) => {
                        e.stopPropagation(); // cegah klik ini dianggap klik luar
                        showMobilemenu();
                    }}
                    style={{
                        backgroundColor: "#B2EBF2",
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                    }}
                >
                    <i
                        style={{ fontSize: "25px", color: "black" }}
                        className="bi bi-filter-left"
                    ></i>
                </Button>
            </div>
            <div className="row">
                <div
                    className="col d-flex align-items-center"
                    style={{ paddingLeft: "0px" }}
                >
                    <div
                        className="flex items-center pr-4 gap-2 cursor-pointer"
                        onClick={handleMyAccountClick}
                    >
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img
                                // src={displayImage}
                                src=""
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label className="font-medium text-black cursor-pointer">
                            {/* {name} */}
                            {(() => {
                                const names =
                                    name?.length > 10
                                        ? name.slice(0, 10) + "..."
                                        : name;
                                return <strong>{names}</strong>;
                            })()}
                        </label>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;
