import { useEffect, useState } from "react";
import { KPIAdminService } from "../services/KPIAdminServices";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                // const respon = await KPIAdminService.getAll();
                const kpiData = [
                    {
                        jobdesc: "Admin Barang",
                        indikator: "Update kartu stock",
                        poin_max: 2,
                        bobot: 10,
                        target: 20,
                        penilaian: {
                            0: "Kartu stock tidak terupdate",
                            1: "Kartu stock terupdate Gudang",
                            2: "Kartu stock Toko dan Gudang terupdate",
                        },
                    },
                    {
                        jobdesc: "Admin Barang",
                        indikator: "Random harian",
                        poin_max: 2,
                        bobot: 10,
                        target: 20,
                        penilaian: {
                            0: "Tidak kirim Random Harian",
                            1: "Kirim Random harian > H+1",
                            2: "Kirim Random Harian",
                        },
                    },
                    {
                        jobdesc: "Admin Barang",
                        indikator:
                            "Pengembalian barang peminjaman (sales, customer, event)",
                        poin_max: 2,
                        bobot: 15,
                        target: 30,
                        penilaian: {
                            0: "Tidak input pengembalian barang",
                            1: "Input > H+1 (dalam kota) / > H+3 (luar kota)",
                            2: "Input pengembalian barang",
                        },
                    },

                    // ================= ADMIN PIUTANG =================

                    {
                        jobdesc: "Admin Piutang",
                        indikator:
                            "Pengarsipan seluruh nota kredit & validasi nota kredit",
                        poin_max: 3,
                        bobot: 10,
                        target: 30,
                        penilaian: {
                            1: "Tidak ada nota kredit hilang, otorisasi tidak lengkap",
                            2: "Tidak ada nota kredit hilang, otorisasi tidak lengkap",
                            3: "Tidak ada nota kredit hilang, otorisasi lengkap",
                        },
                    },
                    {
                        jobdesc: "Admin Piutang",
                        indikator:
                            "Update & kirim Laporan Piutang Harian maksimal H+1 jam",
                        poin_max: 3,
                        bobot: 5,
                        target: 15,
                        penilaian: {
                            1: "Tidak update & kirim laporan",
                            2: "Update & kirim > H+1 jam",
                            3: "Update & kirim tepat waktu",
                        },
                    },
                    {
                        jobdesc: "Admin Piutang",
                        indikator: "Konfirmasi Piutang Bulanan",
                        poin_max: 3,
                        bobot: 10,
                        target: 30,
                        penilaian: {
                            1: "Tidak dikirim",
                            2: "Terlambat",
                            3: "Dikirim tepat waktu",
                        },
                    },
                ];

                setData(kpiData);
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
