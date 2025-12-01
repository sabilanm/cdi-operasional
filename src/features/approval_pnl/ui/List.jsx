import { useState, useEffect } from "react";
import {
    Button,
    FormGroup,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    InputGroup,
    InputGroupText,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import SubmitButton from "../../../components/ui/SubmitButton";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import ToastNotification from "../../../components/common/ToastNotification";
import { profitLossService } from "../services/P&LService";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Approval PNL", active: true },
    ];
    const navigate = useNavigate();
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [kartuStock, setKartuStock] = useState("");
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState("");
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const {
        data,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        branch,
        loadBranchOptions,
        handleBranchChange,
        refetch,
    } = useList();

    const toggleModal = () => setModalOpen(!modalOpen);
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "cabang", label: "Cabang" },
        { key: "periode", label: "Periode" },
        { key: "presentase", label: "Presentase" },
        { key: "file", label: "Lampiran" },
        { key: "pl", label: "P/L" },
        { key: "score", label: "Score" },
        { key: "status", label: "Status" },
    ];
    const datas = data.map((val, i) => ({
        no: startRecord + i,
        cabang: val.cabang,
        periode: val.periode,
        presentase: val.persentase,
        file: val.file,
        pl: val.pl,
        score: val.score,
        status: val.status,
        id: val.id,
    }));

    const handleDetail = (row) => {
        setSelectedRow(row);
        setShowApproveModal(true);
    };

    const handleApprove = async (row) => {
        setApproveLoading(true);
        try {
            const res = await profitLossService.updateApprovalStatus(row.id, "approved");
            ToastNotification.success(res.message || "Approval Succesfully Done");
            setShowApproveModal(false);
            refetch();
        } catch (err) {
            ToastNotification.error(err.message || "Gagal approve data");
        } finally {
            setApproveLoading(false);
        }
    };

    const handleReject = async (row) => {
        setRejectLoading(true);
        try {
            const res = await profitLossService.updateApprovalStatus(row.id, "rejected");
            ToastNotification.success(res.message || "Approval Succesfully Done");
            setShowApproveModal(false);
            refetch();
        } catch (err) {
            ToastNotification.error(err.message || "Gagal reject data");
        } finally {
            setRejectLoading(false);
        }
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Approval PNL" items={breadcrumbItems} />
            <FormGroup className="flex justify-start">
                <div className="w-1/2">
                    <AsyncSelect
                        label="Filter Cabang"
                        id="branch_filter"
                        value={branch || null}
                        loadOptions={loadBranchOptions}
                        onChange={handleBranchChange}
                        placeholder="Pilih cabang"
                    />
                </div>
            </FormGroup>

            {/* Bagian bawah: total & button tambah */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">
                        {totalRecords} List
                    </label>
                </div>
            </div>
            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) => (
                    <>
                        {datas.status === "Waiting" ? (
                            <>
                                <button
                                    className="p-2 w-10 h-10 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
                                    onClick={() => handleDetail(datas)}
                                >
                                    <Icon
                                        icon="solar:rocket-2-outline"
                                        width="20"
                                        height="20"
                                    />
                                </button>
                            </>
                        ) : null}
                    </>
                )}
                page={page}
                length={length}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={handleRowsPerPageChange}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
            {/* ===== MODAL ===== */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader
                    style={{ backgroundColor: "#f0f8ff" }}
                    toggle={toggleModal}
                >
                    Admin Barang
                </ModalHeader>
                <ModalBody style={{ backgroundColor: "#f0f8ff" }}>
                    <FormGroup>
                        <Label for="kartuStock">Update Kartu Stock</Label>
                        <Input
                            type="text"
                            id="kartu_stock"
                            value={kartuStock}
                            onChange={(e) => setKartuStock(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input
                            type="textarea"
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </FormGroup>
                </ModalBody>
            </Modal>

            {/* MODAL APPROVE */}
            <Modal
                isOpen={showApproveModal}
                toggle={() => setShowApproveModal(false)}
            >
                <ModalHeader toggle={() => setShowApproveModal(false)}>
                    Approval Profit & Loss
                </ModalHeader>

                <ModalBody>
                    Apakah Anda yakin untuk melakukan approval pada data berikut?
                    <br /><br />
                    <div style={{ backgroundColor: "#e0f7fa", padding: "10px", borderRadius: "8px" }}>
                        <div><strong>Cabang:</strong> {selectedRow?.cabang || "-"}</div>
                        <div><strong>Periode:</strong> {selectedRow?.periode || "-"}</div>
                        <div><strong>P/L:</strong> {selectedRow?.pl || "-"}</div>
                        <div><strong>Persentase:</strong> {selectedRow?.presentase || "-"}</div>
                        {selectedRow?.file ? (
                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="p-2 w-28 rounded bg-green-50 text-green-700 border border-green-300"
                                    onClick={() =>
                                        window.open(
                                            `${process.env.REACT_APP_IMAGE_URL}${selectedRow.file}`,
                                            "_blank"
                                        )
                                    }
                                >
                                    Lihat Lampiran
                                </button>
                            </div>
                        ) : null}
                    </div>
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
