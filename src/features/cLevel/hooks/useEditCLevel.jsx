import { useEffect, useState } from "react";
import { cLevelService } from "../services/cLevelService";
import { userDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditCLevel = (id) => {
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
            // branch
            const responArea = await cLevelService.getById(id);
            setUsers({
                value: responArea.area_id,
                label: responArea.area,
            });
            // users
            const responUsers = await userDropdown.getAll();
            setAvailableUsers(
                responUsers.map((user) => ({
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
        //     const respon = await cLevelService.update(id, postData);
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
        availableUsers,
        handleChange,
        handleUsersChange,
        handleSubmit,
    };
};
