import { useEffect, useState } from "react";
import { actionPlanService, KPIService } from "../services/actionPlanService";
import {
    userDropdown,
    branchDropdown,
    jobdescDropdown,
    positionDropdown,
} from "../../dropdown/listDropdown";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plan, setPlan] = useState();
    const [value, setValue] = useState([]);
    const [branch, setBranch] = useState();
    const [task, setTask] = useState();
    const [position, setPosition] = useState();
    const [Popup, setPopup] = useState(false);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respons = await KPIService.getKPI();
                setData(respons.data);
                const respon = await actionPlanService.getAll();
                setPlan(respon.data);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, []);
    const [user, setUser] = useState();
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
    const loadBranchOptions = createLoadOptions(
        branchDropdown.getAll,
        "branch"
    );
    const loadTaskOptions = createLoadOptions(jobdescDropdown.getAll, "task");
    const loadPositionOptions = createLoadOptions(
        positionDropdown.getAll,
        "position"
    );
    const handleUserChange = (selectedOptions) => {
        const single = selectedOptions;
        setUser({
            id: single.value,
            name: single.label,
        });
    };
    const handleBranchChange = (selectedOptions) => {
        const single = selectedOptions;
        setBranch({
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
    const handlePositionChange = (selectedOptions) => {
        const single = selectedOptions;
        setPosition({
            id: single.value,
            name: single.label,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            user_id: user.id,
            jobdesc_id: task.id,
            problems: value.problem,
            plans: value.plan,
            due_date: value.dueDate,
        };
        try {
            setLoading(true);
            const respon = await actionPlanService.create(postData);
            ToastNotification.success(
                respon.message || "Action Plan berhasil dibuat"
            );
            setPopup(false);
            // setTimeout(() => navigate("/pelunasan/submit"), 1000);
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
        value,
        branch,
        task,
        position,
        plan,
        loading,
        error,
        user,
        Popup,
        setPopup,
        loadUserOptions,
        loadBranchOptions,
        loadTaskOptions,
        loadPositionOptions,
        handleUserChange,
        handleBranchChange,
        handleTaskChange,
        handlePositionChange,
        handleChange,
        handleSubmit,
    };
};
