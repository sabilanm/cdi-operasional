import { useEffect, useState } from "react";
import { cLevelService } from "../services/cLevelService";
import { userCLevelDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditCLevel = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        name: "",
        status: "active"
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [originalUserId, setOriginalUserId] = useState(null);
    const loadUsersOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await userCLevelDropdown.getAll();
            const items = Array.isArray(res) ? res : (res.data || res.items || []);
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: false,
                additional: { page: page + 1 },
            };
        } catch (error) {
            console.error("Error loading C-Level Users options:", error);
            return { options: [], hasMore: false, additional: { page } };
        }
    };

    const fetchCLevelData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await cLevelService.getById(id);
            const cLevelData = response.data || response;
            if (!cLevelData) {
                throw new Error("No data received from API");
            }
            setData({
                name: cLevelData.c_level || cLevelData.name || "",
                status: cLevelData.status || "active",
            });
            let initUserId = null;
            if (cLevelData.user_id != null) {
                initUserId = Number(cLevelData.user_id);
            } else if (cLevelData.user?.id != null) {
                initUserId = Number(cLevelData.user.id);
            }
            setOriginalUserId(initUserId || null);
            if (initUserId) {
                setSelectedUser({
                    value: initUserId,
                    label: cLevelData.user?.name || cLevelData.pic || String(initUserId),
                });
            } else if (cLevelData.pic) {
                setSelectedUser({
                    value: null,
                    label: cLevelData.pic,
                });
            } else {
                setSelectedUser(null);
            }
        } catch (err) {
            console.error("Error fetching C Level data:", err);
            setError(err.message || "Failed to load C Level data");
            ToastNotification.error("Failed to load C Level data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchCLevelData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userIdToSend = selectedUser?.value ?? originalUserId;

        if (userIdToSend == null && selectedUser?.label) {
            try {
                const users = await userCLevelDropdown.getAll();
                const list = Array.isArray(users) ? users : users?.data || [];
                const matched = list.find((u) => u.name === selectedUser.label);
                if (matched) {
                    userIdToSend = Number(matched.id);
                }
            } catch (lookupErr) {
                console.warn("Failed to resolve user id by label:", lookupErr);
            }
        }

        if (userIdToSend == null) {
            ToastNotification.error("Please select a user");
            return;
        }

        const postData = {
            name: data.name,
            user_id: Number(userIdToSend),
            status: data.status,
        };

        try {
            setLoading(true);
            const response = await cLevelService.update(id, postData);
            ToastNotification.success(response.message || "C Level berhasil diupdate.");
            setTimeout(() => navigate("/c-level"), 1000);
        } catch (err) {
            console.error("Error updating C Level:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to update C Level";
            if (err.response?.data?.data) {
                const validationErrors = err.response.data.data;
                Object.values(validationErrors).forEach((errorArray) => {
                    errorArray.forEach((error) => ToastNotification.error(error));
                });
            } else {
                ToastNotification.error(errorMessage);
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        selectedUser,
        loading,
        error,
        handleChange,
        handleUserChange,
        handleSubmit,
        loadUsersOptions,
    };
}