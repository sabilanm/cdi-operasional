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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevState) => ({
                ...prevState,
                file: file,
            }));
        }
    };
    // console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // username
        formData.append("start_date", data.startDate);
        formData.append("end_date", data.endDate);
        formData.append("assignment", data.description);
        formData.append("bobot", data.bobot);
        if (data.file) {
            formData.append("file", data.file);
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        try {
            const respon = await SpecialAssignmentService.create(formData);
            ToastNotification.success(
                respon.message || "Assignment berhasil ditambah."
            );
            setTimeout(() => navigate("/master-kpi/special-assignment"), 1000);
        } catch (err) {
            return err;
        }
    };

    return {
        data,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};
