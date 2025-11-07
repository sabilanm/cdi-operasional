import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { Link, useNavigate } from "react-router-dom";

export const useArea = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await areaService.getAll();
            setData(data);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArea();
    }, []);
    const handleEditClick = (id) => {
        navigate(`/areas/${id}/edit`);
    };
    return {
        data,
        loading,
        error,
        handleEditClick,
        refetch: fetchArea,
    };
};
