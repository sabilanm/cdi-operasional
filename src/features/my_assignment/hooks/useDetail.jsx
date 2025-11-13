import { useEffect, useState } from "react";
import { SpecialAssignmentService } from "../services/specialAssignmentService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useDetail = (id) => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchPermissions = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await SpecialAssignmentService.getById(id);
            setData(res);
        } catch (err) {
            setError(err.message || "Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
            code: data.code,
            zone: data.zone,
            address: data.address,
            address_details: data.address_details,
            postal_code: data.postal_code,
            phone: data.phone,
            fax: data.fax,
            npwp: data.npwp,
        };
        console.log(postData);

        // try {
        //     const respon = await usersService.update(id, postData);
        //     ToastNotification.success(
        //         respon.message || "Branches berhasil diubah."
        //     );
        //     setTimeout(() => navigate("/branches"), 1000);
        // } catch (err) {
        //     return err;
        // }
    };

    return {
        data,
        handleChange,
        handleSubmit,
    };
};
