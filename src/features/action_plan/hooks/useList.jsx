import { useEffect, useState } from "react";
import { profitLossService } from "../services/P&LService";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plan, setPlan] = useState();

    const fetchDivisions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = {
                success: true,
                message: "Data retrieved.",
                data: [
                    {
                        no: 1,
                        indicator: "P&L Cabang",
                        bobot: "5%",
                        target: 100,
                        actual: 100,
                        kpiScore: "5%",
                    },
                    {
                        no: 2,
                        indicator: "Average Scoreboard Admin",
                        bobot: "40%",
                        target: 100,
                        actual: 100,
                        kpiScore: "40%",
                    },
                    {
                        no: 3,
                        indicator: "Target Pelunasan",
                        bobot: "40%",
                        target: 80,
                        actual: 80,
                        kpiScore: "40%",
                    },
                    {
                        no: 4,
                        indicator: "Nilai Ketepatan Laporan",
                        bobot: "10%",
                        target: 3,
                        actual: 3,
                        kpiScore: "10%",
                    },
                    {
                        no: 5,
                        indicator: "Special Assignment",
                        bobot: "5%",
                        target: 100,
                        actual: 100,
                        kpiScore: "5%",
                    },
                ],
            };
            setData(data.data);
            const plan = {
                success: true,
                message: "Data retrieved.",
                data: [
                    {
                        id: 1,
                        title: "Cash Opname Harian",
                        issue: "Proses cash opname tidak konsisten setiap hari, sering terlambat.",
                        solutions:
                            "Membuat checklist harian di awal shift. Menentukan PIC yang berbeda tiap minggu untuk memastikan rotasi tanggung jawab. Laporan opname difoto & dikirim via grup WA internal.",

                        role: "Admin Barang",
                        roleAvatar: null,
                        dueDate: "31 Oktober 2025",
                    },
                    {
                        id: 2,
                        title: "Pelaporan E-Report",
                        issue: "Laporan sering terlambat/tidak lengkap",
                        solutions:
                            "Menyusun reminder otomatis via email/WhatsApp sehari sebelum deadline. Membuat template standar laporan untuk mengurangi kesalahan input.",
                        role: "Admin Piutang",
                        roleAvatar: null,
                        dueDate: "31 Oktober 2025",
                    },
                ],
            };
            setPlan(plan.data);
        } catch (err) {
            setError(err.message || "Failed to load divisions");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDivisions();
    }, []);

    return {
        data,
        plan,
        loading,
        error,
    };
};
