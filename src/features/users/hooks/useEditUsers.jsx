import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";
import { usersService } from "../services/usersService";
import {
    roleDropdown,
    branchDropdown,
    positionDropdown,
    divisionDropdown,
} from "../../dropdown/listDropdown";

export const useEditUsers = (id) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [position, setPosition] = useState([]); // [{id, name}]
    const [division, setDivision] = useState({ id: "", name: "" });
    const [branch, setBranch] = useState({ id: "", name: "" });
    const [role, setRole] = useState({ id: "", name: "" });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await usersService.getById(id);
                setUser(data);

                const posList = Array.isArray(data.positions)
                    ? data.positions
                    : [];
                if (posList.length > 0) {
                    setPosition(
                        posList.map((p) => ({
                            id: p.position_id ?? p.id,
                            name: p.name ?? p.position_name ?? "",
                        }))
                    );
                } else if (data.position_id) {
                    setPosition([
                        {
                            id: data.position_id,
                            name: data.position_name || "",
                        },
                    ]);
                }

                setDivision({
                    id: data.division_id || "",
                    name: data.division_name || "",
                });
                setBranch({
                    id: data.branch_id || "",
                    name: data.branch_name || "",
                });
                setRole({ id: data.role_id || "", name: data.role_name || "" });
            } catch {
                ToastNotification.error("Gagal memuat data user");
            } finally {
                setLoading(false);
            }
        };
        if (id) load();
    }, [id]);

    const loadPositionOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await positionDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items || [];
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: !!res.hasMore,
                additional: { page: page + 1 },
            };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const loadDivisionOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await divisionDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items || [];
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: !!res.hasMore,
                additional: { page: page + 1 },
            };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const loadBranchOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await branchDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items || [];
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: !!res.hasMore,
                additional: { page: page + 1 },
            };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const loadRoleOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await roleDropdown.getAll(search, loadedOptions, {
                page,
            });
            const items = res.items || [];
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: !!res.hasMore,
                additional: { page: page + 1 },
            };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPasswordChanged(value.trim() !== "");
        setUser((prev) => ({ ...prev, password: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handlePositionChange = (selectedOptions) => {
        const updated = (selectedOptions || []).map((opt) => ({
            id: opt.value,
            name: opt.label,
        }));
        setPosition(updated);
    };
    const handleDivisionChange = (opt) =>
        setDivision(
            opt ? { id: opt.value, name: opt.label } : { id: "", name: "" }
        );
    const handleBranchChange = (opt) =>
        setBranch(
            opt ? { id: opt.value, name: opt.label } : { id: "", name: "" }
        );
    const handleRoleChange = (opt) =>
        setRole(
            opt ? { id: opt.value, name: opt.label } : { id: "", name: "" }
        );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("username", user.username || "");
        formData.append("name", user.name || "");
        formData.append("email", user.email || "");
        if (passwordChanged && user.password) {
            formData.append("password", user.password);
        }
        formData.append("phone", user.phone || "");
        formData.append("status", user.status || "");
        position.forEach((pos) => formData.append("positions[]", pos.id));
        formData.append("division_id", division.id || "");
        formData.append("branch_id", branch.id || "");
        formData.append("role_id", role.id || "");
        formData.append("address", user.address || "");
        formData.append("gender", user.gender || "");
        if (imageFile) formData.append("image", imageFile);

        try {
            await usersService.update(id, formData);
            ToastNotification.success("User berhasil diupdate.");
            setTimeout(() => navigate("/users"), 1000);
        } catch (error) {
            ToastNotification.error(
                "Terjadi kesalahan: " +
                    (error?.response?.data?.message || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        imagePreview,
        position,
        division,
        branch,
        role,
        handleChange,
        handlePasswordChange,
        handleImageChange,
        handlePositionChange,
        handleDivisionChange,
        handleBranchChange,
        handleRoleChange,
        handleSubmit,
        loadPositionOptions,
        loadDivisionOptions,
        loadBranchOptions,
        loadRoleOptions,
    };
};
