import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateSpecialAssignment = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    console.log(data);

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
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const respon = await SpecialAssignmentService.create(formData);
            ToastNotification.success(
                respon.message || "Branch berhasil diubah."
            );
            setTimeout(() => navigate("/branches"), 1000);
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
