import { useEffect, useState } from "react";
import { menuService } from "../services/menuService";

export const useMenu = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await menuService.getAll();
            setRoles(data);
        } catch (err) {
            setError(err.message || "Failed to load menus");
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
