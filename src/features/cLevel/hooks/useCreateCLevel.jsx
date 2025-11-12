import { useEffect, useState } from "react";
import { cLevelService } from "../services/cLevelService";
import { userDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateCLevel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ name: "", status: "active" });
    const [users, setUsers] = useState();
    const [availableUsers, setAvailableUsers] = useState();
    const loadUsersOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await userDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items;
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: res.hasMore,
                additional: { page: page + 1 },
            };
        } catch (error) {
            console.error("Error loading Users options:", error);
            return { options: [], hasMore: false, additional: { page } };
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleUsersChange = (selectedOptions) => {
        const single = selectedOptions;
        setUsers({
            id: single.value,
            name: single.label,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            user_id: users.id,
        };
        try {
            const respon = await cLevelService.create(postData);
            ToastNotification.success(
                respon.message || "Divisi berhasil ditambah."
            );
            setTimeout(() => navigate("/division"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        users,
        availableUsers,
        loadUsersOptions,
        handleChange,
        handleUsersChange,
        handleSubmit,
    };
};
