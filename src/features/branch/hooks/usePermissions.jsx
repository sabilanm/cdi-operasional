import { useEffect, useState } from "react";
import { permissionsService } from "../services/permissionsService";

export const usePermissions = () => {
    const [permission, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await permissionsService.getAll();
            setPermissions(data);
        } catch (err) {
            setError(err.message || "Failed to load permissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    return {
        permission,
        loading,
        error,
        refetch: fetchPermissions,
    };
};
