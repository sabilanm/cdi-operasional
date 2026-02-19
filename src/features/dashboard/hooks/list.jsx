import { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboard";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useList = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [resume, setResume] = useState([]);
    const [bestNasional, setBestNasional] = useState([]);
    const [bestRegional, setBestRegional] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [topFive, setTopFive] = useState();
    const [regional, setRegional] = useState();

    useEffect(() => {
        const fetchArea = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await dashboardService.getAll();
                setBestNasional(data.data.best_nasional);
                setBestRegional(data.data.best_region);
                setResume(data.data.resume);
                setFeedback(data.data.feedback);
                const respon = await dashboardService.getTop(month, year);
                setTopFive(respon.data);
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
    const handleEditClick = (id) => {
        navigate(`/c-level/${id}/edit`);
    };
    return {
        resume,
        bestRegional,
        bestNasional,
        feedback,
        loading,
        error,
        month,
        year,
        topFive,
        regional,
        setMonth,
        setYear,
        handleEditClick,
    };
};
