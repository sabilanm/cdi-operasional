import { useState } from "react";
import { authService } from "../services/authService";
// import ToastNotification from "../../components/common/ToastNotification";
import ToastNotification from "../../../components/common/ToastNotification";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = {
            username: username,
            password: password,
        };
        try {
            const data = await authService.login(credentials);
            setIsLoggedIn(true);
            setLoading(false);
            ToastNotification.success("Login successful");
        } catch (err) {
            return err;
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
        isLoggedIn,
    };
};
