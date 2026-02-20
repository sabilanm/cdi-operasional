import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useTopList = (month, year) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [topFive, setTopFive] = useState();

    useEffect(() => {
        const fetchArea = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await dashboardService.getTop(month, year);
                setTopFive(respon.data);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, [month, year]);
    const handleEditClick = (id) => {
        navigate(`/c-level/${id}/edit`);
    };
    return {
        loading,
        error,
        topFive,
        handleEditClick,
    };
};
