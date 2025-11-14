import { useEffect, useState } from "react";
import { direksiAreaService } from "../services/direksiAreaService";
import { Link, useNavigate } from "react-router-dom";

export const useDireksiArea = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    const fetchBranchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await direksiAreaService.getAll();
            setData(data);
        } catch (err) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranchArea();
    }, []);
    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleEditClick = (id, e) => {
        e.stopPropagation();
        navigate(`/direksi-area/${id}/edit`);
    };
    return {
        data,
        loading,
        error,
        expandedItems,
        toggleExpand,
        handleEditClick,
        refetch: fetchBranchArea,
    };
};