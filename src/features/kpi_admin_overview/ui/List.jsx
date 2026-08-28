import {
    FormGroup,
    InputGroup,
    Input,
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
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import Cookies from "js-cookie";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "KPI", active: true },
    ];
    const navigate = useNavigate();
    const {
        data,
        loading,
        error,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        startRecord,
        branch,
        showModal,
        downloadLoading,
        monthOptions,
        yearOptions,
        localMonth,
        localYear,
        setLocalMonth,
        setLocalYear,
        handleBranchChange,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleFilter,
        handleClear,
        handleExport,
        setShowModal,
        loadBranchOptions,
    } = useList();

    const userRole = Cookies.get("operasional_role");
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "branch", label: "Branch" },
        { key: "periode", label: "Periode" },
    ];
    const datas = data.map((val, i) => ({
        no: startRecord + i,
        branch: val.branch_name,
        periode: val.periode,
        id: val.branch_id,
    }));
    // console.log(data);

    const handleDetail = (id, date) => {
        const periode = date.slice(0, 7);
        navigate(`/overview/${id}/detail`, {
            state: periode,
        });
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Overview KPI Admin" items={breadcrumbItems} />
            <div className="flex justify-start items-stretch gap-3 mb-2">
                <FormGroup className="mb-0">
                    <InputGroup className="w-96 h-12">
                        <Input
                            className="h-full w-full border rounded-md px-3"
                            placeholder="Nama Cabang"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </FormGroup>
                <button
                    type="button"
                    onClick={() => handleFilter()}
                    className="bg-blue-500 text-white h-12 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Cari
                </button>
                <button
                    type="button"
                    onClick={() => handleClear()}
                    className="bg-blue-500 text-white h-12 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <Icon icon="tabler:reload" width="20" height="20" />
                </button>
                {(userRole === "4" || userRole === "1") && (
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white h-12 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Export
                    </button>
                )}
            </div>

            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) => (
                    <>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() =>
                                handleDetail(datas.id, datas.periode)
                            }
                        >
                            <Icon
                                icon="solar:eye-outline"
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
            />

            <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                <ModalHeader toggle={() => setShowModal(false)}>
                    Download KPI Admin
                </ModalHeader>
                <ModalBody>
                    <div className="col-span-1">
                        <InputCustom
                            label="Bulan"
                            type="select"
                            name="month"
                            value={localMonth}
                            onChange={(e) => setLocalMonth(e.target.value)}
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
                            value={localYear}
                            onChange={(e) => setLocalYear(e.target.value)}
                            marginBot="mb-3"
                            marginTop="mt-0"
                            background="bg-end_date"
                            options={yearOptions}
                            border="border-1"
                        />
                    </div>
                    <AsyncSelect
                        label="Selected Branch"
                        id="branch_id"
                        value={
                            branch && branch.id
                                ? {
                                      value: branch.id,
                                      label: branch.name,
                                  }
                                : null
                        }
                        loadOptions={loadBranchOptions}
                        onChange={handleBranchChange}
                        className="mb-3"
                        placeholder="Select Branch"
                        isClearable={false}
                    />
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
