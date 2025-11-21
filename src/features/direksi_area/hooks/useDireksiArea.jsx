import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useDireksiArea = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const fetchBranchArea = async (
        lengthParam = length,
        pageParam = page,
        searchParam = delayedQuery,
        sortFieldParam = sortField,
        sortDirectionParam = sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await direksiAreaService.getAll(
                searchParam,
                lengthParam,
                pageParam,
                sortFieldParam,
                sortDirectionParam
            );
            setData(res.data || []);
            setTotalRecords(
                res.recordsFiltered ?? res.recordsTotal ?? (res.data?.length || 0)
            );
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
        fetchBranchArea(length, page, delayedQuery, sortField, sortDirection);
    }, [length, page, delayedQuery, sortField, sortDirection]);

    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };
    const handleNextPage = () => setPage(page + 1);
    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleEditClick = (id, e) => {
        e.stopPropagation();
        navigate(`/direksi-area/${id}/edit`);
    };
    const handleDeleteClick = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus Direksi Area ini?")) {
            try {
                await direksiAreaService.delete(id);
                ToastNotification.success("Direksi Area berhasil dihapus");
                fetchBranchArea();
            } catch (err) {
                ToastNotification.error("Gagal menghapus Direksi Area");
            }
        }
    };
    return {
        data,
        loading,
        error,
        expandedItems,
        toggleExpand,
        handleEditClick,
        handleDeleteClick,
        refetch: fetchBranchArea,
        searchQuery,
        setSearchQuery,
        totalRecords,
        page,
        length,
        rowsPerPageOptions,
        handleRowsPerPageChange,
        handlePreviousPage,
        handleNextPage,
    };
};
