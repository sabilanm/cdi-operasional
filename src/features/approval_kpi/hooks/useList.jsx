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
                const respon = await approvalAdminService.getAll();
                // const respon = [
                //     {
                //         id: 1,
                //         branch: "Cab Jakarta",
                //         user: "BOH Jakarta",
                //         jobdesc: "Admin Barang",
                //         status: "Waiting",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 2,
                //         branch: "Cab Jakarta",
                //         user: "BOH Jakarta",
                //         jobdesc: "Admin Piutang",
                //         status: "Approve",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 3,
                //         branch: "Cab Yogyakarta",
                //         user: "BOH Jogja",
                //         jobdesc: "Admin Barang",
                //         status: "Approve",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 4,
                //         branch: "Cab Yogyakarta",
                //         user: "BOH Jogja",
                //         jobdesc: "Cashier",
                //         status: "Waiting",
                //         periode: "Desember 2025",
                //     },
                // ];
                setData(respon.data);
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
