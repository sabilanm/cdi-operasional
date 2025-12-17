// src/features/approval/hooks/useApprovalList.jsx
import { useEffect, useState, useCallback } from "react";
import { approvalService } from "../services/approvalService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useApprovalList = () => {
    // ===== DATA =====
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===== PAGINATION =====
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    // ===== FILTER AKTIF (UNTUK API) =====
    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
        user_id: "",
    });

    // ===== FILTER INPUT (UNTUK UI) =====
    const [tempFilters, setTempFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
        user_id: "",
    });

    // ===== SORTING =====
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");

    // ===== USER DROPDOWN =====
    const [username, setUsername] = useState(null);

    const loadUsernameOptions = useCallback(
        async (search, loadedOptions, { page }) => {
            try {
                const res = await approvalService.getDropdownUser(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
                    })),
                    hasMore: res.hasMore,
                    additional: { page: page + 1 },
                };
            } catch {
                return {
                    options: [],
                    hasMore: false,
                    additional: { page },
                };
            }
        },
        [] // PENTING → function reference STABIL
    );

    const handleUsernameChange = (selectedOption) => {
        setUsername(selectedOption);
        setTempFilters((prev) => ({
            ...prev,
            user_id: selectedOption ? selectedOption.value : "",
        }));
    };

    // ===== HANDLE INPUT FILTER =====
    const handleTempFilterChange = (e) => {
        const { name, value } = e.target;
        setTempFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ===== FETCH DATA =====
    const fetchMain = useCallback(
        async (pageParam = page, lengthParam = length, sortCol = sortColumn, sortDir = sortDirection, filterParam = filters) => {
            setLoading(true);
            setData([]);

            try {
                const res = await approvalService.getAll(
                    filterParam.start_date,
                    filterParam.end_date,
                    filterParam.branch,
                    "not started",
                    lengthParam,
                    pageParam,
                    sortCol,
                    sortDir,
                    filterParam.user_id,
                );

                setData(res.data || []);
                setTotalRecords(res.recordsFiltered || 0);
            } catch (err) {
                ToastNotification.error(err.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        },
        [page, length, sortColumn, sortDirection, filters],
    );

    // ===== AUTO FETCH (PAGINATION / SORTING SAJA) =====
    useEffect(() => {
        fetchMain();
    }, [page, length, sortColumn, sortDirection]);

    // ===== KLIK TOMBOL CARI =====
    const handleFilterSubmit = async () => {
        setFilters({ ...tempFilters });
        setPage(0);

        await fetchMain(0, length, sortColumn, sortDirection, tempFilters);
    };

    return {
        data,
        loading,

        page,
        length,
        totalRecords,
        rowsPerPageOptions,

        setPage,
        setLength,

        // filter
        filters,
        tempFilters,
        handleTempFilterChange,
        handleFilterSubmit,

        // sorting
        sortColumn,
        sortDirection,
        setSortColumn,
        setSortDirection,

        // user dropdown
        username,
        loadUsernameOptions,
        handleUsernameChange,

        fetchMain,
    };
};
