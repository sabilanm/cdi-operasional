import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Form, Button, Row, Col, Spinner } from "reactstrap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import defaultImage from "../../assets/images/users/user6.png";
import gif from "../../assets/images/bg/login.gif";
import ToastNotification from "../../components/common/ToastNotification";
import "../../components/auth/Login.css";
import logo from "../../assets/images/logos/cobra_logo.png";
import loader from "../../assets/images/icon/loader.gif";
import close from "../../assets/images/icon/close-eye.png";
import open from "../../assets/images/icon/view.png";

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setProfileImage } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/login`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": "",
                    },
                }
            );

            // Set menu in cookies
            Cookies.set(
                "performa_menu",
                JSON.stringify(response.data.data.menus),
                {
                    expires: new Date(response.data.data.expires_at),
                    secure: true,
                    sameSite: "Strict",
                }
            );
            // Set menu in cookies
            Cookies.set(
                "performa_mytask",
                JSON.stringify(response.data.data.my_task),
                {
                    expires: new Date(response.data.data.expires_at),
                    secure: true,
                    sameSite: "Strict",
                }
            );

            // Set token dalam cookies
            Cookies.set("performa_token", response.data.data.access_token, {
                expires: new Date(response.data.data.expires_at),
                secure: true, // Hanya mengirimkan cookies di HTTPS
                sameSite: "Strict", // Menghindari CSRF
            });

            // Set user dalam cookies
            Cookies.set("performa_user", response.data.data.user.id, {
                expires: new Date(response.data.data.expires_at),
                secure: true, // Hanya mengirimkan cookies di HTTPS
                sameSite: "Strict", // Menghindari CSRF
            });

            // Set user dalam cookies
            Cookies.set("performa_name", response.data.data.user.name, {
                expires: new Date(response.data.data.expires_at),
                secure: true, // Hanya mengirimkan cookies di HTTPS
                sameSite: "Strict", // Menghindari CSRF
            });
            // Set id brnch dalam cookies
            Cookies.set("performa_branch", response.data.data.user.branch_id, {
                expires: new Date(response.data.data.expires_at),
                secure: true, // Hanya mengirimkan cookies di HTTPS
                sameSite: "Strict", // Menghindari CSRF
            });
            // Set id division dalam cookies
            Cookies.set(
                "performa_division",
                response.data.data.user.division_id,
                {
                    expires: new Date(response.data.data.expires_at),
                    secure: true, // Hanya mengirimkan cookies di HTTPS
                    sameSite: "Strict", // Menghindari CSRF
                }
            );

            // Set id roles dalam cookies
            Cookies.set("performa_role", response.data.data.user.roles[0].id, {
                expires: new Date(response.data.data.expires_at),
                secure: true, // Hanya mengirimkan cookies di HTTPS
                sameSite: "Strict", // Menghindari CSRF
            });

            // console.log("role", response.data.data.user.roles[0].id);
            // Ambil dan simpan foto profil
            const profileImage = response.data.data.user.image
                ? `${process.env.REACT_APP_IMAGE_URL}${response.data.data.user.image}`
                : defaultImage;

            Cookies.set("performa_profileImage", profileImage, {
                expires: new Date(response.data.data.expires_at),
                secure: true,
                sameSite: "Strict",
            });

            setProfileImage(profileImage);
            setLoading(false);

            ToastNotification.success("Login successful");
            setIsLoggedIn(true);
        } catch (error) {
            setLoading(false);
            console.error("Login Error:", error);
            ToastNotification.error(
                "Login failed. Please check your credentials."
            );
        }
    };
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Update mobile state on window resize
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className="position-relative z-3">
            <title>Performa</title>
            <div className="flex min-h-screen items-center justify-center bg-[#b7eff1] relative">
                <div class="area">
                    <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                {/* Left Side Illustration */}
                <div className="hidden md:flex w-1/2 items-center justify-center relative z-10">
                    <img src={gif} alt="illustration" className="w-2/3" />
                </div>
                {/* Right Side Login */}
                <div className="flex w-full md:w-1/2 items-center justify-center relative z-10">
                    {/* <div className="bg-white shadow-2xl rounded-2xl p-8 w-80 sm:w-96"> */}
                    <div className="bg-white/60 shadow-2xl rounded-2xl p-8 w-full max-w-xl">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="logo" className="w-2/5" />
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">
                            Login
                        </h1>
                        <h1 className="text-xl font-semibold text-gray-800 mb-12">
                            Wellcome back please login in to your account
                        </h1>

                        <Form onSubmit={handleLogin} className="space-y-6">
                            {/* Username */}
                            <div className="relative z-0 w-full group mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="peer block py-3 px-4 w-full text-base text-gray-800 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 placeholder-transparent"
                                    placeholder=" "
                                    value={username}
                                    onChange={(e) =>
                                        setusername(e.target.value)
                                    }
                                    required
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute text-sm text-gray-500 duration-300 transform 
             -translate-y-6 scale-75 top-3 left-4 
             bg-white/10 backdrop-blur-sm px-1 
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
             peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
             peer-placeholder-shown:left-4 
             peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 
             peer-focus:text-blue-500"
                                >
                                    Username
                                </label>
                            </div>

                            {/* Password */}
                            <div className="relative z-0 w-full group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="peer block py-3 px-4 w-full text-base text-gray-800 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 placeholder-transparent"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute text-sm text-gray-500 duration-300 transform 
             -translate-y-6 scale-75 top-3 left-4 
             bg-white/10 backdrop-blur-sm px-1 
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
             peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
             peer-placeholder-shown:left-4 
             peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 
             peer-focus:text-blue-500"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3 text-black"
                                >
                                    <img
                                        src={showPassword ? open : close}
                                        alt="toggle password"
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                className="w-full py-3 text-lg bg-[#00ACC1] text-white rounded-lg shadow-md hover:bg-[#00ACC1] hover:scale-105 transition-transform"
                                style={{ border: "2px solid black" }}
                            >
                                {loading ? <Spinner size="sm" /> : "Login"}
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
