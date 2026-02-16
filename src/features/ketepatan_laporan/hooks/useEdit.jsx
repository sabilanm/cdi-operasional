import { useEffect, useState } from "react";
import { ketepatanService } from "../services/ketepatan";
import { useNavigate, useParams } from "react-router-dom";
import { branchesService } from "../../branch/services/branchesService";
import Cookies from "js-cookie";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEdit = (id) => {
    const userBranch = Cookies.get("operasional_branch");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [branch, setBranch] = useState();
    const [mounth, setMounth] = useState();
    const [year, setYear] = useState();
    const [existingFile, setExistingFile] = useState(null);
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
    const startYear = 2025;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        }),
    );

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const detailBranch = await branchesService.getById(
                Number(userBranch),
            );
            setBranch({
                value: detailBranch?.id,
                label: detailBranch?.name,
            });
            const detail = await ketepatanService.getById(id);
            const monthOpt = mounthOptions.find(
                (opt) =>
                    opt.label.toLowerCase() ===
                    String(detail.month).toLowerCase(),
            );
            setMounth(
                monthOpt
                    ? { id: monthOpt.value, name: monthOpt.label }
                    : { id: detail.month, name: detail.month },
            );
            setYear({
                id: parseInt(detail.year, 10),
                name: String(detail.year),
            });
            setData(detail);
            setExistingFile(detail.file || null);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
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
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({ ...prev, file }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("month", mounth?.id?.toString().padStart(2, "0"));
        formData.append("year", year?.id);
        formData.append("branch_id", userBranch);
        formData.append("ketepatan", data?.ketepatan);
        formData.append("legal", data?.legal);
        formData.append("notes", data?.notes);
        formData.append("file", data.file);
        try {
            const respon = await ketepatanService.update(id, formData);
            ToastNotification.success(
                respon.message || "Ketepatan laporan berhasil diperbarui",
            );
            setTimeout(() => navigate("/ketepatan-laporan"), 1000);
        } catch (err) {
            ToastNotification.error(
                err.message || "Gagal memperbarui Ketepatan laporan",
            );
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
        existingFile,
        loading,
        handleChange,
        handleMounthChange,
        handleYearChange,
        handleFileChange,
        handleSubmit,
    };
};
