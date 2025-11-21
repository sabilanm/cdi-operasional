// src/features/approval/hooks/useList.jsx
import { useEffect, useState } from "react";
import { approvalService } from "../services/approval";
import ToastNotification from "../../../components/common/ToastNotification";

export const useList = () => {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [additionals, setAdditionals] = useState(null);

    const [searchFilters, setSearchFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
    });

    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    const startRecord = page * length + 1;

    // === GENERATE BULANAN ===
    const handleGenerateBulanan = async (filters = searchFilters) => {
        if (!window.confirm("Yakin ingin melakukan generate bulanan?")) return;

        setLoading(true);
        try {
            const result = await approvalService.generateBulanan(filters);
            ToastNotification.success(result.message || "Generate bulanan berhasil!");
            await fetchAllByStatus(length, page, filters);
        } catch (err) {
            console.error("Error generate:", err);
            ToastNotification.error(err.message || "Terjadi kesalahan saat generate bulanan.");
        } finally {
            setLoading(false);
        }
    };

    // === SUBMIT POP ===
    const handleSubmitPop = async (id, formData, filters = {}) => {
        if (!id) return alert("ID tidak valid.");

        setLoading(true);
        try {
            const res = await approvalService.updateMyActivity(id, formData);
            ToastNotification.success(res.message || "Data berhasil disimpan");

            // refresh data setelah update
            await fetchAllByStatus(length, page, filters);
        } catch (err) {
            console.error("Error update activity:", err);
            ToastNotification.error(err.message || "Terjadi kesalahan saat update data");
        } finally {
            setLoading(false);
        }
    };

    // === USE EFFECT ===
    useEffect(() => {
        fetchAllByStatus(length, page, searchFilters);
    }, [length, page, searchFilters]);

    // === PAGINATION HANDLER ===
    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleNextPage = () => {
        setMainPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchMain(nextPage, mainLength);
            return nextPage;
        });
    };

    const handlePreviousPage = () => {
        setMainPage(prevPage => {
            const prev = prevPage > 0 ? prevPage - 1 : 0;
            fetchMain(prev, mainLength);
            return prev;
        });
    };

    return {
        data,
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
