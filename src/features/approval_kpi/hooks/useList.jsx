import { useEffect, useState } from "react";
import { approvalAdminService } from "../services/approvalAdminServices";

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
                setTotalRecords(respon.recordsFiltered);
            } catch (err) {
                setError(err.message || "Failed to load divisions");
            } finally {
                setLoading(false);
            }
        };
        fetchDivisions();
    }, []);
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
        loading,
        error,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
    };
};
