import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";

export const useBranchArea = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    const fetchBranchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await branchAreaService.getAll();
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
    return {
        data,
        loading,
        error,
        expandedItems,
        toggleExpand,
        refetch: fetchBranchArea,
    };
};
