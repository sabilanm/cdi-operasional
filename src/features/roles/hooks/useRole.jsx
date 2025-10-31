import { useEffect, useState } from "react";
import { roleService } from "../services/roleService";

export const useRole = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await roleService.getAll();
            setRoles(data);
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
        loading,
        error,
        refetch: fetchRoles,
    };
};
