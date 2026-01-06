import { useEffect, useState } from "react";
import { overviewService } from "../services/overviewServices";

export const useDetail = (id, periode) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await overviewService.getById(id, periode);
                // const respon = [
                //     // =====================
                //     // KPI PJT / Admin Barang
                //     // =====================
                //     {
                //         role: "Admin Barang",
                //         indikator: "Update kartu stock",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         actual_score: 20,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator: "Random harian",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         actual_score: 20,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator:
                //             "Pengembalian barang peminjaman (untuk sales canvas, customer, dan event)",
                //         poin: 2,
                //         bobot: 15,
                //         target: 30,
                //         actual_score: 30,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator:
                //             "Membuat FPB berdasarkan data forecast dan melakukan input penerimaan barang dari gudang atau cabang",
                //         poin: 2,
                //         bobot: 15,
                //         target: 30,
                //         actual_score: 30,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator:
                //             "Melakukan filling dan update NIE sesuai dengan data yang telah dikirimkan oleh tim",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         actual_score: 20,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator:
                //             "Menempelkan stiker kemenkes yang telah dikirim dari tim legal",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         actual_score: 20,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator: "Pelaporan E-Report",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         actual_score: 20,
                //     },
                //     {
                //         role: "Admin Barang",
                //         indikator:
                //             "Melakukan stock opname, rekap barang ED & near ED dan pengajuan diskon near ED ke Brand Manager (BM)",
                //         poin: 2,
                //         bobot: 20,
                //         target: 40,
                //         actual_score: 40,
                //     },

                //     // ============
                //     // KPI Cashier
                //     // ============
                //     {
                //         role: "Cashier",
                //         indikator: "Input Penjualan Tunai, Kredit",
                //         poin: 2,
                //         bobot: 35,
                //         target: 70,
                //         actual_score: 70,
                //     },
                //     {
                //         role: "Cashier",
                //         indikator:
                //             "Melakukan input (Pelunasan Piutang, Servis, Deposit, Ongkos kirim, Peminjaman barang)",
                //         poin: 2,
                //         bobot: 35,
                //         target: 70,
                //         actual_score: 70,
                //     },
                //     {
                //         role: "Cashier",
                //         indikator: "Setoran Omset Kasir",
                //         poin: 2,
                //         bobot: 30,
                //         target: 60,
                //         actual_score: 60,
                //     },
                // ];

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
