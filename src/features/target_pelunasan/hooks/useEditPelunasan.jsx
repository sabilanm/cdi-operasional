import { useEffect, useState } from "react";
import { TargetPelunasanService } from "../services/PelunasanService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditPelunasan = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();

    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            // const res = await TargetPelunasanService.getById(id);
            // setData(res);
            const res = await TargetPelunasanService.getById(id);

            const startDate = res?.children?.[0]?.start_date || "";
            const endDate = res?.children?.[0]?.end_date || "";

            setData({
                ...res,
                startDate,
                endDate,
                children: res.children.map((item) => ({
                    ...item,
                    bobot: item.bobot || "",
                    min_range: item.min_range || "",
                    max_range: item.max_range || "",
                })),
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
    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (index !== null) {
            // update children
            setData((prev) => {
                const updatedChildren = [...prev.children];
                updatedChildren[index] = {
                    ...updatedChildren[index],
                    [name]: value,
                };
                return { ...prev, children: updatedChildren };
            });
        } else {
            // update date
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const periode = new Date(data.startDate).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
        });

        const postData = {
            start_date: data.startDate,
            end_date: data.endDate,
            periode,
            data: data.children.map((item) => ({
                range_level: item.range_level,
                min_range: item.min_range || "",
                max_range: item.max_range || "",
                bobot: item.bobot || "",
            })),
        };
        try {
            setLoading(true);
            const respon = await TargetPelunasanService.update(id, postData);
            ToastNotification.success(
                respon.message || "Target Pelunasan berhasil diubah"
            );
            setTimeout(() => navigate("/master-kpi/target-pelunasan"), 1000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((msg) => ToastNotification.error(msg));
                });
            } else if (err.response?.data?.message) {
                ToastNotification.error(err.response.data.message);
            } else {
                ToastNotification.error(err.message || "Gagal submit data");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
