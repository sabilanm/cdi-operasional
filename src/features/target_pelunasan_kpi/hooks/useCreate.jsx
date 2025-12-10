import { useEffect, useState } from "react";
import { profitLossService } from "../services/TargetPelunasanService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { branchesService } from "../../branch/services/branchesService";
import Cookies from "js-cookie";

export const useCreatePelunasan = () => {
    const userBranch = Cookies.get("operasional_branch");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [branch, setBranch] = useState();
    const [mounth, setMounth] = useState();
    const [year, setYear] = useState();
    const mounthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        })
    );
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const detail = await branchesService.getById(Number(userBranch));
            setBranch({
                value: detail.id,
                label: detail.name,
            });
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleMounthChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setMounth({
            id: selectedOptions.value,
            name: selectedOptions.label,
        });
    };
    const handleYearChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setYear({
            id: selectedOptions.value,
            name: selectedOptions.label,
        });
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
            periode: periode,
            data: [1, 2, 3, 4].map((num) => ({
                range_level: num,
                min_range: data[`minRange${num}`] || "",
                max_range: data[`maxRange${num}`] || "",
                bobot: data[`bobot${num}`],
            })),
        };
        try {
            setLoading(true);
            const respon = await profitLossService.create(postData);
            ToastNotification.success(
                respon.message || "Target Pelunasan berhasil dibuat"
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
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleMounthChange,
        handleYearChange,
    };
};
