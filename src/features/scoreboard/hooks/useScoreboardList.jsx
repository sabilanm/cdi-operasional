// src/featuers/scoreboard/hooks/useScoreboardList.jsx
import { useState, useEffect } from "react";
import { scoreboardService } from "../services/scoreboardService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useScoreboardList = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [page, setPage] = useState(0);
	const [length, setLength] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);
	const [additionals, setAdditionals] = useState({ generate: false });
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

	// filters digunakan untuk fetch API
	const [filters, setFilters] = useState({
		start_date: "",
		end_date: "",
		branch: "",
        month: currentMonth,
        year: currentYear,
	});

	// tempFilters digunakan untuk input user sebelum submit
	const [tempFilters, setTempFilters] = useState({
		start_date: "",
		end_date: "",
		branch: "",
        month: currentMonth,
        year: currentYear,
	});

	const rowsPerPageOptions = [10, 20, 30, 40, 50];

	// ===== FETCH DATA =====
	const fetchData = async (pageParam = page, lengthParam = length) => {
		setLoading(true);
		setData([]);
		try {
			const res = await scoreboardService.getAll(
				filters.start_date,
				filters.end_date,
				lengthParam,
				pageParam,
				"b.id",
				"asc",
                filters.month,
                filters.year
			);
			setData(res.data || []);
			setTotalRecords(res.recordsFiltered || 0);
			setAdditionals(res.additionals || { generate: false });
		} catch (err) {
			setError(err);
			ToastNotification.error(err.message || "Failed to load data");
		} finally {
			setLoading(false);
		}
	};

	// ===== EFFECT: REFETCH KETIKA filters, page, atau length berubah =====
	useEffect(() => {
		fetchData();
	}, [filters, page, length]);

	// ===== HANDLER =====
	const handleRowsPerPageChange = (e) => {
		setLength(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handleNextPage = () => setPage((prev) => prev + 1);
	const handlePreviousPage = () => setPage((prev) => (prev > 0 ? prev - 1 : 0));

	// update tempFilters saat input berubah
	const handleTempFilterChange = (e) => {
		const { name, value } = e.target;
		setTempFilters((prev) => ({ ...prev, [name]: value }));
	};

	// ketika klik tombol "Cari", baru update filters → trigger fetch
	const handleFilterSubmit = () => {
		setFilters({ ...tempFilters });
		setPage(0); // reset ke halaman pertama
	};

	return {
		data,
		loading,
		error,
		page,
		length,
		totalRecords,
		additionals,
		rowsPerPageOptions,
		filters: tempFilters,
		fetchData,
		handleRowsPerPageChange,
		handleNextPage,
		handlePreviousPage,
		handleTempFilterChange,
		handleFilterSubmit,
	};
};
