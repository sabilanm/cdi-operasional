import { useEffect, useState } from "react";
import {
    menusDropdown,
    permissionDropdown,
    userDropdown,
} from "../services/roleService";
import { roleService } from "../services/roleService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditRole = (id) => {
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
    const fetchRoles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await roleService.getById(id);
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
        fetchRoles();
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
            const respon = await roleService.create(postData);
            ToastNotification.success("Login successful");
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
