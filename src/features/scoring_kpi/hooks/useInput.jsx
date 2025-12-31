import { useEffect, useState } from "react";
import { scoringService } from "../services/scoringServices";

export const useInput = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                // const respon = await scoringService.getAll();
                const respon = [
                    {
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
                        indikator:
                            "Pengembalian barang peminjaman (untuk sales canvas, customer, dan event)",
                        poin_max: 2,
                        bobot: 15,
                        target: 30,
                        penilaian: {
                            0: "Tidak input pengembalian barang",
                            1: "Input penerimaan barang > H+1 (dalam kota) dan > H+3 (luar kota)",
                            2: "Input pengembalian barang",
                        },
                    },
                    {
                        indikator:
                            "Membuat FPB berdasarkan data forecast dan melakukan input penerimaan barang dari gudang atau cabang",
                        poin_max: 2,
                        bobot: 15,
                        target: 30,
                        penilaian: {
                            0: "Tidak membuat FPB forecast dan atau tidak input penerimaan barang",
                            1: "Membuat FPB forecast dan input penerimaan barang > H+1",
                            2: "Membuat FPB forecast dan input penerimaan barang H+1",
                        },
                    },
                    {
                        indikator:
                            "Melakukan filling dan update NIE sesuai dengan data yang telah dikirimkan oleh tim",
                        poin_max: 2,
                        bobot: 10,
                        target: 20,
                        penilaian: {
                            0: "Tidak melakukan filling dan tidak update",
                            1: "Melakukan filling, tetapi tidak update",
                            2: "Melakukan filling dan update",
                        },
                    },
                    {
                        indikator:
                            "Menempelkan stiker kemenkes yang telah dikirim dari tim legal",
                        poin_max: 2,
                        bobot: 10,
                        target: 20,
                        penilaian: {
                            0: "Stiker kemenkes tidak ditempel",
                            1: "Stiker kemenkes ditempel dengan benar, terdapat barang yang terlewat",
                            2: "Stiker kemenkes ditempel dengan benar, tidak ada barang yang terlewat",
                        },
                    },
                    {
                        indikator: "Pelaporan E-Report",
                        poin_max: 2,
                        bobot: 10,
                        target: 20,
                        penilaian: {
                            0: "Tidak mengirim E-Report",
                            1: "Terlambat mengirim E-Report",
                            2: "Mengirim E-Report",
                        },
                    },
                    {
                        indikator:
                            "Melakukan stock opname, rekap barang ED & near ED dan pengajuan diskon near ED ke Brand Manager (BM)",
                        poin_max: 2,
                        bobot: 20,
                        target: 40,
                        penilaian: {
                            0: "Tidak melakukan laporan BA SO dan atau tidak kirim rekap barang ED & near ED ke BM",
                            1: "Kirim laporan BA SO (max H+7 hari), kirim rekap barang ED & near ED, tidak mengajukan diskon barang near ED ke BM",
                            2: "Kirim laporan BA SO (max H+7 hari), kirim rekap barang ED & near ED dan ajukan diskon barang near ED ke BM",
                        },
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    console.log(data);

    return {
        data,
        loading,
        error,
        handleChange,
    };
};
