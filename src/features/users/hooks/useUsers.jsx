import { useEffect, useState } from "react";
import { usersService } from "../services/usersService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useUsers = () => {
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
    const [branch, setBranch] = useState(null);

    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    // Upload modal + file
    const [uploadModal, setUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchUsers = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const respon = await usersService.getAll(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection,
                branch?.value || ""
            );
            setData(respon.data);
            setTotalRecords(respon.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load user");
        } finally {
            setLoading(false);
        }
    };

    // debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDelayedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        fetchUsers(length, page, delayedQuery, sortField, sortDirection, branch);
    }, [length, page, delayedQuery, sortField, sortDirection, branch]);

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

    const startRecord = data.length > 0 ? page * length + 1 : 0;

    const handleDeleteClick = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
            try {
                await usersService.delete(id);
                fetchUsers(length, page, delayedQuery, sortField, sortDirection, branch);
                ToastNotification.success("User berhasil dihapus");
            } catch (err) {
                ToastNotification.error("Gagal menghapus user");
            }
        }
    };

    /** ============================
     *  Download Template Excel
     ==============================*/
    const handleDownloadTemplate = async () => {
        try {
            const response = await usersService.downloadTemplate();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "template_users.xlsx";
            a.click();
        } catch (e) {
            ToastNotification.error("Gagal download template");
        }
    };

    /** ============================
     *  Upload Excel
     ==============================*/
    const handleUploadExcel = async () => {
        if (!selectedFile) {
            ToastNotification.info("Pilih file terlebih dahulu");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await usersService.uploadExcel(formData);
            ToastNotification.success("Upload berhasil");
            setUploadModal(false);
            setSelectedFile(null);

            // reload data
            fetchUsers(length, page, delayedQuery, sortField, sortDirection, branch);
        } catch (e) {
            ToastNotification.error("Upload gagal");
        }
    };

    return {
        data,
        loading,
        error,
        page,
        length,
        totalRecords,
        searchQuery,
        delayedQuery,
        sortField,
        sortDirection,
        branch,
        rowsPerPageOptions,
        uploadModal,
        selectedFile,

        setSearchQuery,
        setSortField,
        setSortDirection,
        setBranch,
        setUploadModal,
        setSelectedFile,

        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        handleDeleteClick,
        handleDownloadTemplate,
        handleUploadExcel,

        startRecord,
    };
};
