import {
    Button,
    FormGroup,
    InputGroup,
    InputGroupText,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { useState } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useKetepaten } from "../hooks/useList";
import ToastNotification from "../../../components/common/ToastNotification";
import { ketepatanService } from "../services/ketepatan";
import Cookies from "js-cookie";
import SubmitButton from "../../../components/ui/SubmitButton";

const Index = () => {
    const userRole = Cookies.get("operasional_role");
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Ketepatan Laporan", active: true },
    ];
    const navigate = useNavigate();
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
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
        refetch,
    } = useKetepaten();
    const monthMap = {
        "01": "Januari",
        "02": "Februari",
        "03": "Maret",
        "04": "April",
        "05": "Mei",
        "06": "Juni",
        "07": "Juli",
        "08": "Agustus",
        "09": "September",
        10: "Oktober",
        11: "November",
        12: "Desember",
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "cabang", label: "Cabang" },
        { key: "periode", label: "Periode" },
        { key: "file", label: "Lampiran" },
        { key: "legal", label: "Legal" },
        { key: "ketepatan", label: "Ketetpatan" },
        { key: "status", label: "Status" },
    ];
    const datas = data.map((val, i) => ({
        no: startRecord + i,
        cabang: val.name.replace(/^PT\. Cobra Dental Indonesia\s*/i, ""),
        periode: `${monthMap[val.month]} ${val.year}`,
        file: val.file,
        legal: val.legal,
        ketepatan: val.ketepatan,
        status: val.status,
        notes: val.notes,
        id: val.id,
    }));

    const handleEdit = (id) => {
        navigate(`/ketepatan-laporan/${id}/detail`);
    };
    const handleDetail = (row) => {
        setSelectedRow(row);
        setShowApproveModal(true);
    };
    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await ketepatanService.delete(id);
                ToastNotification.success("Profit & Loss berhasil dihapus");
                refetch();
            } catch (err) {
                ToastNotification.error(
                    err.message || "Gagal menghapus Profit & Loss",
                );
            }
        }
    };
    const handleApprove = async (row) => {
        setApproveLoading(true);
        const formData = new FormData();
        formData.append("status", "Approved");
        try {
            const res = await ketepatanService.updateStatus(row.id, formData);
            ToastNotification.success(
                res.message || "Approval Succesfully Done",
            );
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
        const formData = new FormData();
        formData.append("status", "Rejected");
        try {
            const res = await ketepatanService.updateStatus(row.id, "rejected");
            ToastNotification.success(
                res.message || "Approval Succesfully Done",
            );
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
            <Breadcrumbs title="Ketepatan Laporan" items={breadcrumbItems} />
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
                <div className="flex justify-end">
                    <Link to="/ketepatan-laporan/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i class="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) =>
                    ["Waiting", "Revision"].includes(datas.status) &&
                    userRole === "5" ? (
                        <>
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                title="Edit"
                                onClick={() => handleEdit(datas.id)}
                            >
                                <Icon
                                    icon="solar:clapperboard-edit-broken"
                                    width="20"
                                    height="20"
                                />
                            </button>
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                                title="Delete"
                                onClick={() => handleDelete(datas.id)}
                            >
                                <Icon
                                    icon="solar:trash-bin-minimalistic-broken"
                                    width="20"
                                    height="20"
                                />
                            </button>
                        </>
                    ) : ["Waiting"].includes(datas.status) &&
                      userRole === "4" ? (
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
                    ) : (
                        <>
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                title="Edit"
                                onClick={() => handleEdit(datas.id)}
                            >
                                <Icon
                                    icon="solar:clapperboard-edit-broken"
                                    width="20"
                                    height="20"
                                />
                            </button>
                            <button
                                className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                                title="Delete"
                                onClick={() => handleDelete(datas.id)}
                            >
                                <Icon
                                    icon="solar:trash-bin-minimalistic-broken"
                                    width="20"
                                    height="20"
                                />
                            </button>
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
                    )
                }
                page={page}
                length={length}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={handleRowsPerPageChange}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
            <Modal
                isOpen={showApproveModal}
                toggle={() => setShowApproveModal(false)}
            >
                <ModalHeader toggle={() => setShowApproveModal(false)}>
                    Approval Ketepatan Laporan
                </ModalHeader>

                <ModalBody>
                    Apakah Anda yakin untuk melakukan approval pada data
                    berikut?
                    <br />
                    <br />
                    <div
                        style={{
                            backgroundColor: "#e0f7fa",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <div>
                            <strong>Cabang:</strong>{" "}
                            {selectedRow?.cabang || "-"}
                        </div>
                        <div>
                            <strong>Periode:</strong>{" "}
                            {selectedRow?.periode || "-"}
                        </div>
                        <div>
                            <strong>Legal:</strong> {selectedRow?.legal || "-"}
                        </div>
                        <div>
                            <strong>Ketepatan:</strong>{" "}
                            {selectedRow?.ketepatan || "-"}
                        </div>
                        <div>
                            <strong>Notes:</strong> {selectedRow?.notes || "-"}
                        </div>
                        {selectedRow?.file ? (
                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="p-2 w-28 rounded bg-green-50 text-green-700 border border-green-300"
                                    onClick={() =>
                                        window.open(
                                            `${process.env.REACT_APP_IMAGE_URL}${selectedRow.file}`,
                                            "_blank",
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
