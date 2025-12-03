//features/scoreboard/hooks/useScoreboardDetailUser.jsx

import { useEffect, useState, useCallback } from "react";
import { scoreboardService } from "../services/scoreboardService";

export const useScoreboardDetailUser = (userId, positionId, branchId) => {
    const [data, setData] = useState([]);
    const [additionals, setAdditionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [zoomClass, setZoomClass] = useState("");

    useEffect(() => {
        const detectZoom = () => {
            const ratio = window.devicePixelRatio;
            const width = window.innerWidth;
            if (ratio < 1) {
                setZoomClass("zoom-out");
            } else if (ratio < 1 && width > 1800) {
                setZoomClass("zoom-out1");
            } else if (ratio < 1 && width > 1900) {
                setZoomClass("zoom-out2");
            } else if (ratio > 1) {
                setZoomClass("zoom-in");
            } else {
                setZoomClass("zoom-normal");
            }
        };

        detectZoom();
        window.addEventListener("resize", detectZoom);
        return () => window.removeEventListener("resize", detectZoom);
    }, []);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await scoreboardService.getDetailUser(
                userId,
                positionId,
                branchId
            );
            setData(res.data ?? []);
            setAdditionals(res.additionals ?? []);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data");
        } finally {
            setLoading(false);
        }
    }, [userId, positionId, branchId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        additionals,
        loading,
        error,
        zoomClass,
        reload: loadData,
    };
};
