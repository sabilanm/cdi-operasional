// src/features/approval/ui/List.jsx
import { useState, useEffect } from "react";
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import InputCustom from "../../../components/ui/Input";
import { approvalService } from "../services/approvalService";
import ToastNotification from "../../../components/common/ToastNotification";
import './../../../assets/css/custom.css';
import { BsFileImage, BsFileText } from "react-icons/bs";
import SubmitButton from "../../../components/ui/SubmitButton";

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
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleEdit = (row) => {
        setSelectedRow(row.id);
        setKartuStock("");
        setFile(null);
        setNotes("");
        toggleModal();
    };

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
            await fetchMain();
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
            await fetchMain();
        } catch (err) {
            ToastNotification.error(err.message || "Gagal reject task");
        } finally {
            setRejectLoading(false);
        }
    };

    // ===== STATE UTAMA =====
    const rowsPerPageOptions = [10, 20, 30, 40, 50];

    // Main Table
    const [mainData, setMainData] = useState([]);
    const [mainPage, setMainPage] = useState(0);
    const [mainLength, setMainLength] = useState(10);
    const [mainTotal, setMainTotal] = useState(0);
    const [additionals, setAdditionals] = useState({ generate: false });
    const [loadingMain, setLoadingMain] = useState(false);

    // ===== HANDLER FILTER =====
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = async () => {
        await fetchMain(0, mainLength);
    };

    // ===== API FETCH FUNCTIONS =====
    const fetchMain = async (pageParam = mainPage, lengthParam = mainLength) => {
        setLoadingMain(true);
        setMainData([]); // ← reset dulu
        try {
            const res = await approvalService.getAll(
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

    // ===== EFFECT: FIRST LOAD =====
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

    // ===== MAP DATA UTAMA =====
    const mappedMainData = mainData.map((val, i) => {
        return {
            ...val,
            no: mainPage * mainLength + i + 1,
            file: val.file
        };
    });

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
            </FormGroup>

            {/* ===== HEADER ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">{mainTotal} Activities</label>
                </div>
            </div>

            {/* ===== TABEL UTAMA ===== */}
            <div className="overflow-x-auto" >
                <div className="min-w-[500px]">
                    <Tables
                        columns={mainColumns}
                        data={mappedMainData}
                        renderActions={(row) => {
                            switch (row.status) {
                                case "Need Review":
                                    return (
                                        <button
                                            className="p-2 w-10 h-10 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
                                            onClick={() => handleDetail(row)}
                                        >
                                            <Icon icon="solar:rocket-2-outline" width="20" height="20" />
                                        </button>
                                    );

                                default:
                                    return null;
                            }
                        }}

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
            </Modal>

            {/* MODAL APPROVE */}
            <Modal isOpen={showApproveModal} toggle={() => setShowApproveModal(false)}>
                <ModalHeader toggle={() => setShowApproveModal(false)}>
                    Approve Task
                </ModalHeader>

                <ModalBody>
                    Apakah Anda yakin ingin menyetujui task ini?
                    <br /><br />
                    <strong>{selectedRow?.title}</strong>
                </ModalBody>

                <ModalFooter>
                    <SubmitButton
                        onClick={() => handleApprove(selectedRow)}
                        loading={approveLoading}
                        label="Approve"
                        color="primary"
                    />

                    <SubmitButton
                        onClick={() => handleReject(selectedRow)}
                        loading={rejectLoading}
                        label="Reject"
                        color="danger"
                    />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
