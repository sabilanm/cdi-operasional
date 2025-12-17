import { useEffect, useState } from "react";
import { pelunasanService } from "../services/TargetPelunasanService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { branchesService } from "../../branch/services/branchesService";

export const useEditPelunasan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [branch, setBranch] = useState();
    const [mounth, setMounth] = useState();
    const [year, setYear] = useState();
    const [persen, setPersen] = useState();
    const [periode, setPeriode] = useState();
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
            const res = await pelunasanService.getById(id);
            setData(res);
            // setPeriode(res.periode);
            const detail = await branchesService.getById(Number(res.branch_id));
            setBranch({
                value: detail.id,
                label: detail.name,
            });
            const [tahun, bulan] = res.periode.split("-") || [];
            const selectedMonth = mounthOptions.find(
                (m) => m.value === Number(bulan)
            );
            const selectedYear = yearOptions.find(
                (y) => y.value === Number(tahun)
            );
            setMounth(selectedMonth || null);
            setYear(selectedYear || null);
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        let val = (data?.realisasi / data?.target) * 100;
        setPersen(Math.round(val));
    }, [data?.target, data?.realisasi]);

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleMounthChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setMounth({
            value: selectedOptions.value,
            label: selectedOptions.label,
        });
    };
    const handleYearChange = (selectedOptions) => {
        if (!selectedOptions) return;
        setYear({
            value: selectedOptions.value,
            label: selectedOptions.label,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            tahun: `${year.value}`,
            bulan: `${mounth.value.toString().padStart(2, "0")}`,
            target_gov: data.target_gov,
            target_reguler: data.target_reguler,
            target_omset: data.target_omset,
            realisasi: data.realisasi,
        };
        try {
            setLoading(true);
            const respon = await pelunasanService.update(id, postData);
            ToastNotification.success(
                respon.message || "Target Pelunasan berhasil dibuat"
            );
            setTimeout(() => navigate("/pelunasan/submit"), 1000);
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
        persen,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleMounthChange,
        handleYearChange,
    };
};
