// src/features/auth/hooks/useLogin.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/auth/authSlice";

export const useLoginForm = () => {
    const dispatch = useDispatch();
    const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
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
        error,
        isLoggedIn,
    };
};
