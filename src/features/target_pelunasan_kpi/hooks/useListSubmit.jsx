import { useEffect, useState } from "react";
import { pelunasanService } from "../services/TargetPelunasanService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useListSubmit = () => {
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

    const fetchDatas = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const respon = await pelunasanService.getList();
            // setData(respon.data);
            if (respon.success) {
                setData(respon.data);
            } else {
                setData([]);
            }
            setTotalRecords(respon.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load divisions");
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
        fetchDatas(length, page, delayedQuery, sortField, sortDirection);
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

    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await pelunasanService.delete(id);
                ToastNotification.success("Pelunasan berhasil dihapus");
            } catch (err) {
                ToastNotification.error(
                    err.message || "Gagal menghapus Profit & Loss",
                );
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
        handleDelete,
    };
};
