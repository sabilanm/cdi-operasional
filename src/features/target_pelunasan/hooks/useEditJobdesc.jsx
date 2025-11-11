import { useEffect, useState } from "react";
import {
    positionDropdown,
} from "../../dropdown/listDropdown";
import { jobdesService } from "../services/jobdescService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditJobdesc = (id) => {
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

    const fetchPositions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await jobdesService.getById(id);
            setData({
                jobdesc: res.jobdesc,
                description: res.description,
                koefisien: res.koefisien,
                master_methode_id: res.master_methode_id,
                methode: res.methode,
                repetition: res.repetition,
                type: res.type,
            });
            setPosition({ id: res.position_id, name: res.name }); // single position
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    const handlePositionChange = (selectedOption) => {
        if (selectedOption) {
            setPosition({ id: selectedOption.value, name: selectedOption.label });
        } else {
            setPosition(null);
        }
    };

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
                    additional: {
                        page: page + 1,
                    },
                };
            } catch (error) {
                console.error(`Error loading ${label} options:`, error);
                return {
                    options: [],
                    hasMore: false,
                    additional: { page },
                };
            }
        };
    };

    const loadPositionsOptions = createLoadOptions(positionDropdown.getAll, "position");

    useEffect(() => {
        fetchPositions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!position) {
            ToastNotification.error("Position harus dipilih");
            return;
        }

        const postData = {
            description: data.description,
            jobdesc: data.jobdesc,
            koefisien: data.koefisien,
            master_methode_id: data.master_methode_id,
            methode: data.methode,
            repetition: data.repetition,
            type: data.type,
            position_id: position.id,
        };

        try {
            const respon = await jobdesService.update(id, postData);
            ToastNotification.success(respon.message || "Jobdesc berhasil diubah.");
            setTimeout(() => navigate("/master-kpi/jobdescs"), 1000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((msg) => {
                        ToastNotification.error(`${msg}`);
                    });
                });
            } else if (err.response?.data?.message) {
                ToastNotification.error(err.response.data.message);
            } else {
                ToastNotification.error(err.message || "Gagal submit data");
            }
        }
    };

    return {
        data,
        position,
        handleChange,
        handleSubmit,
        loadPositionsOptions,
        handlePositionChange
    };
};
