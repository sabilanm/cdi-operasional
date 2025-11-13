// src/features/my_activities/ui/List.jsx
import { useState, useEffect } from "react";
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import InputCustom from "../../../components/ui/Input";
import { myActivitiesService } from "../services/my_activities";
import ToastNotification from "../../../components/common/ToastNotification";
import './list.css';

const Index = () => {
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "My Activities", to: "", active: true },
    ];

    // ===== STATE FILTER =====
    const [filters, setFilters] = useState({ start_date: "", end_date: "", branch: "" });

    // ===== STATE MODAL =====
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [kartuStock, setKartuStock] = useState("");
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState("");

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleEdit = (row) => {
        setSelectedRow(row.id);
        setKartuStock("");
        setFile(null);
        setNotes("");
        toggleModal();
    };

    const handleSubmitPopUI = async () => {
        const formData = new FormData();
        formData.append("kartu_stock", kartuStock || "");
        if (file) formData.append("file", file);
        formData.append("notes", notes || "");

        try {
            const res = await myActivitiesService.updateMyActivity(selectedRow, formData);
            ToastNotification.success(res.message || "Data berhasil disimpan");
            await fetchMain();
            await fetchRejected();
            await fetchApproved();
            toggleModal();
        } catch (err) {
            ToastNotification.error(err.message || "Terjadi kesalahan saat update data");
        }
    };

    // ===== STATE UTAMA =====
    const rowsPerPageOptions = [5, 10, 20, 30, 40, 50];

    // Main Table
    const [mainData, setMainData] = useState([]);
    const [mainPage, setMainPage] = useState(0);
    const [mainLength, setMainLength] = useState(5);
    const [mainTotal, setMainTotal] = useState(0);
    const [additionals, setAdditionals] = useState({ generate: false });
    const [loadingMain, setLoadingMain] = useState(false);

    // Rejected Table
    const [rejectedData, setRejectedData] = useState([]);
    const [rejectedPage, setRejectedPage] = useState(0);
    const [rejectedLength, setRejectedLength] = useState(5);
    const [loadingRejected, setLoadingRejected] = useState(false);

    // Approved Table
    const [approvedData, setApprovedData] = useState([]);
    const [approvedPage, setApprovedPage] = useState(0);
    const [approvedLength, setApprovedLength] = useState(5);
    const [loadingApproved, setLoadingApproved] = useState(false);

    // ===== HANDLER FILTER =====
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = async () => {
        await fetchMain(0, mainLength);
        await fetchRejected(0, rejectedLength);
        await fetchApproved(0, approvedLength);
    };

    // ===== API FETCH FUNCTIONS =====
    const fetchMain = async (pageParam = mainPage, lengthParam = mainLength) => {
        setLoadingMain(true);
        try {
            const res = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "not started",
                lengthParam,
                pageParam,
                "jt.start_date",
                "asc"
            );
            setMainData(res.data || []);
            setMainTotal(res.recordsFiltered || 0);
            setAdditionals(res.additionals || { generate: false });
        } catch (err) {
            ToastNotification.error(err.message || "Failed to load main table data");
        } finally {
            setLoadingMain(false);
        }
    };

    const fetchRejected = async (pageParam = rejectedPage, lengthParam = rejectedLength) => {
        setLoadingRejected(true);
        try {
            const res = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "rejected",
                lengthParam,
                pageParam,
                "jt.start_date",
                "asc"
            );
            setRejectedData(res.data || []);
        } catch (err) {
            ToastNotification.error(err.message || "Failed to load rejected table data");
        } finally {
            setLoadingRejected(false);
        }
    };

    const fetchApproved = async (pageParam = approvedPage, lengthParam = approvedLength) => {
        setLoadingApproved(true);
        try {
            const res = await myActivitiesService.getAll(
                filters.start_date || "",
                filters.end_date || "",
                filters.branch || "",
                "approved",
                lengthParam,
                pageParam,
                "id",
                "asc"
            );
            setApprovedData(res.data || []);
        } catch (err) {
            ToastNotification.error(err.message || "Failed to load approved table data");
        } finally {
            setLoadingApproved(false);
        }
    };

    // ===== GENERATE BULANAN =====
    const handleGenerateBulanan = async () => {
        if (!window.confirm("Yakin ingin melakukan generate bulanan?")) return;
        try {
            const res = await myActivitiesService.generateBulanan(filters);
            ToastNotification.success(res.message || "Generate bulanan berhasil!");
            await fetchMain();
            await fetchRejected();
            await fetchApproved();
        } catch (err) {
            ToastNotification.error(err.message || "Terjadi kesalahan saat generate bulanan.");
        }
    };

    // ===== EFFECT: FIRST LOAD =====
    useEffect(() => {
        fetchMain();
        fetchRejected();
        fetchApproved();
    }, []);

    // ===== COLUMNS =====
    const mainColumns = [
        { key: "no", label: "No" },
        { key: "status", label: "Status" },
        { key: "jobdesc", label: "Jobdesc" },
        { key: "start_date", label: "Start Date" },
        { key: "end_date", label: "End Date" },
        { key: "type", label: "Routine" },
    ];

    // ===== MAP DATA UTAMA =====
    const mappedMainData = mainData.map((val, i) => ({ ...val, no: mainPage * mainLength + i + 1 }));
    const mappedRejectedData = rejectedData.map((val, i) => ({ ...val, no: rejectedPage * rejectedLength + i + 1 }));
    const mappedApprovedData = approvedData.map((val, i) => ({ ...val, no: approvedPage * approvedLength + i + 1 }));

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="My Activities" items={breadcrumbItems} />

            {/* ===== FILTER ===== */}
            <FormGroup className="row gap-2" style={{ padding: '0px 10px' }}>
                <div className="col">
                    <InputCustom
                        label="Start Date"
                        type="date"
                        name="start_date"
                        value={filters.start_date}
                        onChange={handleFilterChange}
                        background="bg-start_date"
                        marginBot="mb-0"
                        marginTop="mt-0"
                    />
                </div>
                <div className="col">
                    <InputCustom
                        label="End Date"
                        type="date"
                        name="end_date"
                        value={filters.end_date}
                        onChange={handleFilterChange}
                        background="bg-start_date"
                        marginBot="mb-0"
                        marginTop="mt-0"
                    />
                </div>
                <div className="col">
                    <Button
                        color="primary"
                        onClick={handleFilterSubmit}
                        className="flex items-center gap-2"
                    >
                        <Icon icon="solar:magnifer-broken" width="18" height="18" />
                        Cari
                    </Button>
                </div>
                <div className="col">
                    <Button
                        style={{ float: "right" }}
                        color="primary"
                        disabled={!additionals?.generate}
                        onClick={handleGenerateBulanan}
                        className="flex items-center gap-2"
                    >
                        <Icon icon="solar:database-bold-duotone" width="18" height="18" />
                        Generate Bulanan
                    </Button>
                </div>
            </FormGroup>

            {/* ===== HEADER ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">{mainTotal} Activities</label>
                </div>
            </div>

            {/* ===== TABEL UTAMA ===== */}
            <div className="overflow-x-auto" style={{ borderRadius: '10px', backgroundColor: '#e0f7fa', padding: '0px 10px 0px 10px' }}>
                <div className="min-w-[500px]">
                    <Tables
                        columns={mainColumns}
                        data={mappedMainData}
                        renderActions={(row) => (
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                title="Report"
                                onClick={() => handleEdit(row)}
                            >
                                <Icon icon="solar:rocket-2-outline" width="20" height="20" />
                            </button>
                        )}
                        page={mainPage}
                        length={mainLength}
                        totalRecords={mainTotal}
                        rowsPerPageOptions={rowsPerPageOptions}
                        handleRowsPerPageChange={(e) => { setMainLength(parseInt(e.target.value)); setMainPage(0); fetchMain(0, parseInt(e.target.value)); }}
                        handlePreviousPage={() => { if (mainPage > 0) setMainPage(mainPage - 1); fetchMain(mainPage - 1, mainLength); }}
                        handleNextPage={() => { setMainPage(mainPage + 1); fetchMain(mainPage + 1, mainLength); }}
                        loading={loadingMain}
                    />
                </div>
            </div>

            {/* ===== MODAL ===== */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader style={{ backgroundColor: "#f0f8ff" }} toggle={toggleModal}>Admin Barang</ModalHeader>
                <ModalBody style={{ backgroundColor: "#f0f8ff" }}>
                    <FormGroup>
                        <Label for="kartuStock">Update Kartu Stock</Label>
                        <Input type="text" id="kartu_stock" value={kartuStock} onChange={(e) => setKartuStock(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input type="textarea" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: "#f0f8ff" }}>
                    <Button color="primary" onClick={handleSubmitPopUI}>Submit</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* ===== REJECTED & APPROVED TABLES ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {/* REJECTED */}
                <div style={{ fontSize: '10px', backgroundColor: '#e0f7fa' }} className="p-3 rounded-lg overflow-x-auto">
                    <h4 className="font-semibold mb-2">Rejected</h4>
                    <Tables
                        columns={mainColumns}
                        data={mappedRejectedData}
                        page={rejectedPage}
                        length={rejectedLength}
                        totalRecords={rejectedData.length}
                        rowsPerPageOptions={[5]}
                        handleRowsPerPageChange={(e) => { setRejectedLength(parseInt(e.target.value)); setRejectedPage(0); fetchRejected(0, parseInt(e.target.value)); }}
                        handlePreviousPage={() => { if (rejectedPage > 0) setRejectedPage(rejectedPage - 1); fetchRejected(rejectedPage - 1, rejectedLength); }}
                        handleNextPage={() => { setRejectedPage(rejectedPage + 1); fetchRejected(rejectedPage + 1, rejectedLength); }}
                        loading={loadingRejected}
                    />
                </div>

                {/* APPROVED */}
                <div style={{ fontSize: '10px', backgroundColor: '#e0f7fa' }} className="p-3 rounded-lg overflow-x-auto">
                    <h4 className="font-semibold mb-2">Approved</h4>
                    <Tables
                        columns={mainColumns}
                        data={mappedApprovedData}
                        page={approvedPage}
                        length={approvedLength}
                        totalRecords={approvedData.length}
                        rowsPerPageOptions={[5]}
                        handleRowsPerPageChange={(e) => { setApprovedLength(parseInt(e.target.value)); setApprovedPage(0); fetchApproved(0, parseInt(e.target.value)); }}
                        handlePreviousPage={() => { if (approvedPage > 0) setApprovedPage(approvedPage - 1); fetchApproved(approvedPage - 1, approvedLength); }}
                        handleNextPage={() => { setApprovedPage(approvedPage + 1); fetchApproved(approvedPage + 1, approvedLength); }}
                        loading={loadingApproved}
                    />
                </div>
            </div>
        </div>
    );
};

export default Index;
