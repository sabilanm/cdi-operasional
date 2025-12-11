import { useEffect, useState } from "react";
import { pelunasanService } from "../services/TargetPelunasanService";

export const useList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [delayedQuery, setDelayedQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    const fetchDivisions = async (
        length,
        page,
        searchQuery,
        sortField,
        sortDirection
    ) => {
        setLoading(true);
        setError(null);
        try {
            const data = {
                success: true,
                message: "Data retrieved.",
                data: [
                    {
                        no: 1,
                        kode: "C001",
                        cabang: "Yogyakarta",
                        periode: "Juni 2025",
                        target_gov: 124940450,
                        target_reguler: 1314759215,
                        target_omset: 575826621,
                        total_target: 2015526286,
                        realisasi: 1573825343,
                        persentase: "78%",
                        nilai: 90,
                        kurang: 441700943,
                    },
                    {
                        no: 2,
                        kode: "C007",
                        cabang: "Surabaya",
                        periode: "Juni 2025",
                        target_gov: 121812666,
                        target_reguler: 2144933490,
                        target_omset: 753720423,
                        total_target: 3020466579,
                        realisasi: 2192452605,
                        persentase: "73%",
                        nilai: 90,
                        kurang: 828013974,
                    },
                    {
                        no: 3,
                        kode: "C008",
                        cabang: "Unair",
                        periode: "Juni 2025",
                        target_gov: 18908317,
                        target_reguler: 48527974,
                        target_omset: 47735756,
                        total_target: 115172047,
                        realisasi: 188445629,
                        persentase: "164%",
                        nilai: 100,
                        kurang: -73273582,
                    },
                    {
                        no: 4,
                        kode: "C012",
                        cabang: "Jember",
                        periode: "Juni 2025",
                        target_gov: 114996710,
                        target_reguler: 105627906,
                        target_omset: 95383720,
                        total_target: 2090844292,
                        realisasi: 488752612,
                        persentase: "155%",
                        nilai: 100,
                        kurang: -172744726,
                    },
                    {
                        no: 5,
                        kode: "C015",
                        cabang: "Denpasar",
                        periode: "Juni 2025",
                        target_gov: 462456777,
                        target_reguler: 1252641390,
                        target_omset: 375746125,
                        total_target: 2397010199,
                        realisasi: 1208234695,
                        persentase: "58%",
                        nilai: 0,
                        kurang: 882609597,
                    },
                    {
                        no: 6,
                        kode: "C016",
                        cabang: "Makassar",
                        periode: "Juni 2025",
                        target_gov: 1408863929,
                        target_reguler: 6480000000,
                        target_omset: 192933125,
                        total_target: 1335147388,
                        realisasi: 2884325485,
                        persentase: "120%",
                        nilai: 100,
                        kurang: -487315286,
                    },
                    {
                        no: 7,
                        kode: "C019",
                        cabang: "Semarang",
                        periode: "Juni 2025",
                        target_gov: 54958203,
                        target_reguler: 795213145,
                        target_omset: 264997160,
                        total_target: 831323177,
                        realisasi: 951157030,
                        persentase: "71%",
                        nilai: 90,
                        kurang: -109174443,
                    },
                ],

                draw: 0,
                recordsFiltered: 4,
                recordsTotal: 4,
            };
            setData(data.data);
            setTotalRecords(data.recordsFiltered);
        } catch (err) {
            setError(err.message || "Failed to load divisions");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDelayedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);
    useEffect(() => {
        fetchDivisions(length, page, delayedQuery, sortField, sortDirection);
    }, [length, page, delayedQuery, sortField, sortDirection]);

    const handleRowsPerPageChange = (e) => {
        setLength(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    const startRecord = page * length + 1;

    return {
        data,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
    };
};
