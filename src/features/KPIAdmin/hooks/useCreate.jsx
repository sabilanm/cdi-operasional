import { useEffect, useState } from "react";
import { KPIAdminService } from "../services/KPIAdminServices";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { positionDropdown } from "../../dropdown/listDropdown";

export const useCreate = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState();

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await KPIAdminService.getAll();
                setData(respon.data);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, []);
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
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            indicator: data.indikator,
            bobot: data.bobot,
            target: data.target,
            position: position.id,
        };
        console.log(postData);

        // try {
        //     setLoading(true);
        //     const respon = await KPIAdminService.create(postData);
        //     ToastNotification.success(
        //         respon.message || "Master berhasil dibuat"
        //     );
        //     setTimeout(() => navigate("/masterKPI"), 1000);
        // } catch (err) {
        //     if (err.response?.data?.errors) {
        //         const errors = err.response.data.errors;
        //         Object.keys(errors).forEach((key) => {
        //             errors[key].forEach((msg) => ToastNotification.error(msg));
        //         });
        //     } else if (err.response?.data?.message) {
        //         ToastNotification.error(err.response.data.message);
        //     } else {
        //         ToastNotification.error(err.message || "Gagal submit data");
        //     }
        // } finally {
        //     setLoading(false);
        // }
    };
    return {
        data,
        loading,
        error,
        position,
        loadPositionOptions,
        handlePositionChange,
        handleChange,
        handleSubmit,
    };
};
