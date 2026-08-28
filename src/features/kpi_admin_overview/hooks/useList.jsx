import { useEffect, useState } from "react";
import { overviewService } from "../services/overviewServices";
import {
    roleDropdown,
    branchDropdown,
    positionDropdown,
    divisionDropdown,
} from "../../dropdown/listDropdown";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [branch, setBranch] = useState();
    const [downloadLoading, setDownloadLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    const currentMonth = new Date().getMonth() + 1;
    const [localMonth, setLocalMonth] = useState(currentMonth);
    const [localYear, setLocalYear] = useState(currentYear);
    const monthOptions = [
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
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        }),
    );

    const fetchData = async (
        length,
        page,
        search,
        sortField,
        sortDirection,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const respon = await overviewService.getAll(
                length,
                page,
                search,
                sortField,
                sortDirection,
            );
            setData(respon.data);
            setTotalRecords(respon.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load divisions");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(length, page, search, sortField, sortDirection);
    }, [length, page, search, sortField, sortDirection]);
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
        "branch",
    );
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
    const handleFilter = () => {
        setSearch(searchQuery);
    };
    const handleClear = () => {
        setSearch("");
        setSearchQuery("");
    };

    const handleExport = async () => {
        setDownloadLoading(true);
        try {
            const response = await overviewService.export(
                localMonth,
                localYear,
                branch.id,
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "KPI_Admin.xlsx";
            a.click();
        } catch (e) {
            // ToastNotification.error("Gagal download template");
            console.log("gagal download");
        } finally {
            setDownloadLoading(false);
        }
    };
    const handleBranchChange = (selectedOptions) => {
        const single = selectedOptions;
        setBranch({
            id: single.value,
            name: single.label,
        });
    };
    return {
        data,
        loading,
        error,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        startRecord,
        branch,
        showModal,
        downloadLoading,
        monthOptions,
        yearOptions,
        localMonth,
        localYear,
        setLocalMonth,
        setLocalYear,
        handleBranchChange,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleFilter,
        handleClear,
        handleExport,
        setShowModal,
        loadBranchOptions,
    };
};
