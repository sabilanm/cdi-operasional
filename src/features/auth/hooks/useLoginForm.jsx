import { useState } from "react";
import { authService } from "../services/authService";
import Cookies from "js-cookie";
import ToastNotification from "../../../components/common/ToastNotification";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingSSO, setLoadingSSO] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // 🔥 tambahkan ini

        const credentials = {
            username,
            password,
        };

        try {
            const data = await authService.login(credentials);
            ToastNotification.success("Login successful");
            setIsLoggedIn(true);
        } catch (err) {
            console.log(err);
            ToastNotification.error("Password / email salah");
        } finally {
            setLoading(false);
        }
    };

    const handleSSOLogin = async () => {
        setLoadingSSO(true);
        try {
            await authService.loginSSO();
            ToastNotification.success("SSO Login successful");
            setIsLoggedIn(true);
        } catch (err) {
            
            if (err.message === "LOGIN_PERFORMA_REQUIRED") {

                ToastNotification.warning(
                    "Silakan login ke CDI Performa terlebih dahulu."
                );

                setTimeout(() => {
                    window.open(
                        process.env.REACT_APP_SSO_LOGIN_URL,
                        "_blank"
                    );
                }, 1500);

                return;
            }

            if (err.response?.status === 401) {

                ToastNotification.warning(
                    "Session CDI Performa telah habis. Silakan login kembali."
                );

                Cookies.remove("performa_token");

                setTimeout(() => {
                    window.open(
                        process.env.REACT_APP_SSO_LOGIN_URL,
                        "_blank"
                    );
                }, 1500);

                return;
            }
            ToastNotification.error("SSO Login gagal.");
        } finally {
            setLoadingSSO(false);

        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        handleLogin,
        handleSSOLogin,
        loading,
        loadingSSO,
        setLoading,
        isLoggedIn,
    };
};
