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
        const postData = {
            user_id: user.id,
            jobdesc_id: task.id,
            problems: data.problem,
            plans: data.plan,
            due_date: data.dueDate,
        };
        try {
            setLoading(true);
            const respon = await PlanService.create(postData);
            ToastNotification.success(
                respon.message || "Action Plan berhasil dibuat"
            );
            // setPopup(false);
            setTimeout(() => navigate("/action-plan"), 1000);
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
