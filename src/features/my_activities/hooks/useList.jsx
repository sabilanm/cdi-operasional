// src/features/my_activities/hooks/useList.jsx
import { useEffect, useState } from "react";
import { myActivitiesService } from "../services/my_activities";
import ToastNotification from "../../../components/common/ToastNotification";

export const useList = () => {
    const [data, setData] = useState([]);
    const [rejectedData, setRejectedData] = useState([]);
    const [approvedData, setApprovedData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [length, setLength] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const [additionals, setAdditionals] = useState(null);

    const [searchFilters, setSearchFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
    });

    const rowsPerPageOptions = [5, 10, 20, 30, 40, 50];
    const startRecord = page * length + 1;

    // Fungsi panggil semua status
    const fetchAllByStatus = async (lengthParam = length, pageParam = page, filters = searchFilters) => {
        setLoading(true);
        setError(null);
        try {
            // not_started
            const mainRes = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "not started",
                lengthParam,
                pageParam,
                "jt.start_date",
                "asc"
            );
            setData(mainRes.data || []);
            setTotalRecords(mainRes.recordsFiltered || 0);
            setAdditionals(mainRes.additionals || { generate: true });

            // rejected
            const rejectedRes = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "rejected",
                lengthParam,
                pageParam,
                "jt.start_date",
                "asc"
            );
            setRejectedData(rejectedRes.data || []);

            // approved
            const approvedRes = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "approved",
                lengthParam,
                pageParam,
                "id",
                "asc"
            );
            setApprovedData(approvedRes.data || []);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // === GENERATE BULANAN ===
    const handleGenerateBulanan = async (filters = searchFilters) => {
        if (!window.confirm("Yakin ingin melakukan generate bulanan?")) return;

        setLoading(true);
        try {
            const result = await myActivitiesService.generateBulanan(filters);

            ToastNotification.success(
                result.message || "Generate bulanan berhasil!"
            );
            await fetchAllByStatus(length, page, filters);
        } catch (err) {
            console.error("Error generate:", err);
            ToastNotification.error(
                err.message || "Terjadi kesalahan saat generate bulanan."
            );
        } finally {
            setLoading(false);
        }
    };

    // === SUBMIT POP / UPDATE AKTIVITAS ===
    const handleSubmitPop = async (id, formData, filters = {}) => {
        if (!id) return alert("ID tidak valid.");

        setLoading(true);
        try {
            const res = await myActivitiesService.updateMyActivity(id, formData);

            ToastNotification.success(
                res.message || "Data berhasil disimpan"
            );

            // refresh data setelah update
            await fetchAllByStatus(length, page, filters);
        } catch (err) {
            console.error("Error update activity:", err);

            ToastNotification.error(
                err.message || "Terjadi kesalahan saat update data"
            );
        } finally {
            setLoading(false);
        }
    };

    // Panggil otomatis saat mount / filter / page / length berubah
    useEffect(() => {
        fetchAllByStatus(length, page, searchFilters);
    }, [length, page, searchFilters]);

    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleNextPage = () => setPage(page + 1);
    const handlePreviousPage = () => page > 0 && setPage(page - 1);

    return {
        data,
        rejectedData,
        approvedData,
        page,
        length,
        totalRecords,
        searchFilters,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        additionals,
        setSearchFilters,
        fetchAllByStatus,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        handleGenerateBulanan,
        handleSubmitPop,
    };
};
