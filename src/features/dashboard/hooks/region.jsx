import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useRegion = (month, year) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [regional, setRegional] = useState();

    useEffect(() => {
        const fetchArea = async () => {
            setLoading(true);
            setError(null);
            try {
                const val = await dashboardService.getRegional(month, year);
                setRegional(val.data);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, [month, year]);
    return {
        loading,
        error,
        regional,
    };
};
