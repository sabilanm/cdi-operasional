import { useEffect, useState } from "react";
import {
    menusDropdown,
    permissionDropdown,
    userDropdown,
} from "../../dropdown/listDropdown";
import { roleService } from "../services/roleService";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditRole = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [menu, setMenu] = useState([]);
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
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);
    const createLoadOptions = (fetchFn, label) => {
        return async (search, loadedOptions, { page }) => {
            try {
                const res = await fetchFn(search, loadedOptions, { page });
                const items = res.items || [];

                return {
                    options: items.map((item) => ({
                        value: item.id,
                        label: item.name,
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

    const loadMenusOptions = createLoadOptions(menusDropdown.getAll, "menu");
    const loadPermissionsOptions = createLoadOptions(
        permissionDropdown.getAll,
        "permission"
    );
    const loadUsersOptions = createLoadOptions(userDropdown.getAll, "user");
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
            const respon = await roleService.update(id, postData);
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
        loadMenusOptions,
        loadPermissionsOptions,
        loadUsersOptions,
        handleChange,
        handleMenuChange,
        handleUserChange,
        handlePermissionChange,
        handleSubmit,
    };
};
