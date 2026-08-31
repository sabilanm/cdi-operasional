// src/featuers/scoreboard/hooks/useScoreboardList.jsx
import { useState, useEffect } from "react";
import { scoreboardService } from "../services/scoreboardService";
import ToastNotification from "../../../components/common/ToastNotification";
import { branchDropdown } from "../../dropdown/listDropdown";

export const useScoreboardList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [additionals, setAdditionals] = useState({ generate: false });
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [branch, setBranch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [yearExport, setYearExport] = useState(currentYear);
    const [monthExport, setMonthExport] = useState(currentMonth);

    const startYear = 2025;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        }),
    );
    // filters digunakan untuk fetch API
    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
        month: currentMonth,
        year: currentYear,
    });

    // tempFilters digunakan untuk input user sebelum submit
    const [tempFilters, setTempFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
        month: currentMonth,
        year: currentYear,
    });

    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const loadBranchOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await branchDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items || [];
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
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

        // update nilai branch ke tempFilters
        setTempFilters((prev) => ({
            ...prev,
            branch: selectedOption ? selectedOption.value : "",
        }));

        setPage(0);
    };

    // ===== FETCH DATA =====
    const fetchData = async (pageParam = page, lengthParam = length) => {
        setLoading(true);
        setData([]);
        try {
            const res = await scoreboardService.getAll(
                filters.start_date,
                filters.end_date,
                lengthParam,
                pageParam,
                "b.id",
                "asc",
                filters.month,
                filters.year,
                filters.branch,
            );
            setData(res.data || []);
            setTotalRecords(res.recordsFiltered || 0);
            setAdditionals(res.additionals || { generate: false });
        } catch (err) {
            setError(err);
            ToastNotification.error(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    // ===== EFFECT: REFETCH KETIKA filters, page, atau length berubah =====
    useEffect(() => {
        fetchData();
    }, [filters, page, length]);

    // ===== HANDLER =====
    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () =>
        setPage((prev) => (prev > 0 ? prev - 1 : 0));

    // update tempFilters saat input berubah
    const handleTempFilterChange = (e) => {
        const { name, value } = e.target;
        setTempFilters((prev) => ({ ...prev, [name]: value }));
    };

    // ketika klik tombol "Cari", baru update filters → trigger fetch
    const handleFilterSubmit = () => {
        setFilters({ ...tempFilters });
        setPage(0); // reset ke halaman pertama
    };

    const handleExport = async () => {
        setDownloadLoading(true);
        try {
            const response = await scoreboardService.export(
                monthExport,
                yearExport,
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "Scoreboard_final.xlsx";
            a.click();
        } catch (e) {
            console.error("Gagal download:", e);
        } finally {
            setDownloadLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        page,
        length,
        totalRecords,
        additionals,
        rowsPerPageOptions,
        filters: tempFilters,
        downloadLoading,
        showModal,
        yearExport,
        monthExport,
        setYearExport,
        setMonthExport,
        setShowModal,
        yearOptions,
        fetchData,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        handleTempFilterChange,
        handleFilterSubmit,
        branch,
        loadBranchOptions,
        handleBranchChange,
        handleExport,
    };
};
