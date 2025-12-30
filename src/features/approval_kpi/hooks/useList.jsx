import { useEffect, useState } from "react";
import { approvalAdminService } from "../services/approvalAdminServices";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                // const respon = await approvalAdminService.getAll();
                const respon = [
                    {
                        id: 1,
                        jobdesc: "Admin Barang",
                        periode: "Desember 2025",
                    },
                    {
                        id: 2,
                        jobdesc: "Admin Piutang",
                        periode: "Desember 2025",
                    },
                    {
                        id: 3,
                        jobdesc: "Support Staff",
                        periode: "Desember 2025",
                    },
                    {
                        id: 4,
                        jobdesc: "Cashier",
                        periode: "Desember 2025",
                    },
                ];
                setData(respon);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
