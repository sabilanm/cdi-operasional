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
    const [availableUsers, setAvailableUsers] = useState([]);

    const fetchCLevelData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch C Level data by ID
            const response = await cLevelService.getById(id);
            const cLevelData = response.data || response;
            if (!cLevelData) {
                throw new Error("No data received from API");
            }
            setData({
                name: cLevelData.c_level || cLevelData.name || "",
                status: cLevelData.status || "active"
            });

            // Fetch available users untuk dropdown
            const usersResponse = await userCLevelDropdown.getAll();
            console.log("Users API Response:", usersResponse);
            
            const usersData = usersResponse.data || usersResponse || [];
            
            // Format available users
            const formattedUsers = usersData.map((user) => ({
                value: user.id,
                label: user.name,
            }));
            
            setAvailableUsers(formattedUsers);
            if (cLevelData.user_id || cLevelData.pic) {
                const matchedUser = formattedUsers.find(user => 
                    user.label === cLevelData.user_id || 
                    user.label === cLevelData.pic ||
                    user.value.toString() === cLevelData.user_id
                );
                
                if (matchedUser) {
                    setSelectedUser(matchedUser);
                } else {
                    console.warn("User not found in available users, setting default");
                    setSelectedUser({
                        value: cLevelData.user_id,
                        label: cLevelData.user_id || cLevelData.pic
                    });
                }
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
        if (id) {
            fetchCLevelData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ 
            ...prevState, 
            [name]: value 
        }));
    };

    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validasi required fields
        if (!selectedUser || !data.name) {
            ToastNotification.error("Please fill all required fields");
            return;
        }

        // Pastikan user_id adalah number
        const postData = {
            name: data.name,
            user_id: Number(selectedUser.value),
            status: data.status
        };
        try {
            setLoading(true);
            const response = await cLevelService.update(id, postData);
            
            ToastNotification.success(
                response.message || "C Level berhasil diupdate."
            );
            
            setTimeout(() => navigate("/c-level"), 1000);
        } catch (err) {
            console.error("Error updating C Level:", err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to update C Level";
            if (err.response?.data?.data) {
                const validationErrors = err.response.data.data;
                Object.values(validationErrors).forEach(errorArray => {
                    errorArray.forEach(error => ToastNotification.error(error));
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
        availableUsers,
        loading,
        error,
        handleChange,
        handleUserChange,
        handleSubmit,
    };
};