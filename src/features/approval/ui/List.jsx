// src/features/approval/ui/List.jsx
import { useState, useEffect } from "react";
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import InputCustom from "../../../components/ui/Input";
import { approvalService } from "../services/approvalService";
import ToastNotification from "../../../components/common/ToastNotification";
import SubmitButton from "../../../components/ui/SubmitButton";
import "./../../../assets/css/custom.css";

const Index = () => {
    // Breadcrumb
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false },
        { label: "My Activities", to: "", active: true },
    ];

    // ===== STATE FILTER =====
    const [filters, setFilters] = useState({ start_date: "", end_date: "", branch: "" });

    // ===== STATE MODAL =====
    const [selectedRow, setSelectedRow] = useState(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    // ===== STATE TABLE =====
    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    const [mainData, setMainData] = useState([]);
    const [mainPage, setMainPage] = useState(0);
    const [mainLength, setMainLength] = useState(10);
    const [mainTotal, setMainTotal] = useState(0);
    const [loadingMain, setLoadingMain] = useState(false);

    // ===== SORT STATE =====
    const [sortColumn, setSortColumn] = useState(""); // default backend
    const [sortDirection, setSortDirection] = useState("");

    // ===== HANDLER FILTER =====
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = async () => {
        setMainPage(0);
        await fetchMain(0, mainLength, sortColumn, sortDirection);
    };

    // ===== HANDLE SORT =====
    const handleSort = (colKey, direction) => {
        setSortColumn(colKey);
        setSortDirection(direction);
        fetchMain(0, mainLength, colKey, direction);
    };

    // ===== HANDLE APPROVE / REJECT =====
    const handleDetail = (row) => {
        setSelectedRow(row);
        setShowApproveModal(true);
    };

    const handleApprove = async (row) => {
        setApproveLoading(true);
        try {
            const res = await approvalService.updateStatus(row.id, "approved");
            ToastNotification.success(res.message || "Berhasil approve task");
            setShowApproveModal(false);
            await fetchMain(mainPage, mainLength, sortColumn, sortDirection);
        } catch (err) {
            ToastNotification.error(err.message || "Gagal approve task");
        } finally {
            setApproveLoading(false);
        }
    };

    const handleReject = async (row) => {
        setRejectLoading(true);
        try {
            const res = await approvalService.updateStatus(row.id, "rejected");
            ToastNotification.success(res.message || "Berhasil reject task");
            setShowApproveModal(false);
            await fetchMain(mainPage, mainLength, sortColumn, sortDirection);
        } catch (err) {
            ToastNotification.error(err.message || "Gagal reject task");
        } finally {
            setRejectLoading(false);
        }
    };

    // ===== FETCH DATA =====
    const fetchMain = async (pageParam = mainPage, lengthParam = mainLength, sortColParam = sortColumn, sortDirParam = sortDirection) => {
        setLoadingMain(true);
        setMainData([]);
        try {
            const res = await approvalService.getAll(filters.start_date || "", filters.end_date || "", filters.branch || "", "not started", lengthParam, pageParam, sortColParam, sortDirParam);
            setMainData(res.data || []);
            setMainTotal(res.recordsFiltered || 0);
        } catch (err) {
            ToastNotification.error(err.message || "Failed to load main table data");
        } finally {
            setLoadingMain(false);
        }
    };

    useEffect(() => {
        fetchMain();
    }, []);

    // ===== COLUMNS =====
    const mainColumns = [
        { key: "no", label: "No" },
        { key: "name", label: "Nama" },
        { key: "position", label: "Jabatan" },
        { key: "jobdesc", label: "Jobdesc" },
        { key: "type", label: "Routine" },
        { key: "methode", label: "Metode" },
        { key: "start_date", label: "Tanggal" },
        { key: "file", label: "File" },
        { key: "status", label: "Status" },
    ];

    const mappedMainData = mainData.map((val, i) => ({
        ...val,
        no: mainPage * mainLength + i + 1,
    }));

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="My Activities" items={breadcrumbItems} />

            {/* ===== FILTER ===== */}
            <FormGroup className="row gap-2" style={{ padding: "0px 10px" }}>
                <div className="col">
                    <InputCustom label="Start Date" type="date" name="start_date" value={filters.start_date} onChange={handleFilterChange} marginBot="mb-0" marginTop="mt-0" />
                </div>
                <div className="col">
                    <InputCustom label="End Date" type="date" name="end_date" value={filters.end_date} onChange={handleFilterChange} marginBot="mb-0" marginTop="mt-0" />
                </div>
                <div className="col">
                    <Button color="primary" onClick={handleFilterSubmit} className="flex items-center gap-2">
                        <Icon icon="solar:magnifer-broken" width="18" height="18" />
                        Cari
                    </Button>
                </div>
            </FormGroup>

            {/* ===== TABLE ===== */}
            <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                    <Tables
                        columns={mainColumns}
                        data={mappedMainData}
                        page={mainPage}
                        length={mainLength}
                        totalRecords={mainTotal}
                        rowsPerPageOptions={rowsPerPageOptions}
                        handleRowsPerPageChange={(e) => {
                            setMainLength(parseInt(e.target.value));
                            setMainPage(0);
                            fetchMain(0, parseInt(e.target.value), sortColumn, sortDirection);
                        }}
                        handlePreviousPage={() => {
                            if (mainPage > 0) setMainPage(mainPage - 1);
                            fetchMain(mainPage - 1, mainLength, sortColumn, sortDirection);
                        }}
                        handleNextPage={() => {
                            setMainPage(mainPage + 1);
                            fetchMain(mainPage + 1, mainLength, sortColumn, sortDirection);
                        }}
                        enableSorting={true}
                        onSort={handleSort}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                    />
                </div>
            </div>

            {/* ===== MODAL APPROVE / REJECT ===== */}
            <Modal isOpen={showApproveModal} toggle={() => setShowApproveModal(false)}>
                <ModalHeader toggle={() => setShowApproveModal(false)}>Approve Task</ModalHeader>
                <ModalBody>
                    Apakah Anda yakin ingin menyetujui task ini?
                    <br />
                    <br />
                    <strong>{selectedRow?.title}</strong>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton onClick={() => handleApprove(selectedRow)} loading={approveLoading} label="Approve" color="primary" />
                    <SubmitButton onClick={() => handleReject(selectedRow)} loading={rejectLoading} label="Reject" color="danger" />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
