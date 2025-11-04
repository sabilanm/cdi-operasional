import { useEffect, useState } from "react";
import { roleService } from "../services/roleService";

export const useRole = () => {
    const [roles, setRoles] = useState([]);
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

    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await roleService.getAll();
            setRoles(data.data);
            setTotalRecords(data.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return {
        roles,
        page,
        length,
        totalRecords,
        searchQuery,
        delayedQuery,
        sortField,
        sortDirection,
        rowsPerPageOptions,
        loading,
        error,
        refetch: fetchRoles,
    };
};
