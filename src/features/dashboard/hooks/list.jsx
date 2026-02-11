import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useList = () => {
    const navigate = useNavigate();
    const [resume, setResume] = useState([]);
    const [bestBOH, setBestBOH] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArea = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await dashboardService.getAll();
                setBestBOH(data.data.bestboh);
                setResume(data.data.resume);
                setFeedback(data.data.feedback);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchArea();
    }, []);
    const handleEditClick = (id) => {
        navigate(`/c-level/${id}/edit`);
    };
    return {
        resume,
        bestBOH,
        feedback,
        loading,
        error,
        handleEditClick,
    };
};
