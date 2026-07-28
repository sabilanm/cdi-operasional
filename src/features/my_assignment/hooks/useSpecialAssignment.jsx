import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";

export const useSpecialAssignment = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [localStartDate, setLocalStartDate] = useState("");
    const [localEndDate, setLocalEndDate] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const fetchUsers = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection,
        localStartDate,
        localEndDate,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const respon = await SpecialAssignmentService.getAll(
                searchQuery,
                length,
                page,
                sortField,
                sortDirection,
                localStartDate,
                localEndDate,
            );
            setData(respon.data);
            setTotalRecords(respon.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load branch");
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
        fetchUsers(
            length,
            page,
            delayedQuery,
            sortField,
            sortDirection,
            localStartDate,
            localEndDate,
        );
    }, [
        length,
        page,
        delayedQuery,
        sortField,
        sortDirection,
        localStartDate,
        localEndDate,
    ]);
    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };
    const handleFilter = () => {
        setLocalStartDate(startDate);
        setLocalEndDate(endDate);
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
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleFilter,
    };
};
