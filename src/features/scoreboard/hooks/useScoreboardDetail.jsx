// src/features/scoreboard/hooks/useScoreboardDetail.jsx
import { useState, useEffect } from "react";
import { scoreboardService } from "../services/scoreboardService";
import ToastNotification from "../../../components/common/ToastNotification";

export const useScoreboardDetail = (id) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [page, setPage] = useState(0);
	const [length, setLength] = useState(10);
	const [totalRecords, setTotalRecords] = useState(0);

	// filters untuk API
	const [filters, setFilters] = useState({
		start_date: "",
		end_date: "",
	});

	// tempFilters untuk input sebelum submit
	const [tempFilters, setTempFilters] = useState({
		start_date: "",
		end_date: "",
	});

	const rowsPerPageOptions = [10, 20, 30, 40, 50];

	// ===== FETCH DATA =====
	const fetchData = async (pageParam = page, lengthParam = length) => {
		if (!id) return;
		setLoading(true);
		setData([]);
		try {
			const res = await scoreboardService.getById(
				id,
				filters.start_date,
				filters.end_date,
				lengthParam,
				pageParam,
				"b.id",
				"asc",
			);
			setData(res.data || []);
			setTotalRecords(res.recordsFiltered || 0);
		} catch (err) {
			setError(err);
			ToastNotification.error(err.message || "Failed to load data");
		} finally {
			setLoading(false);
		}
	};

	// ===== EFFECT =====
	useEffect(() => {
		fetchData();
	}, [id, filters, page, length]);

	// ===== HANDLER =====
	const handleRowsPerPageChange = (e) => {
		setLength(parseInt(e.target.value, 10));
		setPage(0);
	};

	const handleNextPage = () => setPage((prev) => prev + 1);
	const handlePreviousPage = () => setPage((prev) => (prev > 0 ? prev - 1 : 0));

	const handleTempFilterChange = (e) => {
		const { name, value } = e.target;
		setTempFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleFilterSubmit = () => {
		setFilters({ ...tempFilters });
		setPage(0);
	};

	return {
		data,
		loading,
		error,
		page,
		length,
		totalRecords,
		rowsPerPageOptions,
		filters: tempFilters,
		handleRowsPerPageChange,
		handleNextPage,
		handlePreviousPage,
		handleTempFilterChange,
		handleFilterSubmit,
	};
};
