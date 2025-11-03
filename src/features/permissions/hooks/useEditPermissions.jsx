import { useEffect, useState } from "react";
import {
    menusDropdown,
    permissionDropdown,
    userDropdown,
} from "../../dropdown/listDropdown";
import { permissionsService } from "../services/permissionsService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditPermissions = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [menu, setMenu] = useState([]);
    const [availableMenu, setAvailableMenus] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [availablePermission, setAvailablePermissions] = useState([]);
    const [data, setData] = useState({
        name: "",
        status: "active",
    });
    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await permissionsService.getById(id);
            setData({
                name: res.name,
                status: res.status,
            });
            setUsers(res.users);
            setPermissions(res.permissions);
            setMenu(res.menus);
            // menu
            const responMenu = await menusDropdown.getAll();
            setAvailableMenus(
                responMenu.items.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            // user
            const responUser = await userDropdown.getAll();
            setAvailableUsers(
                responUser.items.map((val) => ({
                    value: val.id,
                    label: val.name,
                }))
            );
            // permission
            const responPermision = await permissionDropdown.getAll();
            setAvailablePermissions(
                responPermision.items.map((val) => ({
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
    const handleUserChange = (selectedOptions) => {
        const updatedUsers = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setUsers(updatedUsers);
    };
    const handlePermissionChange = (selectedOptions) => {
        const updatedPermission = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setPermissions(updatedPermission);
    };
    const handleMenuChange = (selectedOptions) => {
        const updatedMenu = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setMenu(updatedMenu);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
            users: users.map((user) => user.id),
            permissions: permissions.map((permission) => permission.id),
            menus: menu.map((menu) => menu.id),
        };
        try {
            const respon = await permissionsService.update(id, postData);
            ToastNotification.success(
                respon.message || "Roles berhasil diubah."
            );
            setTimeout(() => navigate("/roles"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        users,
        permissions,
        menu,
        availableMenu,
        availableUsers,
        availablePermission,
        handleChange,
        handleMenuChange,
        handleUserChange,
        handlePermissionChange,
        handleSubmit,
    };
};
