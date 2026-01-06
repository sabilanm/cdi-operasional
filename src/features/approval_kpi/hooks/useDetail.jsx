import { useEffect, useState } from "react";
import { approvalAdminService } from "../services/approvalAdminServices";
import { useNavigate } from "react-router-dom";
import ToastNotification from "../../../components/common/ToastNotification";

export const useDetail = (id) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await approvalAdminService.getById(id);
                setData(respon);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, []);
    const handlApprove = async (id) => {
        try {
            const respon = await approvalAdminService.approve(id);
            ToastNotification.success(
                respon.message || "Jawaban berhasil diunggah"
            );
            setTimeout(() => navigate("/approvalKPIAdmin"), 1000);
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        handlApprove,
    };
};
