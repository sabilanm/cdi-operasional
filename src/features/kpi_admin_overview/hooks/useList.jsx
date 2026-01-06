import { useEffect, useState } from "react";
import { overviewService } from "../services/overviewServices";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await overviewService.getAll();
                // const respon = [
                //     {
                //         id: 1,
                //         branch: "Cab Jakarta",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 2,
                //         branch: "Cab Surakarta",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 3,
                //         branch: "Cab Yogyakarta",
                //         periode: "Desember 2025",
                //     },
                //     {
                //         id: 4,
                //         branch: "Cab Surabaya",
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
