// src/features/my_activities/ui/List.jsx
import { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";

const Index = () => {
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "My Activities", to: "", active: true },
    ];

    const navigate = useNavigate();

    const {
        data,
        rejectedData,
        approvedData,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        fetchAllByStatus,
        setSearchFilters,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
    } = useList();

    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
        branch: "",
    });

    // ===== HANDLER INPUT =====
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // ===== HANDLER SUBMIT =====
    const handleFilterSubmit = async () => {
        setSearchFilters(filters);
        await fetchAllByStatus(length, page, filters);
    };

    // ===== EDIT =====
    const handleEdit = (id) => navigate(`${id}/edit`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // ===== COLUMNS =====
    const mainColumns = [
        { key: "no", label: "No" },
        { key: "status", label: "Status" },
        { key: "jobdesc", label: "Jobdesc" },
        { key: "start_date", label: "Start Date" },
        { key: "end_date", label: "End Date" },
        { key: "type", label: "Routine" },
    ];

    // ==== MAP DATA UTAMA ====
    const mainData = data.map((val, i) => ({
        no: startRecord + i,
        status: val.status,
        jobdesc: val.jobdesc,
        start_date: val.start_date,
        end_date: val.end_date,
        type: val.type,
    }));

    // ==== MAP DATA REJECTED ====
    const rejectedMapped = rejectedData.map((val, i) => ({
        no: i + 1,
        status: val.status,
        jobdesc: val.jobdesc,
        start_date: val.start_date,
        end_date: val.end_date,
        type: val.type,
    }));

    // ==== MAP DATA APPROVED ====
    const approvedMapped = approvedData.map((val, i) => ({
        no: i + 1,
        status: val.status,
        jobdesc: val.jobdesc,
        start_date: val.start_date,
        end_date: val.end_date,
        type: val.type,
    }));

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="My Activities" items={breadcrumbItems} />

            {/* ===== FILTER ===== */}
            <FormGroup className="flex gap-2 mb-4">
                <Input
                    type="date"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                    className="w-1/4 rounded-lg"
                />
                <Input
                    type="date"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                    className="w-1/4 rounded-lg"
                />
                <Button
                    color="primary"
                    onClick={handleFilterSubmit}
                    className="flex items-center gap-2"
                >
                    <Icon icon="solar:magnifer-broken" width="18" height="18" />
                    Cari
                </Button>
            </FormGroup>

            {/* ===== HEADER ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">{totalRecords} Activities</label>
                </div>
            </div>

            {/* ===== TABEL UTAMA ===== */}
            <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                    <Tables
                        columns={mainColumns}
                        data={mainData}
                        renderActions={(row) => (
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                title="Edit"
                                onClick={() => handleEdit(row.no)}
                            >
                                <Icon icon="solar:clapperboard-edit-broken" width="20" height="20" />
                            </button>
                        )}
                        page={page}
                        length={length}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={rowsPerPageOptions}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>

            {/* ===== 2 TABEL BAWAH BERDAMPINGAN ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* REJECTED TABLE */}
                <div style={{ fontSize: '10px' }} className="bg-white p-3 rounded-lg shadow-md overflow-x-auto">
                    <h4 className="font-semibold mb-2">Rejected</h4>
                    <div className="min-w-[500px]">
                        <Tables
                            columns={mainColumns}
                            data={rejectedMapped}
                            page={0}
                            length={10}
                            totalRecords={rejectedMapped.length}
                            rowsPerPageOptions={[10]}
                            handleRowsPerPageChange={() => {}}
                            handlePreviousPage={() => {}}
                            handleNextPage={() => {}}
                        />
                    </div>
                </div>

                {/* APPROVED TABLE */}
                <div style={{ fontSize: '10px' }} className="bg-white p-3 rounded-lg shadow-md overflow-x-auto">
                    <h4 className="font-semibold mb-2">Approved</h4>
                    <div className="min-w-[500px]">
                        <Tables
                            columns={mainColumns}
                            data={approvedMapped}
                            page={0}
                            length={10}
                            totalRecords={approvedMapped.length}
                            rowsPerPageOptions={[10]}
                            handleRowsPerPageChange={() => {}}
                            handlePreviousPage={() => {}}
                            handleNextPage={() => {}}
                        />
                    </div>
                </div>
            </div>;
        </div>
    );
};

export default Index;
