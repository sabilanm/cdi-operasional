import { useEffect, useState } from "react";
import { profitLossService } from "../services/P&LService";
import { branchDropdown } from "../../dropdown/listDropdown";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [branch, setBranch] = useState(null);
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const fetchDivisions = async (
        length,
        page,
        _searchQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await profitLossService.getApprovalList(
                branch?.value || "",
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
                persentase: `${item.persentase} %`,
                file: item.file || null,
                pl: item.pnl === "profit" ? "Profit" : "Loss",
                score: item.score,
                status: item.status,
            }));
            setData(mapped);
            setTotalRecords(
                (res.data && (res.data.recordsFiltered ?? res.data.recordsTotal)) ??
                mapped.length
            );
        } catch (err) {
            setError(err.message || "Failed to load approval P&L");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDivisions(length, page, "", sortField, sortDirection);
    }, [length, page, branch, sortField, sortDirection]);

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

    const loadBranchOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await branchDropdown.getAll(search, loadedOptions, { page });
            const items = res.items || [];
            return {
                options: items.map((item) => ({ value: item.id, label: item.name })),
                hasMore: res.hasMore,
                additional: { page: page + 1 },
            };
        } catch (error) {
            return {
                options: [],
                hasMore: false,
                additional: { page },
            };
        }
    };
    const handleBranchChange = (selectedOption) => {
        setBranch(selectedOption || null);
        setPage(0);
    };

    return {
        data,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        branch,
        loadBranchOptions,
        handleBranchChange,
        refetch: () => fetchDivisions(length, page, "", sortField, sortDirection),
    };
};
