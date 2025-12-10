import { useEffect, useState } from "react";
import { profitLossService } from "../services/TargetPelunasanService";

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
                        id: 1,
                        cabang: "Jakarta",
                        periode: "Oktober 2025",
                        persentase: "80%",
                        lampiran: "Lampiran",
                        pl: "Profit",
                        score: 10,
                        status: "Waiting",
                        action: "Edit",
                    },
                    {
                        id: 2,
                        cabang: "Jakarta",
                        periode: "September 2025",
                        persentase: "-30%",
                        lampiran: "Lampiran",
                        pl: "Loss",
                        score: 0,
                        status: "Approved",
                        action: "View",
                    },
                    {
                        id: 3,
                        cabang: "Jakarta",
                        periode: "Agustus 2025",
                        persentase: "-60%",
                        lampiran: "Lampiran",
                        pl: "Profit",
                        score: 10,
                        status: "Rejected",
                        action: "Edit",
                    },
                    {
                        id: 4,
                        cabang: "Jakarta",
                        periode: "Juli 2025",
                        persentase: "67%",
                        lampiran: "Lampiran",
                        pl: "Profit",
                        score: 10,
                        status: "Approved",
                        action: "View",
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
