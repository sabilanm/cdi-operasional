import { useEffect, useState } from "react";
import { scoringService } from "../services/scoringServices";

export const useInput = (id, admin_kpi_id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKPI = async () => {
            setLoading(true);
            setError(null);

            try {
                const respon = await scoringService.getById(id);
                setData(respon);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchKPI();
    }, []);

    const handleChange = (id, field, value) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return {
        data,
        loading,
        error,
        handleChange,
    };
};
