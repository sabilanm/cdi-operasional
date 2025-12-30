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
                    { id: 1, indikator: "Update kartu stock" },
                    { id: 2, indikator: "Random harian" },
                    {
                        id: 3,
                        indikator:
                            "Pengembalian barang peminjaman (untuk sales canvas, customer, dan event)",
                    },
                    {
                        id: 4,
                        indikator:
                            "Membuat FPB berdasarkan data forecast dan melakukan input penerimaan barang dari gudang atau cabang",
                    },
                    {
                        id: 5,
                        indikator:
                            "Melakukan filling dan update NIE sesuai dengan data yang telah dikirimkan oleh tim",
                    },
                    {
                        id: 6,
                        indikator:
                            "Menempelkan stiker kemenkes yang telah dikirim dari tim legal",
                    },
                    { id: 7, indikator: "Pelaporan E-Report" },
                    {
                        id: 8,
                        indikator:
                            "Melakukan stock opname, rekap barang ED & near ED dan pengajuan diskon near ED ke Brand Manager (BM)",
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
