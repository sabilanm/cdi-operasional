import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { userDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateArea = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const [availableUsers, setAvailableUsers] = useState();
    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            // areas
            const responUsers = await userDropdown.getAll();
            setAvailableUsers(
                responUsers.items.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
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
        handleChange,
        handleUsersChange,
        handleSubmit,
    };
};
