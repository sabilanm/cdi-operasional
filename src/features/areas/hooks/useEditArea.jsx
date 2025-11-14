import { useEffect, useState } from "react";
import { areaService } from "../services/areaService";
import { userAreaDropdown } from "../../dropdown/listDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useEditArea = (id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const fetchArea = async () => {
        setLoading(true);
        setError(null);
        try {
            const responArea = await areaService.getById(id);
            const areaData = responArea[0];
            
            if (areaData) {
                setData({
                    name: areaData.Area,
                    branch_id: areaData.branch_id
                });
                const areaManagers = await userAreaDropdown.getAll();
                const matchedManager = areaManagers.find(manager => manager.name === areaData.PIC);
                
                setUsers({
                    id: matchedManager ? matchedManager.id : null,
                    value: matchedManager ? matchedManager.id : null,
                    label: areaData.PIC,
                });
            }
        } catch (err) {
            setError(err.message || "Failed to load area");
        } finally {
            setLoading(false);
        }
    };
    const loadUsersOptions = async () => {
        try {
            const res = await userAreaDropdown.getAll();
            return {
                options: res.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: false,
                additional: { page: 1 },
            };
        } catch (error) {
            console.error("Error loading Users options:", error);
            return { options: [], hasMore: false, additional: { page: 1 } };
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
            user_id: users.value,
        };
        console.log(postData);

        try {
            const respon = await areaService.update(id, postData);
            ToastNotification.success(
                respon.message || "Area berhasil diperbarui."
            );
            setTimeout(() => navigate("/areas"), 1000);
        } catch (err) {
            ToastNotification.error(
                err.response?.data?.message || "Gagal memperbarui area"
            );
        }
    };
    return {
        data,
        users,
        loadUsersOptions,
        handleChange,
        handleUsersChange,
        handleSubmit,
    };
};
