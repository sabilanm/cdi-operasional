import { useEffect, useState } from "react";
import { PlanService } from "../services/PlanService";
import ToastNotification from "../../../components/common/ToastNotification";
import { useNavigate } from "react-router-dom";

export const useList = () => {
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
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [status, setStatus] = useState();

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
            const res = await PlanService.getAll(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection
            );
            const respon = await PlanService.getAll();
            setData(respon.data);
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

    const handleDetail = (data) => {
        setOpen(true);
        setSelectedData(data);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatus((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (id, e) => {
        e.preventDefault();
        const postData = {
            status: status.status,
        };
        try {
            setLoading(true);
            const respon = await PlanService.update(id, postData);
            ToastNotification.success(
                respon.message || "Action Plan berhasil diupdate"
            );
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            setOpen(false);
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((msg) => ToastNotification.error(msg));
                });
            } else if (err.response?.data?.message) {
                ToastNotification.error(err.response.data.message);
            } else {
                ToastNotification.error(err.message || "Gagal submit data");
            }
        } finally {
            setLoading(false);
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
        open,
        selectedData,
        status,
        setOpen,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleDetail,
        handleChange,
        handleSubmit,
    };
};
