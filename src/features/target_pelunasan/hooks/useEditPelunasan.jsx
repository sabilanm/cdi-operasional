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
            const res = await TargetPelunasanService.getById(id);
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
    const handleChange = (e, index) => {
        const { name, value } = e.target;

        setData((prev) => {
            const updatedChildren = [...prev.children];
            updatedChildren[index] = {
                ...updatedChildren[index],
                [name]: value,
            };

            return {
                ...prev,
                children: updatedChildren,
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);

        // const periode = new Date(data.startDate).toLocaleDateString("id-ID", {
        //     month: "long",
        //     year: "numeric",
        // });

        // const postData = {
        //     start_date: data.startDate,
        //     end_date: data.endDate,
        //     periode: periode,
        //     data: [1, 2, 3, 4].map((num) => ({
        //         range_level: num,
        //         min_range: data[`minRange${num}`] || "",
        //         max_range: data[`maxRange${num}`] || "",
        //         bobot: data[`bobot${num}`],
        //     })),
        // };
        // try {
        //     setLoading(true);
        //     const respon = await TargetPelunasanService.create(postData);
        //     ToastNotification.success(
        //         respon.message || "Target Pelunasan berhasil dibuat"
        //     );
        //     setTimeout(() => navigate("/master-kpi/target-pelunasan"), 1000);
        // } catch (err) {
        //     if (err.response?.data?.errors) {
        //         const errors = err.response.data.errors;
        //         Object.keys(errors).forEach((key) => {
        //             errors[key].forEach((msg) => ToastNotification.error(msg));
        //         });
        //     } else if (err.response?.data?.message) {
        //         ToastNotification.error(err.response.data.message);
        //     } else {
        //         ToastNotification.error(err.message || "Gagal submit data");
        //     }
        // } finally {
        //     setLoading(false);
        // }
    };

    return {
        data,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
