// src/features/jobdesc_admin/hooks/useList.jsx
import { useEffect, useState } from "react";
import { jobdesService } from "../services/jobdescService";

export const useJobdesc = (page  = 1, length  = 10, initFilters = {}) => {
    const [jobdescs, setJobdescs] = useState({ data: [], recordsTotal: 0, recordsFiltered: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initFilters);

    const fetchJobdesc = async (page = 1, length = 10, filtersOverride = filters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await jobdesService.getAll(page, length, filtersOverride);
            setJobdescs(data);
        } catch (err) {
            setError(err.message || "Failed to load..");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobdesc(page, length, filters);
    }, [page, length, filters]);

    return {
        jobdescs,
        loading,
        error,
        filters,
        setFilters,
        fetchJobdesc,
    };
};
