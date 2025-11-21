import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useArea = () => {
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
            const data = await areaService.getAll(
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
        navigate(`/areas/${id}/edit`);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus area ini?")) {
            try {
                await areaService.delete(id);
                fetchArea(length, page, delayedQuery, sortField, sortDirection);
                ToastNotification.success("Area berhasil dihapus");
            } catch (err) {
                ToastNotification.error("Gagal menghapus area");
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
        handleEditClick,
        handleDeleteClick,
        setSearchQuery,
    };
};
