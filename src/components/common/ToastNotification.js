// src/components/common/Toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastCss.css";

const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
};

const ToastNotification = {
    success: (message) =>
        toast.success(message, {
            ...baseOptions,
            className: "toast-success",
        }),

    error: (message) =>
        toast.error(message, {
            ...baseOptions,
            className: "toast-error",
        }),

    info: (message) =>
        toast.info(message, {
            ...baseOptions,
            className: "toast-info",
        }),

    warning: (message) =>
        toast.warning(message, {
            ...baseOptions,
            className: "toast-warning",
        }),
};

export default ToastNotification;
