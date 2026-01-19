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
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import gambar from "../../../assets/images/users/user6.png";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Action Plan", active: true },
    ];
    const navigate = useNavigate();
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
        open,
        selectedData,
        setOpen,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleDetail,
    } = useList();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "cabang", label: "Cabang" },
        { key: "user", label: "User" },
        { key: "position", label: "Position" },
        { key: "problems", label: "Problems" },
        { key: "date", label: "Task Date" },
        { key: "status", label: "Status" },
    ];
    const datas = data.map((val, i) => ({
        no: startRecord + i,
        cabang: val.cabang,
        user: val.user_name,
        position: val.position_name,
        problems: val.problems,
        status: val.status,
        date: val.due_date,
        jobdesc: val.jobdesc,
        plans: val.plans,
        id: val.id,
    }));
    const handleEdit = (id) => {
        navigate(`/profit-loss/${id}/edit`);
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Action Plan" items={breadcrumbItems} />
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
                    <Link to="/action-plan/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i class="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) => (
                    <>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => handleDetail(datas)}
                        >
                            <Icon
                                icon="solar:clapperboard-edit-broken"
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
            <Modal isOpen={open} toggle={() => setOpen(false)} size="lg">
                <ModalHeader toggle={() => setOpen(false)}>
                    Action Plan
                </ModalHeader>

                <ModalBody>
                    <div
                        style={{
                            backgroundColor: "#e0f7fa",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <div className="bg-yellow-500 rounded-full border-2 border-blue-500 mb-2">
                            <p className="m-1 text-center">
                                {selectedData?.jobdesc}
                            </p>
                        </div>
                        <p className="text-center mb-2">
                            {selectedData?.problems}
                        </p>
                        <div className="bg-yellow-100 rounded-lg border-2 border-blue-500">
                            <div
                                className="m-3 content-html"
                                dangerouslySetInnerHTML={{
                                    __html: selectedData?.plans,
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4 items-center">
                            <div className="flex items-center gap-1">
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={gambar}
                                    alt="profil"
                                />
                                <span className="py-1 w-full text-center bg-yellow-500 text-sm rounded-full border-2 border-blue-500">
                                    {selectedData?.user}
                                </span>
                            </div>
                            <div className="flex justify-end">
                                <label className="text-gray-600 text-sm">
                                    {selectedData?.date}
                                </label>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    {/* <SubmitButton
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
                    /> */}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
