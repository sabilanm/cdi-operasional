import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useDetailUser = (assignment, id) => {
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
        setLoading(true);

        if (data.score === null) {
            ToastNotification.error("Score tidak boleh kosong");
            setLoading(false);
            return;
        }

        try {
            const postData = { score: data.score };

            const respon = await SpecialAssignmentService.createScore(
                id,
                postData
            );
            ToastNotification.success(
                respon.message || "Jawaban berhasil diunggah"
            );

            setTimeout(() => {
                navigate(`/master-kpi/special-assignment/${assignment}/detail`);
            }, 1000);
        } catch (err) {
            ToastNotification.error("Terjadi kesalahan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        handleChange,
        handleSubmit,
    };
};
