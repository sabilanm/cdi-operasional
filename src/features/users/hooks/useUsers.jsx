import { useEffect, useState } from "react";
import { usersService } from "../services/usersService";

export const useUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const respon = await usersService.getAll();
            setData(respon);
        } catch (err) {
            setError(err.message || "Failed to load branch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        data,
        loading,
        error,
        refetch: fetchUsers,
    };
};
