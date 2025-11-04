import { useEffect, useState } from "react";
import { roleDropdown } from "../../dropdown/listDropdown";
import { permissionsService } from "../services/permissionsService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditPermissions = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState([]);
    const [availableRole, setAvailableRole] = useState([]);
    const [data, setData] = useState({});
    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await permissionsService.getById(id);
            setData({
                name: res.name,
                status: res.status,
                uri: res.uri,
            });
            setRole(res.roles);
            // menu
            const responRole = await roleDropdown.getAll();
            setAvailableRole(
                responRole.items.map((val) => ({
                    value: val.id,
                    label: val.name,
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleRoleChange = (selectedOptions) => {
        const updatedRole = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setRole(updatedRole);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
            uri: data.uri,
            role: role.map((val) => val.id),
        };
        try {
            const respon = await permissionsService.update(id, postData);
            ToastNotification.success(
                respon.message || "Permissions berhasil diubah."
            );
            setTimeout(() => navigate("/permissions"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        role,
        availableRole,
        setRole,
        handleChange,
        handleRoleChange,
        handleSubmit,
    };
};
