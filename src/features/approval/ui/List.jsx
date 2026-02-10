// src/features/approval/ui/List.jsx
import { useState } from "react";
import {
    Button,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import InputCustom from "../../../components/ui/Input";
import SubmitButton from "../../../components/ui/SubmitButton";
import ToastNotification from "../../../components/common/ToastNotification";
import { approvalService } from "../services/approvalService";
import { useApprovalList } from "../hooks/useApprovalList";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import "./../../../assets/css/custom.css";

const Index = () => {
    const {
        data,
        loading,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,

        tempFilters,
        handleTempFilterChange,
        handleFilterSubmit,

        setPage,
        setLength,

        sortColumn,
        sortDirection,
        setSortColumn,
        setSortDirection,

        username,
        loadUsernameOptions,
        handleUsernameChange,
        fetchMain,
    } = useApprovalList();

    // ===== MODAL =====
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bohNote, setBohNote] = useState("");
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const [showDescModal, setShowDescModal] = useState(false);
    const [descRow, setDescRow] = useState(null);

    // ===== COLUMNS =====
    const columns = [
        { key: "no", label: "No", width: "10px" },
        { key: "name", label: "Nama" },
        { key: "jobdesc", label: "Title" },
        { key: "description", label: "Deskripsi" },
        { key: "position", label: "Jobdesc" },
        { key: "type", label: "Routine" },
        { key: "start_date", label: "Tanggal" },
        { key: "file", label: "File" },
        { key: "status", label: "Status" },
    ];

    const handleOpenDescription = (row) => {
        setDescRow(row);
        setShowDescModal(true);
    };

    const mappedData = data.map((row, i) => ({
        ...row,
        no: page * length + i + 1,
        _raw: {
            ...row,
            onOpenDescription: handleOpenDescription,
        },
    }));

    // ===== APPROVE / REJECT =====
    const handleApprove = async () => {
        setApproveLoading(true);
        try {
            await approvalService.updateStatus(selectedRow.id, {
                status: "approved",
                boh_note: null,
            });
            ToastNotification.success("Berhasil approve");
            setShowModal(false);
            await fetchMain();
        } catch (err) {
            ToastNotification.error(err.message);
        } finally {
            setApproveLoading(false);
        }
    };

    const handleReject = async () => {
        if (!bohNote.trim()) {
            return ToastNotification.error("Notes wajib diisi");
        }

        setRejectLoading(true);
        try {
            await approvalService.updateStatus(selectedRow.id, {
                status: "rejected",
                boh_note: bohNote,
            });
            ToastNotification.success("Berhasil reject");
            setShowModal(false);
            setBohNote("");
            await fetchMain();
        } catch (err) {
            ToastNotification.error(err.message);
        } finally {
            setRejectLoading(false);
        }
    };

    return (
        <div>
            <Breadcrumbs
                title="My Activities"
                items={[
                    {
                        label: <i className="bi bi-house"></i>,
                        to: "/",
                        active: false,
                    },
                    { label: "My Activities", active: true },
                ]}
            />

            {/* FILTER */}
            <FormGroup
                className="row gap-2 px-2"
                style={{ padding: "0px 10px" }}
            >
                <div className="col">
                    <InputCustom
                        label="Start Date"
                        type="date"
                        name="start_date"
                        value={tempFilters.start_date}
                        onChange={handleTempFilterChange}
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-start_date"
                    />
                </div>

                <div className="col">
                    <InputCustom
                        label="End Date"
                        type="date"
                        name="end_date"
                        value={tempFilters.end_date}
                        onChange={handleTempFilterChange}
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
                    />
                </div>

                <div className="col">
                    <AsyncSelect
                        id="user_filter"
                        value={username}
                        loadOptions={loadUsernameOptions}
                        onChange={handleUsernameChange}
                        placeholder="Pilih User"
                        cacheOptions
                        defaultOptions
                        marginBot="mb-0"
                        marginTop="mt-0"
                        border="border-0"
                    />
                </div>

                <div className="col">
                    <Button
                        color="primary"
                        onClick={handleFilterSubmit}
                        className="flex items-center gap-2"
                    >
                        <Icon
                            icon="solar:magnifer-broken"
                            width="18"
                            height="18"
                        />
                        Cari
                    </Button>
                </div>
            </FormGroup>

            {/* TABLE */}
            <Tables
                columns={columns}
                data={mappedData}
                loading={loading}
                enableSorting
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={(colKey, direction) => {
                    setSortColumn(colKey);
                    setSortDirection(direction);
                    setPage(0);
                }}
                page={page}
                length={length}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={(e) => {
                    setLength(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                handlePreviousPage={() => setPage(Math.max(page - 1, 0))}
                handleNextPage={() => setPage(page + 1)}
                renderActions={(row) =>
                    ["Need Review", "Revision"].includes(row.status) && (
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-green-50 text-green-600"
                            onClick={() => {
                                setSelectedRow(row);
                                setShowModal(true);
                            }}
                        >
                            <Icon icon="solar:rocket-2-outline" width="20" />
                        </button>
                    )
                }
            />

            {/* MODAL APPROVE */}
            <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>
                    Approve Task
                </ModalHeader>
                <ModalBody>
                    <strong>{selectedRow?.title}</strong>
                    <InputCustom
                        type="textarea"
                        value={bohNote}
                        onChange={(e) => setBohNote(e.target.value)}
                        placeholder="Notes (wajib jika reject)"
                    />
                </ModalBody>
                <ModalFooter>
                    <SubmitButton
                        label="Approve"
                        loading={approveLoading}
                        onClick={handleApprove}
                    />
                    <SubmitButton
                        label="Reject"
                        color="danger"
                        loading={rejectLoading}
                        onClick={handleReject}
                    />
                </ModalFooter>
            </Modal>

            {/* MODAL DESKRIPSI */}
            <Modal
                isOpen={showDescModal}
                toggle={() => setShowDescModal(false)}
                size="lg"
            >
                <ModalHeader toggle={() => setShowDescModal(false)}>
                    Detail Deskripsi
                </ModalHeader>

                <ModalBody>
                    <div className="mb-3">
                        <strong>Deskripsi</strong>
                        <div
                            className="border rounded p-2 mt-1"
                            dangerouslySetInnerHTML={{
                                __html: descRow?.description || "-",
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <strong>Admin Note</strong>
                        <div className="border rounded p-2 mt-1 bg-gray-50">
                            {descRow?.admin_note || "-"}
                        </div>
                    </div>

                    <div>
                        <strong>HRO / BOH Note</strong>
                        <div className="border rounded p-2 mt-1 bg-gray-50">
                            {descRow?.boh_note || "-"}
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => setShowDescModal(false)}
                    >
                        Tutup
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
