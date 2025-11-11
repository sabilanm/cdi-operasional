// src/features/jobdesc_admin/hooks/useCreateJobdesc.js
import { useState } from "react";
import { positionDropdown } from "../../dropdown/listDropdown";
import { jobdesService } from "../services/jobdescService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateJobdesc = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);
    const [data, setData] = useState({
        jobdesc: "",
        description: "",
        koefisien: "",
        master_methode_id: "",
        methode: "",
        repetition: "",
        type: "",
    });

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // handle position select change
    const handlePositionChange = (selectedOption) => {
        if (!selectedOption) {
            setPosition(null);
        } else {
            setPosition({ id: selectedOption.value, name: selectedOption.label });
        }
    };

    // async select load options
    const createLoadOptions = (fetchFn, label) => {
        return async (search, loadedOptions, { page }) => {
            try {
                const res = await fetchFn(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
                    })),
                    hasMore: res.hasMore,
                    additional: { page: page + 1 },
                };
            } catch (err) {
                console.error(`Error loading ${label} options:`, err);
                return { options: [], hasMore: false, additional: { page } };
            }
        };
    };

    const loadPositionsOptions = createLoadOptions(positionDropdown.getAll, "position");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!position) {
            ToastNotification.error("Position harus dipilih");
            return;
        }

        const postData = {
            jobdesc: data.jobdesc,
            description: data.description,
            koefisien: data.koefisien,
            master_methode_id: data.master_methode_id,
            methode: data.methode,
            repetition: data.repetition,
            type: data.type,
            position_id: position.id,
        };

        try {
            setLoading(true);
            const respon = await jobdesService.create(postData);
            ToastNotification.success(respon.message || "Jobdesc berhasil dibuat");
            setTimeout(() => navigate("/master-kpi/jobdescs"), 1000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((msg) => ToastNotification.error(msg));
                });
            } else if (err.response?.data?.message) {
                ToastNotification.error(err.response.data.message);
            } else {
                ToastNotification.error(err.message || "Gagal submit data");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        position,
        handleChange,
        handlePositionChange,
        handleSubmit,
        loadPositionsOptions,
        loading,
        error,
    };
};
