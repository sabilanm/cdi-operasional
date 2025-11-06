import { useState } from "react";
import { authService } from "../services/authService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    return {
        username,
        setUsername,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        handleLogin,
        loading,
        setLoading,
        isLoggedIn,
    };
};
