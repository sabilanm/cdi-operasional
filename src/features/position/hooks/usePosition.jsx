import { useEffect, useState } from "react";
import { positionService } from "../services/positionService";

export const usePosition = () => {
    const [position, setPosition] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosition = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await positionService.getAll();
            setPosition(data);
        } catch (err) {
            setError(err.message || "Failed to load permissions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosition();
    }, []);

    return {
        position,
        loading,
        error,
        refetch: fetchPosition,
    };
};
