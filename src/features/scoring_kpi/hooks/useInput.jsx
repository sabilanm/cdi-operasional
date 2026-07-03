import { useEffect, useState } from "react";
import { scoringService } from "../services/scoringServices";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useInput = (id, userId) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKPI = async () => {
            setLoading(true);
            setError(null);

            try {
                const respon = await scoringService.getById(id);
                // console.log(respon);
                const dataTerfilter = respon.filter(
                    (item) => item.user_id === userId,
                );

                // console.log(dataTerfilter);
                setData(dataTerfilter);
            } catch (err) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchKPI();
    }, []);
    const handleChange = (rowId, field, value) => {
        const parsed = JSON.parse(value);

        setData((prev) =>
            prev.map((item) =>
                item.id === rowId
                    ? {
                          ...item,
                          point: value, // ⬅ SIMPAN STRING JSON
                          score_id: parsed.id,
                          score: parsed.score,
                      }
                    : item,
            ),
        );
    };

    const handleFileChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevState) =>
                prevState.map((item) =>
                    item.id === id ? { ...item, file: file } : item,
                ),
            );
        }
    };
    const handleNoteChange = (id, e) => {
        const value = e.target.value;

        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, note: value } : item,
            ),
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        data.forEach((item, index) => {
            formData.append(`data[${index}][periode]`, item.periode);
            formData.append(`data[${index}][note]`, item.note ?? "");
            formData.append(`data[${index}][admin_kpi_id]`, item.admin_kpi_id);
            formData.append(`data[${index}][score_id]`, item.score_id);
            formData.append(`data[${index}][score]`, item.score);
            if (item.file instanceof File) {
                formData.append(`data[${index}][file]`, item.file);
            }
        });
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        try {
            const respon = await scoringService.post(userId, formData);
            ToastNotification.success(
                respon.message || "Jawaban berhasil diunggah",
            );
            setTimeout(() => navigate("/KPIScoring"), 1000);
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        handleChange,
        handleFileChange,
        handleNoteChange,
        handleSubmit,
    };
};
