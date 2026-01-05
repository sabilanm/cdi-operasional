import { useEffect, useState } from "react";
import { scoringService } from "../services/scoringServices";

export const useInput = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKPI = async () => {
            setLoading(true);
            setError(null);

            try {
                const respon = await scoringService.getById(54); // contoh id user

                // transform sesuai kebutuhan UI
                const mapped = respon.map((item) => ({
                    id: item.id,
                    indikator: `KPI #${item.admin_kpi_id}`, // (sesuaikan nanti kalau ada field indikator)
                    poin: item.score ?? null,
                    bobot: null,
                    target: null,
                    penilaian: item.detail.map((d) => ({
                        poin: Number(d.score),
                        label: d.penilaian,
                    })),
                }));

                setData(mapped);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchKPI();
    }, []);

    const handleChange = (id, field, value) => {
        setData(prev =>
            prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    console.log(data);

    return {
        data,
        loading,
        error,
        handleChange,
    };
};
