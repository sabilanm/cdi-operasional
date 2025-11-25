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
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import SubmitButton from "../../../components/ui/SubmitButton";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Profit & Loss", active: true },
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
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
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
        file: val.lampiran,
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
        console.log("approve");
    };

    const handleReject = async (row) => {
        setRejectLoading(true);
        console.log("reject");
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Profit & Loss List" items={breadcrumbItems} />
            <FormGroup className="flex justify-start">
                <InputGroup className="w-1/2 h-12">
                    <InputGroupText
                        style={{
                            borderTopLeftRadius: "15px",
                            borderBottomLeftRadius: "15px",
                        }}
                    >
                        <BiSearch />
                    </InputGroupText>
                    <Input
                        placeholder="Nama"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            borderTopRightRadius: "15px",
                            borderBottomRightRadius: "15px",
                        }}
                    />
                </InputGroup>
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
                                    onClick={() => handleDetail(datas.id)}
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
                    Approve Task
                </ModalHeader>

                <ModalBody>
                    Apakah Anda yakin ingin menyetujui task ini?
                    <br />
                    <br />
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
