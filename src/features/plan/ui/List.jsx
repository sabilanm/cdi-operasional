import {
    Button,
    FormGroup,
    InputGroup,
    InputGroupText,
    Input,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import ToastNotification from "../../../components/common/ToastNotification";
import { PlanService } from "../services/PlanService";

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
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        refetch,
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
        id: val.id,
    }));

    const handleEdit = (id) => {
        navigate(`/profit-loss/${id}/edit`);
    };
    const handleDelete = async (id) => {
        if (window.confirm("Hapus data ini?")) {
            try {
                await PlanService.delete(id);
                ToastNotification.success("Profit & Loss berhasil dihapus");
                refetch();
            } catch (err) {
                ToastNotification.error(
                    err.message || "Gagal menghapus Profit & Loss"
                );
            }
        }
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
                        {/* {["Waiting", "Rejected"].includes(datas.status) ? (
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
                        ) : null} */}
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
        </div>
    );
};

export default Index;
