import { useState } from "react";
import {
    Button,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    ModalFooter,
} from "reactstrap";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import InputCustom from "../../../components/ui/Input";
import { useScoreboardList } from "../hooks/useScoreboardList";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { useNavigate } from "react-router-dom";
import "./../../../assets/css/custom.css";
import Cookies from "js-cookie";
import SubmitButton from "../../../components/ui/SubmitButton";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Scoreboards", to: "", active: true },
    ];

    const userRole = Cookies.get("operasional_role");
    // ===== HOOK =====
    const {
        data,
        loading,
        page,
        length,
        totalRecords,
        rowsPerPageOptions,
        filters,
        showModal,
        downloadLoading,
        yearExport,
        monthExport,
        setYearExport,
        setMonthExport,
        setShowModal,
        yearOptions,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        handleTempFilterChange,
        handleFilterSubmit,
        branch,
        loadBranchOptions,
        handleBranchChange,
        handleExport,
    } = useScoreboardList();

    // ===== STATE MODAL =====
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showApproveModal, setShowApproveModal] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleDetail = (id, month) => {
        navigate(`${id}/detail?month=${month}`);
    };

    // ===== COLUMNS =====
    const mainColumns = [
        { key: "no", label: "No" },
        { key: "name", label: "Nama" },
        { key: "month", label: "Periode" },
        { key: "ketepatan", label: "Ketepatan" },
        { key: "validitas", label: "Validitas" },
        { key: "scoreboard", label: "Scoreboard" },
        { key: "total_score", label: "Total Score" },
    ];

    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const mappedData = data.map((val, i) => ({
        ...val,
        no: page * length + i + 1,
        file: val.file,
    }));

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Scoreboards" items={breadcrumbItems} />

            {/* ===== FILTER ===== */}
            <FormGroup
                className="mt-3 row gap-2"
                style={{ padding: "0px 0px" }}
            >
                <div className="col">
                    <InputCustom
                        label="Bulan"
                        type="select"
                        name="month"
                        value={filters.month}
                        onChange={handleTempFilterChange}
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
                        options={monthOptions}
                        border="border-1"
                    />
                </div>
                <div className="col">
                    <AsyncSelect
                        // label="Filter Cabang"
                        id="branch_filter"
                        value={branch || null}
                        loadOptions={loadBranchOptions}
                        onChange={handleBranchChange}
                        placeholder="Pilih Cabang"
                        marginTop="m-0"
                        border="border-0"
                    />
                </div>
                <div className="col flex flex-span gap-2">
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
                    {(userRole === "4" || userRole === "1") && (
                        <Button
                            color="primary"
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2"
                        >
                            Export
                        </Button>
                    )}
                </div>
            </FormGroup>

            {/* ===== HEADER ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">
                        {totalRecords} Activities
                    </label>
                </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                    <Tables
                        columns={mainColumns}
                        data={mappedData}
                        renderActions={(datas) => (
                            <>
                                <button
                                    className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                    title="Detail"
                                    onClick={() =>
                                        handleDetail(datas.id, filters.month)
                                    }
                                >
                                    <Icon
                                        icon="solar:eye-broken"
                                        width="20"
                                        height="20"
                                    />
                                </button>
                            </>
                        )}
                        page={page}
                        length={length}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={rowsPerPageOptions}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        loading={loading}
                    />
                </div>
            </div>

            {/* ===== MODALS ===== */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Admin Barang</ModalHeader>
                <ModalBody>{/* Isi modal sesuai kebutuhan */}</ModalBody>
            </Modal>

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
            </Modal>

            {/* modal donwload */}
            <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>
                    Download Final Scoreboard
                </ModalHeader>
                <ModalBody>
                    <div className="col-span-1">
                        <InputCustom
                            label="Bulan"
                            type="select"
                            name="month"
                            value={monthExport}
                            onChange={(e) => setMonthExport(e.target.value)}
                            marginBot="mb-3"
                            marginTop="mt-0"
                            background="bg-end_date"
                            options={monthOptions}
                            border="border-1"
                        />
                    </div>
                    <div className="col-span-1">
                        <InputCustom
                            label="Tahun"
                            type="select"
                            name="year"
                            value={yearExport}
                            onChange={(e) => setYearExport(e.target.value)}
                            marginBot="mb-3"
                            marginTop="mt-0"
                            background="bg-end_date"
                            options={yearOptions}
                            border="border-1"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton
                        label="Unduh"
                        loading={downloadLoading}
                        onClick={handleExport}
                    />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
