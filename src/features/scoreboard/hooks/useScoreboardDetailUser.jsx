//features/scoreboard/hooks/useScoreboardDetailUser.jsx

import { useEffect, useState, useCallback } from "react";
import { scoreboardService } from "../services/scoreboardService";

export const useScoreboardDetailUser = (
    userId,
    positionId,
    branchId,
    month,
) => {
    const [data, setData] = useState([]);
    const [additionals, setAdditionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [zoomClass, setZoomClass] = useState("");
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [year, setYear] = useState(2026);
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
                branchId,
                month,
            );
            setData(res.data ?? []);
            setAdditionals(res.additionals ?? []);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data");
        } finally {
            setLoading(false);
        }
    }, [userId, positionId, branchId, month]);

    useEffect(() => {
        loadData();
    }, [loadData]);
    const handleExport = async () => {
        setDownloadLoading(true);
        try {
            const response = await scoreboardService.exportDetail(
                userId,
                positionId,
                month,
                year,
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "Scoreboard_Detail.xlsx";
            a.click();
        } catch (e) {
            console.error("Gagal download:", e);
        } finally {
            setDownloadLoading(false);
        }
    };

    return {
        data,
        additionals,
        loading,
        error,
        zoomClass,
        downloadLoading,
        handleExport,
        reload: loadData,
    };
};
