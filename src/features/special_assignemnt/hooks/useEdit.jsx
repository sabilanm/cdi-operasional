import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEdit = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevState) => ({
                ...prevState,
                file: file,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("start_date", data.start_date);
        formData.append("end_date", data.end_date);
        formData.append("assignment", data.assignment);
        formData.append("bobot", data.bobot);
        if (data.file) {
            formData.append("file", data.file);
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        try {
            const respon = await SpecialAssignmentService.update(id, formData);
            ToastNotification.success(
                respon.message || "Assignment berhasil diubah."
            );
            setTimeout(() => navigate("/master-kpi/special-assignment"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};
