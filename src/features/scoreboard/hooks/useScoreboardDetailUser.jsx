//features/scoreboard/hooks/useScoreboardDetailUser.jsx

import { useEffect, useState, useCallback } from "react";
import { scoreboardService } from "../services/scoreboardService";

export const useScoreboardDetailUser = (userId, positionId, branchId) => {
    const [data, setData] = useState([]);
    const [additionals, setAdditionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await scoreboardService.getDetailUser(userId, positionId, branchId);
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
        reload: loadData,
    };
};
