import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Table,
    Progress,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Spinner,
} from "reactstrap";
import Cookies from "js-cookie";
import {
    getDashboardProgress,
    getDashboardList,
    getDashboardDivisionList,
    getDashboardPositionList,
    getDashboardBranchList,
} from "../../utils/api";
import ToastNotification from "../common/ToastNotification";
// import StaffDashboard from "./staffList";
import Pagination from "../common/Pagination";

function Starter() {
    const name = Cookies.get("performa_name");
    const userRole = Cookies.get("performa_role");
    const userId = Cookies.get("performa_user");

    const [isLoading, setIsLoading] = useState(false);
    const [progressData, setProgressData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        cabang: [],
        divisi: [],
        posisi: [],
    });
    const [dropdownOpen, setDropdownOpen] = useState({
        cabang: false,
        divisi: false,
        posisi: false,
    });
    const [filters, setFilters] = useState({
        cabang: [],
        divisi: [],
        tglMulai: "",
        nama: "",
        posisi: [],
        tglSelesai: "",
    });

    // Pagination state
    const [page, setPage] = useState(0);
    const [length, setLength] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const toggle = (dropdown) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

    // Helper to check if any filter is active
    const hasActiveFilter = () => {
        return (
            filters.cabang.length > 0 ||
            filters.divisi.length > 0 ||
            filters.posisi.length > 0 ||
            filters.nama.trim() !== "" ||
            filters.tglMulai !== "" ||
            filters.tglSelesai !== ""
        );
    };

    // Clear all filters and refetch data
    const handleClearFilter = async () => {
        setIsLoading(true);
        setFilters({
            cabang: [],
            divisi: [],
            tglMulai: "",
            nama: "",
            posisi: [],
            tglSelesai: "",
        });
        setPage(0); // Reset to first page when clearing filters
        await fetchDashboardData({}, 0, length);
        setIsLoading(false);
    };

    useEffect(() => {
        if (userRole === "6") return;

        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                // Fetch progress data
                const progressResponse = await getDashboardProgress();
                if (progressResponse.success) {
                    const formattedProgress = progressResponse.data.map(
                        (item) => {
                            let config = {
                                title:
                                    item.status === "not_started"
                                        ? "Todo"
                                        : item.status === "in_progress"
                                        ? "In Progress"
                                        : "Completed",
                                value: item.total,
                                color:
                                    item.status === "not_started"
                                        ? "warning"
                                        : item.status === "in_progress"
                                        ? "info"
                                        : "success",
                                textColor:
                                    item.status === "not_started"
                                        ? "text-warning"
                                        : item.status === "in_progress"
                                        ? "text-info"
                                        : "text-success",
                                icon:
                                    item.status === "not_started"
                                        ? "📝"
                                        : item.status === "in_progress"
                                        ? "⏳"
                                        : "✅",
                            };
                            return config;
                        }
                    );
                    setProgressData(formattedProgress);
                }

                // Fetch filter options
                const [branchResponse, divisionResponse, positionResponse] =
                    await Promise.all([
                        getDashboardBranchList(),
                        getDashboardDivisionList(),
                        getDashboardPositionList(),
                    ]);

                setFilterOptions({
                    cabang: branchResponse.success ? branchResponse.data : [],
                    divisi: divisionResponse.success
                        ? divisionResponse.data
                        : [],
                    posisi: positionResponse.success
                        ? positionResponse.data
                        : [],
                });

                // Fetch dashboard data for non-staff users
                await fetchDashboardData({}, page, length);
            } catch (error) {
                ToastNotification.error(
                    "Gagal memuat data dashboard: " + error.message
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const fetchDashboardData = async (
        filterParams = {},
        currentPage = page,
        pageLength = length
    ) => {
        try {
            // Add pagination parameters to filter params
            const paramsWithPagination = {
                ...filterParams,
                length: pageLength,
                page: currentPage,
            };

            const response = await getDashboardList(paramsWithPagination);
            if (response.success) {
                // Sesuaikan dengan struktur response baru
                const apiData = response.data.data || [];
                const totalRecordsFromApi = response.data.recordsTotal || 0;

                setTableData(Array.isArray(apiData) ? apiData : []);
                setTotalRecords(totalRecordsFromApi);
            } else {
                setTableData([]);
                setTotalRecords(0);
            }
        } catch (error) {
            ToastNotification.error("Gagal memuat data list: " + error.message);
            setTableData([]);
            setTotalRecords(0);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleMultiSelectChange = (type, item) => {
        const itemId = item.id;
        setFilters((prev) => {
            if (prev[type].includes(itemId)) {
                return {
                    ...prev,
                    [type]: prev[type].filter((id) => id !== itemId),
                };
            } else {
                return {
                    ...prev,
                    [type]: [...prev[type], itemId],
                };
            }
        });
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPage(0); // Reset to first page when applying new filters

        const filterParams = {
            branch: filters.cabang,
            division: filters.divisi,
            position: filters.posisi,
            name: filters.nama,
            start_date: filters.tglMulai,
            end_date: filters.tglSelesai,
        };

        await fetchDashboardData(filterParams, 0, length);
        setIsLoading(false);
    };

    // Pagination handlers
    const handleRowsPerPageChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        setLength(newLength);
        setPage(0); // Reset to first page when changing rows per page
        fetchDashboardData(filters, 0, newLength);
    };

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchDashboardData(filters, nextPage, length);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchDashboardData(filters, prevPage, length);
        }
    };

    const handleWhatsAppClick = (name, phone) => {
        const message = `Hallo ${name}

Kami dari Departemen HR PT Cobra Dental Indonesia, mau mengingatkan untuk mengisi Kuisioner Penilaian 360.
Yuk sempatkan sebentar untuk mengisinya, karena hasilnya akan membantu proses evaluasi yang lebih adil dan pengembangan diri bagi kita semua.

Link kuisioner: [isi link di sini]`;

        const text = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${text}`;
        window.open(url, "_blank");
    };

    // Calculate start record number for display
    const startRecord = page * length + 1;

    const renderTableData = () => {
        if (!Array.isArray(tableData) || tableData.length === 0) {
            return (
                <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                        <i className="bi bi-inbox me-2"></i>
                        Tidak ada data yang ditampilkan
                    </td>
                </tr>
            );
        }

        return tableData.map((item, index) => (
            <tr key={item.user_id || index}>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                    {item.user_name || "-"}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                    {item.division_name || "-"}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                    {item.position_name || "-"}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm">
                    {item.branch_name || "-"}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-center text-sm">
                    {item.avg_min_score || "0"}
                </td>
                <td
                    className={`px-2 py-3 whitespace-nowrap text-center fw-bold text-sm ${
                        (parseFloat(item.avg_per_user) || 0) <
                        (parseFloat(item.avg_min_score) || 0)
                            ? "text-danger"
                            : "text-success"
                    }`}
                >
                    {item.avg_per_user || "0"}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                    <div
                        className="position-relative"
                        style={{ minWidth: "120px", maxWidth: "180px" }}
                    >
                        <Progress
                            value={
                                ((parseInt(item.total_done) || 0) /
                                    (parseInt(item.total_task) || 1)) *
                                100
                            }
                            className="w-100 bg-secondary"
                            color={
                                ((parseInt(item.total_done) || 0) /
                                    (parseInt(item.total_task) || 1)) *
                                    100 ===
                                100
                                    ? "success"
                                    : "primary"
                            }
                            style={{ height: "20px" }}
                        />
                        <div className="position-absolute top-50 start-50 translate-middle small fw-semibold text-white text-xs">
                            {item.total_done || 0}/{item.total_task || 0}
                        </div>
                    </div>
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                    <Button
                        color="light"
                        size="sm"
                        className="rounded-circle"
                        onClick={() =>
                            handleWhatsAppClick(
                                item.user_name || "",
                                item.phone || ""
                            )
                        }
                        title="Kirim WhatsApp"
                        disabled={!item.phone}
                    >
                        <i className="bi bi-whatsapp text-success"></i>
                    </Button>
                </td>
            </tr>
        ));
    };

    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    return (
        <div>
            <title>Performa</title>
            <div className="p-2 p-md-3 mt-4 mt-md-5">
                {isLoading && (
                    <div className="text-center my-3">
                        <Spinner color="primary" />
                        <div className="mt-2 text-muted">Memuat data...</div>
                    </div>
                )}

                {/* Grid container dengan breakpoints yang lebih responsif */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-3 mb-3">
                    {/* Today Progress Section - Full width di mobile, 2/6 di desktop */}
                    <div className="lg:col-span-2">
                        <div className="p-3 p-md-4 bg-white rounded-2xl shadow-md h-full flex flex-col">
                            <div className="mb-3 mb-md-4">
                                <h5 className="text-base md:text-lg font-semibold text-gray-900 lg:text-xl">
                                    Today Progress
                                </h5>
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Resume assignment - lihat progres terbaru
                                    kamu
                                </p>
                            </div>

                            {/* Progress cards */}
                            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 flex-grow-1">
                                {progressData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 mb-2 sm:mb-0"
                                    >
                                        <Card
                                            className={`border-0 shadow-sm h-100 rounded-lg w-100 ${
                                                item.title === "Todo"
                                                    ? "bg-orange-50 border-l-4 border-orange-400"
                                                    : item.title ===
                                                      "In Progress"
                                                    ? "bg-blue-50 border-l-4 border-blue-400"
                                                    : "bg-green-50 border-l-4 border-green-400"
                                            }`}
                                        >
                                            <CardBody className="d-flex flex-column justify-content-center align-items-center p-2 p-md-3 h-100">
                                                <div
                                                    className={`text-xl md:text-2xl mb-1 md:mb-2 ${
                                                        item.title === "Todo"
                                                            ? "text-orange-600"
                                                            : item.title ===
                                                              "In Progress"
                                                            ? "text-blue-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div
                                                    className={`fs-4 md:fs-3 fw-bold ${
                                                        item.title === "Todo"
                                                            ? "text-orange-700"
                                                            : item.title ===
                                                              "In Progress"
                                                            ? "text-blue-700"
                                                            : "text-green-700"
                                                    }`}
                                                >
                                                    {item.value}
                                                </div>
                                                <div
                                                    className={`text-xs md:text-sm fw-semibold mt-1 ${
                                                        item.title === "Todo"
                                                            ? "text-orange-600"
                                                            : item.title ===
                                                              "In Progress"
                                                            ? "text-blue-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {item.title}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="lg:col-span-4">
                        <div className="p-3 p-md-4 bg-white rounded-2xl shadow-md h-full flex flex-col">
                            {/* Header dengan layout responsif */}
                            <div className="mb-3 mb-md-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div>
                                    <h5 className="text-base md:text-lg font-semibold text-gray-900 lg:text-xl">
                                        Filter
                                    </h5>
                                    <p className="text-gray-400 text-xs md:text-sm">
                                        Filter data berdasarkan kriteria yang
                                        diinginkan
                                    </p>
                                </div>
                                {hasActiveFilter() && (
                                    <Button
                                        color="link"
                                        size="sm"
                                        onClick={handleClearFilter}
                                        className="text-blue-600 hover:text-blue-800 font-medium p-0 text-sm"
                                    >
                                        <i className="bi bi-x-circle me-1"></i>
                                        Clear Filter
                                    </Button>
                                )}
                            </div>

                            <Form
                                onSubmit={handleFilterSubmit}
                                className="flex-grow"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-2 md:space-y-3">
                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="cabang"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-building me-1 md:me-2"></i>
                                                Cabang
                                            </Label>
                                            <Dropdown
                                                isOpen={dropdownOpen.cabang}
                                                toggle={() => toggle("cabang")}
                                                className="w-100"
                                            >
                                                <DropdownToggle
                                                    caret
                                                    color="light"
                                                    className="w-100 text-start d-flex justify-content-between align-items-center py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-sm"
                                                >
                                                    <span className="text-gray-700 truncate">
                                                        {filters.cabang.length >
                                                        0
                                                            ? `${filters.cabang.length} cabang dipilih`
                                                            : "Pilih Cabang"}
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    className="w-100 border-0 shadow-lg rounded-lg"
                                                    style={{
                                                        maxHeight: "200px",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {filterOptions.cabang.map(
                                                        (option, idx) => (
                                                            <DropdownItem
                                                                key={idx}
                                                                onClick={() =>
                                                                    handleMultiSelectChange(
                                                                        "cabang",
                                                                        option
                                                                    )
                                                                }
                                                                className="py-2 hover:bg-gray-50"
                                                            >
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={filters.cabang.includes(
                                                                            option.id
                                                                        )}
                                                                        onChange={() => {}}
                                                                    />
                                                                    <label className="form-check-label text-sm text-gray-700">
                                                                        {
                                                                            option.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </DropdownItem>
                                                        )
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </FormGroup>

                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="divisi"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-diagram-3 me-1 md:me-2"></i>
                                                Divisi
                                            </Label>
                                            <Dropdown
                                                isOpen={dropdownOpen.divisi}
                                                toggle={() => toggle("divisi")}
                                                className="w-100"
                                            >
                                                <DropdownToggle
                                                    caret
                                                    color="light"
                                                    className="w-100 text-start d-flex justify-content-between align-items-center py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-sm"
                                                >
                                                    <span className="text-gray-700 truncate">
                                                        {filters.divisi.length >
                                                        0
                                                            ? `${filters.divisi.length} divisi dipilih`
                                                            : "Pilih Divisi"}
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    className="w-100 border-0 shadow-lg rounded-lg"
                                                    style={{
                                                        maxHeight: "200px",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {filterOptions.divisi.map(
                                                        (option, idx) => (
                                                            <DropdownItem
                                                                key={idx}
                                                                onClick={() =>
                                                                    handleMultiSelectChange(
                                                                        "divisi",
                                                                        option
                                                                    )
                                                                }
                                                                className="py-2 hover:bg-gray-50"
                                                            >
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={filters.divisi.includes(
                                                                            option.id
                                                                        )}
                                                                        onChange={() => {}}
                                                                    />
                                                                    <label className="form-check-label text-sm text-gray-700">
                                                                        {
                                                                            option.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </DropdownItem>
                                                        )
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </FormGroup>

                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="tglMulai"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-calendar me-1 md:me-2"></i>
                                                Tanggal Mulai
                                            </Label>
                                            <Input
                                                type="date"
                                                name="tglMulai"
                                                id="tglMulai"
                                                value={filters.tglMulai}
                                                onChange={handleFilterChange}
                                                className="py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                            />
                                        </FormGroup>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="nama"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-person me-1 md:me-2"></i>
                                                Nama
                                            </Label>
                                            <Input
                                                type="text"
                                                name="nama"
                                                id="nama"
                                                value={filters.nama}
                                                onChange={handleFilterChange}
                                                className="py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                                placeholder="Masukkan nama..."
                                            />
                                        </FormGroup>

                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="posisi"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-briefcase me-1 md:me-2"></i>
                                                Posisi
                                            </Label>
                                            <Dropdown
                                                isOpen={dropdownOpen.posisi}
                                                toggle={() => toggle("posisi")}
                                                className="w-100"
                                            >
                                                <DropdownToggle
                                                    caret
                                                    color="light"
                                                    className="w-100 text-start d-flex justify-content-between align-items-center py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-sm"
                                                >
                                                    <span className="text-gray-700 truncate">
                                                        {filters.posisi.length >
                                                        0
                                                            ? `${filters.posisi.length} posisi dipilih`
                                                            : "Pilih Posisi"}
                                                    </span>
                                                </DropdownToggle>
                                                <DropdownMenu
                                                    className="w-100 border-0 shadow-lg rounded-lg"
                                                    style={{
                                                        maxHeight: "200px",
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {filterOptions.posisi.map(
                                                        (option, idx) => (
                                                            <DropdownItem
                                                                key={idx}
                                                                onClick={() =>
                                                                    handleMultiSelectChange(
                                                                        "posisi",
                                                                        option
                                                                    )
                                                                }
                                                                className="py-2 hover:bg-gray-50"
                                                            >
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={filters.posisi.includes(
                                                                            option.id
                                                                        )}
                                                                        onChange={() => {}}
                                                                    />
                                                                    <label className="form-check-label text-sm text-gray-700">
                                                                        {
                                                                            option.name
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </DropdownItem>
                                                        )
                                                    )}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </FormGroup>

                                        <FormGroup className="mb-2 md:mb-3">
                                            <Label
                                                for="tglSelesai"
                                                className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 block"
                                            >
                                                <i className="bi bi-calendar-check me-1 md:me-2"></i>
                                                Tanggal Selesai
                                            </Label>
                                            <Input
                                                type="date"
                                                name="tglSelesai"
                                                id="tglSelesai"
                                                value={filters.tglSelesai}
                                                onChange={handleFilterChange}
                                                className="py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                            />
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-3 md:mt-4">
                                    <Button
                                        color="primary"
                                        type="submit"
                                        className="px-4 md:px-6 py-2 bg-blue-600 hover:bg-blue-700 border-0 rounded-lg font-medium text-sm md:text-base"
                                    >
                                        <i className="bi bi-funnel me-1 md:me-2"></i>
                                        Filter Data
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

                {/* Data Performa Section */}
                <div className="mb-3">
                    <div className="p-3 p-md-4 bg-white rounded-2xl shadow-md">
                        <div className="mb-3 md:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                                <h5 className="text-base md:text-lg font-semibold text-gray-900 lg:text-xl">
                                    <i className="bi bi-table me-1 md:me-2"></i>
                                    Data Performa
                                </h5>
                                <p className="text-gray-400 text-xs md:text-sm">
                                    Menampilkan {tableData.length} dari{" "}
                                    {totalRecords} total data
                                </p>
                            </div>
                            <div className="text-xs md:text-sm text-gray-600">
                                Halaman {page + 1} dari{" "}
                                {Math.ceil(totalRecords / length)}
                            </div>
                        </div>

                        <div className="overflow-x-auto -mx-2 md:mx-0">
                            <Table
                                responsive
                                className="w-full border-collapse min-w-full"
                            >
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Nama
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Divisi
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Posisi
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Cabang
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Min. Score
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Score
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Progress Tugas
                                        </th>
                                        <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {renderTableData()}
                                </tbody>
                            </Table>
                            {/* Pagination Component */}
                            <div className="mt-3 md:mt-4">
                                <Pagination
                                    page={page}
                                    length={length}
                                    totalRecords={totalRecords}
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    handleRowsPerPageChange={
                                        handleRowsPerPageChange
                                    }
                                    handlePreviousPage={handlePreviousPage}
                                    handleNextPage={handleNextPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Starter;
