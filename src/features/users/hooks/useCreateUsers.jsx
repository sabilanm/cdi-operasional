import { useEffect, useState } from "react";
import { usersService } from "../services/usersService";
import { useNavigate, useParams } from "react-router-dom";
import {
    roleDropdown,
    branchDropdown,
    positionDropdown,
    divisionDropdown,
} from "../../dropdown/listDropdown";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateUsers = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [data, setData] = useState();
    const [position, setPosition] = useState();
    const [division, setDivision] = useState();
    const [branch, setBranch] = useState();
    const [role, setRole] = useState();
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

    const loadPositionOptions = createLoadOptions(
        positionDropdown.getAll,
        "position"
    );
    const loadDivisionOptions = createLoadOptions(
        divisionDropdown.getAll,
        "division"
    );
    const loadBranchOptions = createLoadOptions(
        branchDropdown.getAll,
        "branch"
    );
    const loadRoleOptions = createLoadOptions(roleDropdown.getAll, "role");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handlePositionChange = (selectedOptions) => {
        const updatedPosition = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setPosition(updatedPosition);
    };
    const handleDivisionChange = (selectedOptions) => {
        const single = selectedOptions;
        setDivision({
            id: single.value,
            name: single.label,
        });
    };
    const handleBranchChange = (selectedOptions) => {
        const single = selectedOptions;
        setBranch({
            id: single.value,
            name: single.label,
        });
    };
    const handleRoleChange = (selectedOptions) => {
        if (selectedOptions) {
            setRole({
                id: selectedOptions.value,
                name: selectedOptions.label,
            });
        } else {
            setRole({ id: "", name: "" });
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Untuk preview
            setData((prevState) => ({
                ...prevState,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        // username
        formData.append("username", data.username);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("status", data.status);
        position.forEach((pos) => {
            formData.append("positions[]", pos.id);
        });
        formData.append("division_id", division.id);
        formData.append("branch_id", branch.id);
        formData.append("role_id", role.id);
        formData.append("address", data.address);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const respon = await usersService.create(formData);
            ToastNotification.success(
                respon.message || "User berhasil ditambah."
            );
            setTimeout(() => navigate("/users"), 1000);
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        position,
        division,
        branch,
        role,
        loading,
        handlePositionChange,
        handleDivisionChange,
        handleBranchChange,
        handleRoleChange,
        handleChange,
        handleImageChange,
        handleSubmit,
        loadPositionOptions,
        loadDivisionOptions,
        loadBranchOptions,
        loadRoleOptions,
    };
};
