import { useEffect, useState } from "react";
import { profitLossService } from "../services/P&LService";

export const useProfitLoss = () => {
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

    const fetchDivisions = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await profitLossService.getAll(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection
            );
            const list = res.data?.data || res.data || [];
            const items = Array.isArray(list) ? list : [];
            const mapped = items.map((item) => ({
                id: item.id,
                cabang: item.branch,
                periode: `${item.month} ${item.year}`,
                presentase: `${item.persentase} %`,
                file: item.file || null,
                pl: item.pnl === "profit" ? "Profit" : "Loss",
                score: item.score,
                status: item.status,
            }));
            setData(mapped);
            setTotalRecords(
                (res.data && (res.data.recordsFiltered ?? res.data.recordsTotal)) ?? mapped.length
            );
        } catch (err) {
            setError(err.message || "Failed to load profit & loss");
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
        fetchDivisions(length, page, delayedQuery, sortField, sortDirection);
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
        refetch: () =>
            fetchDivisions(length, page, delayedQuery, sortField, sortDirection),
    };
};
