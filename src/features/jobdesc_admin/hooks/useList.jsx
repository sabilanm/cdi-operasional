// src/features/jobdesc_admin/hooks/useList.jsx
import { useEffect, useState } from "react";
import { jobdesService } from "../services/jobdescService";

export const useJobdesc = (initialPage = 1, initialLength = 10) => {
    const [jobdescs, setJobdescs] = useState({ data: [], recordsTotal: 0, recordsFiltered: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobdesc = async (page = initialPage, length = initialLength) => {
        setLoading(true);
        setError(null);
        try {
            const data = await jobdesService.getAll(page, length);
            setJobdescs(data);
        } catch (err) {
            setError(err.message || "Failed to load..");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobdesc(initialPage, initialLength);
    }, []);

    return {
        jobdescs,
        loading,
        error,
        fetchJobdesc,
    };
};
