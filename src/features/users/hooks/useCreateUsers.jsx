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
    const [availablePosition, setAvailablePosition] = useState();
    const [availableDivision, setAvailableDivision] = useState();
    const [availableBranch, setAvailableBranch] = useState();
    const [availableRole, setAvailableRole] = useState();
    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            // position
            const responPosition = await positionDropdown.getAll();
            setAvailablePosition(
                responPosition.items.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            // division
            const responDivision = await divisionDropdown.getAll();
            setAvailableDivision(
                responDivision.items.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            // branch
            const responBranch = await branchDropdown.getAll();
            setAvailableBranch(
                responBranch.map((user) => ({
                    value: user.id,
                    label: user.name,
                }))
            );
            // role
            // const responRole = await roleDropdown.getAll();
            // setAvailableRole(
            //     responRole.items.map((user) => ({
            //         value: user.id,
            //         label: user.name,
            //     }))
            // );
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };
    const loadDivisionOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await roleDropdown.getAll(search, loadedOptions, {
                page,
            });

            const items = res.items;
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
            console.error("Error loading role options:", error);
            return {
                options: [],
                hasMore: false,
                additional: {
                    page,
                },
            };
        }
    };

    useEffect(() => {
        fetchArea();
    }, []);
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

        const formData = new FormData();
        // username
        formData.append("username", data.username);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("status", data.status);
        position.forEach((pos) => {
            formData.append("position_id[]", pos.id);
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
                respon.message || "Branch berhasil diubah."
            );
            setTimeout(() => navigate("/users"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        position,
        division,
        branch,
        role,
        availableDivision,
        availablePosition,
        availableBranch,
        availableRole,
        handlePositionChange,
        handleDivisionChange,
        handleBranchChange,
        handleRoleChange,
        handleChange,
        handleImageChange,
        handleSubmit,
        loadDivisionOptions,
    };
};
