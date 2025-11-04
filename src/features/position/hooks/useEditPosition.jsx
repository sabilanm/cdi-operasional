import { useEffect, useState } from "react";
import { positionService } from "../services/positionService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditPosition = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        name: "",
        status: "active",
    });
    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await positionService.getById(id);
            setData({
                name: res.name,
                status: res.status,
            });
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
        };
        try {
            const respon = await positionService.update(id, postData);
            ToastNotification.success(
                respon.message || "Posisi berhasil diubah."
            );
            setTimeout(() => navigate("/position"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
    };
};
