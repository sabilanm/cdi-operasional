import { useEffect, useState } from "react";
import { divisionService } from "../services/divisionService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateDivision = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        name: "",
        status: "active",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
        };

        try {
            const respon = await divisionService.create(postData);
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
        handleChange,
        handleSubmit,
    };
};
