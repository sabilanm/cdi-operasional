import { useEffect, useState } from "react";
import { cLevelService } from "../services/cLevelService";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCLevel = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const fetchArea = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cLevelService.getAll(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection
            );
            setData(data.data);
            setTotalRecords(data.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDelayedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);
    useEffect(() => {
        fetchArea(length, page, delayedQuery, sortField, sortDirection);
    }, [length, page, delayedQuery, sortField, sortDirection]);
    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    const startRecord = page * length + 1;
    const handleEditClick = (id) => {
        navigate(`/c-level/${id}/edit`);
    };
    const handleDeleteClick = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus CLevel ini?")) {
            try {
                await cLevelService.delete(id);
                ToastNotification.success("CLevel berhasil dihapus");
                fetchArea(length, page, delayedQuery, sortField, sortDirection);
            } catch (err) {
                ToastNotification.error("Gagal menghapus CLevel");
            }
        }
    };
    return {
        data,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleEditClick,
        handleDeleteClick,
    };
};
