import { useEffect, useState } from "react";
import { scoringService } from "../services/scoringServices";

export const useInput = (id, admin_kpi_id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                const respon = await scoringService.getById(id, admin_kpi_id);
                // const respon = [
                //     {
                //         id: 1,
                //         indikator: "Update kartu stock",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         penilaian: [
                //             { poin: 0, label: "Kartu stock tidak terupdate" },
                //             { poin: 1, label: "Kartu stock terupdate Gudang" },
                //             {
                //                 poin: 2,
                //                 label: "Kartu stock Toko dan Gudang terupdate",
                //             },
                //         ],
                //     },
                //     {
                //         id: 2,
                //         indikator: "Random harian",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         penilaian: [
                //             { poin: 0, label: "Tidak kirim Random Harian" },
                //             { poin: 1, label: "Kirim Random harian > H+1" },
                //             { poin: 2, label: "Kirim Random Harian" },
                //         ],
                //     },
                //     {
                //         id: 3,
                //         indikator:
                //             "Pengembalian barang peminjaman (untuk sales canvas, customer, dan event)",
                //         poin: 1,
                //         bobot: 15,
                //         target: 30,
                //         penilaian: [
                //             {
                //                 poin: 0,
                //                 label: "Tidak input pengembalian barang",
                //             },
                //             {
                //                 poin: 1,
                //                 label: "Input penerimaan barang > H+1 (dalam kota) dan > H+3 (luar kota)",
                //             },
                //             { poin: 2, label: "Input pengembalian barang" },
                //         ],
                //     },
                //     {
                //         id: 4,
                //         indikator:
                //             "Membuat FPB berdasarkan data forecast dan melakukan input penerimaan barang dari gudang atau cabang",
                //         poin: 2,
                //         bobot: 15,
                //         target: 30,
                //         penilaian: [
                //             {
                //                 poin: 0,
                //                 label: "Tidak membuat FPB forecast dan atau tidak input penerimaan barang",
                //             },
                //             {
                //                 poin: 1,
                //                 label: "Membuat FPB forecast dan input penerimaan barang > H+1",
                //             },
                //             {
                //                 poin: 2,
                //                 label: "Membuat FPB forecast dan input penerimaan barang H+1",
                //             },
                //         ],
                //     },
                //     {
                //         id: 5,
                //         indikator:
                //             "Melakukan filling dan update NIE sesuai dengan data yang telah dikirimkan oleh tim",
                //         poin: 1,
                //         bobot: 10,
                //         target: 20,
                //         penilaian: [
                //             {
                //                 poin: 0,
                //                 label: "Tidak melakukan filling dan tidak update",
                //             },
                //             {
                //                 poin: 1,
                //                 label: "Melakukan filling, tetapi tidak update",
                //             },
                //             { poin: 2, label: "Melakukan filling dan update" },
                //         ],
                //     },
                //     {
                //         id: 6,
                //         indikator:
                //             "Menempelkan stiker kemenkes yang telah dikirim dari tim legal",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         penilaian: [
                //             {
                //                 poin: 0,
                //                 label: "Stiker kemenkes tidak ditempel",
                //             },
                //             {
                //                 poin: 1,
                //                 label: "Stiker kemenkes ditempel dengan benar, terdapat barang yang terlewat",
                //             },
                //             {
                //                 poin: 2,
                //                 label: "Stiker kemenkes ditempel dengan benar, tidak ada barang yang terlewat",
                //             },
                //         ],
                //     },
                //     {
                //         id: 7,
                //         indikator: "Pelaporan E-Report",
                //         poin: 2,
                //         bobot: 10,
                //         target: 20,
                //         penilaian: [
                //             { poin: 0, label: "Tidak mengirim E-Report" },
                //             { poin: 1, label: "Terlambat mengirim E-Report" },
                //             { poin: 2, label: "Mengirim E-Report" },
                //         ],
                //     },
                //     {
                //         id: 8,
                //         indikator:
                //             "Melakukan stock opname, rekap barang ED & near ED dan pengajuan diskon near ED ke Brand Manager (BM)",
                //         poin: 2,
                //         bobot: 20,
                //         target: 40,
                //         penilaian: [
                //             {
                //                 poin: 0,
                //                 label: "Tidak melakukan laporan BA SO dan atau tidak kirim rekap barang ED & near ED ke BM",
                //             },
                //             {
                //                 poin: 1,
                //                 label: "Kirim laporan BA SO (max H+7 hari), kirim rekap barang ED & near ED, tidak mengajukan diskon barang near ED ke BM",
                //             },
                //             {
                //                 poin: 2,
                //                 label: "Kirim laporan BA SO (max H+7 hari), kirim rekap barang ED & near ED dan ajukan diskon barang near ED ke BM",
                //             },
                //         ],
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
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData((prevState) => ({ ...prevState, [name]: value }));
    // };
    const handleChange = (id, field, value) => {
        // console.log("id", id, "field", field, "value", value);
        setData((prev) => {
            const newData = [...prev];
            newData[id][field] = value;
            return newData;
        });
    };
    console.log(data);

    return {
        data,
        loading,
        error,
        handleChange,
    };
};
