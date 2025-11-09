import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { userDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            // branch
            const responArea = await areaService.getById(id);
            console.log(responArea);

            setUsers({
                value: responArea.id,
                label: responArea.PIC,
            });
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };
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
    useEffect(() => {
        fetchArea();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleUsersChange = (selectedOptions) => {
        if (selectedOptions) {
            setUsers({
                value: selectedOptions.value,
                label: selectedOptions.label,
            });
        } else {
            setUsers(null);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            user_id: users.id,
        };
        console.log(postData);

        // try {
        //     const respon = await areaService.update(id, postData);
        //     ToastNotification.success(
        //         respon.message || "Divisi berhasil ditambah."
        //     );
        //     setTimeout(() => navigate("/division"), 1000);
        // } catch (err) {
        //     return err;
        // }
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
