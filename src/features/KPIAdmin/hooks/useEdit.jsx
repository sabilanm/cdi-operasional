import { useEffect, useState } from "react";
import { KPIAdminService } from "../services/KPIAdminServices";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { positionDropdown } from "../../dropdown/listDropdown";

export const useEdit = (id) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        indicator: "",
        position_id: "",
        bobot: "",
        target: "",
        detail: [{ score: "", penilaian: "" }],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await KPIAdminService.getById(id);
                setData(res);
                const dropdownRes = await positionDropdown.getAll("", [], {
                    page: 1,
                });

                const found = dropdownRes.items.find(
                    (item) => item.id === res.position_id
                );

                if (found) {
                    setPosition({
                        id: found.id,
                        name: found.name,
                    });
                }
            } catch (err) {
                setError(err.message || "Failed to load roles");
            } finally {
                setLoading(false);
            }
        };
        fetchPermissions();
    }, [id]);
    const loadPositionOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await positionDropdown.getAll(search, loadedOptions, {
                page,
            });
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
            console.error("Error loading position options:", error);
            return {
                options: [],
                hasMore: false,
                additional: { page },
            };
        }
    };

    const handlePositionChange = (selectedOptions) => {
        const single = selectedOptions;
        setPosition({
            id: single.value,
            name: single.label,
        });
        setData((prev) => ({
            ...prev,
            position_id: single.value,
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleDetailChange = (index, field, value) => {
        setData((prev) => ({
            ...prev,
            detail: prev.detail.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };
    const addDetail = () => {
        setData((prev) => ({
            ...prev,
            detail: [...prev.detail, { score: "", penilaian: "" }],
        }));
    };

    const removeDetail = (index) => {
        if (data.detail.length === 1) return;

        setData((prev) => ({
            ...prev,
            detail: prev.detail.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            indicator: data.indicator,
            position_id: data.position_id,
            bobot: data.bobot,
            target: data.target,
            data: data.detail,
        };

        try {
            setLoading(true);
            const respon = await KPIAdminService.update(id, postData);
            ToastNotification.success(
                respon.message || "Master berhasil dibuat"
            );
            setTimeout(() => navigate("/KPIAdmin"), 1000);
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
        loading,
        error,
        position,
        loadPositionOptions,
        handlePositionChange,
        handleChange,
        handleDetailChange,
        addDetail,
        removeDetail,
        handleSubmit,
    };
};
