import { useEffect, useState } from "react";
import { branchAreaService } from "../services/branchAreaService";
import { Link, useNavigate } from "react-router-dom";

export const useBranchArea = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});
    const [totalRecords, setTotalRecords] = useState(0);

    const fetchBranchArea = async () => {
        setTotalRecords(data.recordsFiltered);
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
    const handleEditClick = (id, e) => {
        e.stopPropagation();
        navigate(`/branch-areas/${id}/edit`);
    };
    return {
        data,
        loading,
        error,
        expandedItems,
        totalRecords,
        toggleExpand,
        handleEditClick,
        refetch: fetchBranchArea,
    };
};
