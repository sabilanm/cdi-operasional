import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useDetail = (id) => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await SpecialAssignmentService.getById(id);
            setData(res);
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
            link: data.link,
        };
        try {
            const respon = await SpecialAssignmentService.update(id, postData);
            ToastNotification.success(
                respon.message || "Jawaban berhasil diunggah"
            );
            setTimeout(() => navigate("/my-assignments"), 1000);
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
