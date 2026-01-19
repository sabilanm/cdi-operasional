import { useEffect, useState } from "react";
import { PlanService } from "../services/PlanService";
import { userDropdown, jobdescDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreatePalanAction = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState();
    const [error, setError] = useState(null);
    const [user, setUser] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
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
                        data: item.jobdesc,
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

    const loadUserOptions = createLoadOptions(userDropdown.getAll, "users");
    const loadTaskOptions = createLoadOptions(jobdescDropdown.getAll, "task");
    const handleUserChange = (selectedOptions) => {
        const single = selectedOptions;
        setUser({
            id: single.value,
            name: single.label,
        });
    };
    const handleTaskChange = (selectedOptions) => {
        const single = selectedOptions;
        setTask({
            id: single.value,
            name: single.label,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        // username
        formData.append("start_date", data.startDate);
        formData.append("end_date", data.endDate);
        formData.append("assignment", data.description);
        formData.append("bobot", data.bobot);
        if (data.file) {
            formData.append("file", data.file);
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const respon = await PlanService.create(formData);
            ToastNotification.success(
                respon.message || "Assignment berhasil ditambah."
            );
            setTimeout(() => navigate("/master-kpi/special-assignment"), 1000);
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        task,
        loading,
        user,
        handleChange,
        loadUserOptions,
        loadTaskOptions,
        handleUserChange,
        handleTaskChange,
        handleSubmit,
    };
};
