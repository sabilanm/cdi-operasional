import { useEffect, useState } from "react";
import { branchesService } from "../services/branchesService";
import { useNavigate, useParams } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useCreateBranch = () => {
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
        console.log(data);

        const postData = {
            name: data.name,
            status: data.status,
            code: data.code,
            zone: data.zone,
            address: data.alamat,
            address_details: data.alamatDetail,
            postal_code: data.kodePos,
            phone: data.hp,
            fax: data.fax,
            npwp: data.npwp,
        };

        try {
            const respon = await branchesService.create(postData);
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
