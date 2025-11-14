import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { userAreaDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const loadUsersOptions = async (search, loadedOptions, { page }) => {
        try {
            const items = await userAreaDropdown.getAll(search, loadedOptions, {
                page,
            });
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: false,
                additional: { page: page + 1 },
            };
        } catch (error) {
            console.error("Error loading Area Users options:", error);
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
            const respon = await areaService.create(postData);
            ToastNotification.success(
                respon.message || "Area berhasil ditambah."
            );
            setTimeout(() => navigate("/areas"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        users,
        loadUsersOptions,
        handleChange,
        handleUsersChange,
        handleSubmit,
    };
};
