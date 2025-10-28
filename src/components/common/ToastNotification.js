// src/components/common/Toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = {
    success: (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    },
    error: (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    },
    info: (message) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    },
    warning: (message) => {
        toast.warning(message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    },
};

export default ToastNotification;
