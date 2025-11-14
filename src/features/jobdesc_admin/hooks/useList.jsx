// src/features/jobdesc_admin/hooks/useList.jsx
import { useEffect, useState } from "react";
import { jobdesService } from "../services/jobdescService";

export const useJobdesc = (initFilters = {}) => {
    const [jobdescs, setJobdescs] = useState({ data: [], recordsTotal: 0, recordsFiltered: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initFilters);

    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const rowsPerPageOptions = [5, 10, 20, 50];
    const totalRecords = jobdescs.recordsTotal || 0;

    const fetchJobdesc = async (pageIndex = page, pageLength = length, filtersOverride = filters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await jobdesService.getAll(pageIndex + 1, pageLength, filtersOverride);
            setJobdescs(data);
        } catch (err) {
            setError(err.message || "Failed to load jobdesc");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobdesc(page, length, filters);
    }, [page, length, filters]);

    const handleRowsPerPageChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        setLength(newLength);
        setPage(0);
    };

    const handleNextPage = () => setPage(page + 1);
    const handlePreviousPage = () => setPage(page > 0 ? page - 1 : 0);

    return {
        jobdescs,
        loading,
        error,
        filters,
        setFilters,
        fetchJobdesc,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
    };
};
