import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate, useParams } from "react-router-dom";
import { branchDropdown } from "../../dropdown/listDropdown";

export const useDetailList = (id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    const [branch, setBranch] = useState([]);
    const fetchPermissions = async (
        length,
        page,
        delayedQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await SpecialAssignmentService.getDetailId(id);
            setData(res);
            const respon = await SpecialAssignmentService.getDetail(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection,
                id
            );
            setList(respon.data);
            setTotalRecords(respon.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load roles");
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
        fetchPermissions(length, page, delayedQuery, sortField, sortDirection);
    }, [length, page, delayedQuery, sortField, sortDirection]);
    const createLoadOptions = (fetchFn, label) => {
        return async (search, loadedOptions, { page }) => {
            try {
                const res = await fetchFn(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
                    })),
                    hasMore: res.hasMore,
                    additional: {
                        page: page + 1,
                    },
                };
            } catch (error) {
                console.error(`Error loading ${label} options:`, error);
                return {
                    options: [],
                    hasMore: false,
                    additional: { page },
                };
            }
        };
    };

    const loadBranchOptions = createLoadOptions(
        branchDropdown.getAll,
        "branch"
    );
    const handleBranchChange = (selectedOptions) => {
        const updated = Array.isArray(selectedOptions)
            ? selectedOptions.map((opt) => ({ id: opt.value, name: opt.label }))
            : [];
        setBranch(updated);
    };
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
        list,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        branch,
        loadBranchOptions,
        handleBranchChange,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
    };
};
