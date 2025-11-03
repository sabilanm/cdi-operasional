import { useEffect, useState } from "react";
import { divisionService } from "../services/divisionService";

export const useDivision = () => {
    const [division, setDivision] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDivisions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await divisionService.getAll();
            setDivision(data);
        } catch (err) {
            setError(err.message || "Failed to load divisions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDivisions();
    }, []);

    return {
        division,
        loading,
        error,
        refetch: fetchDivisions,
    };
};
