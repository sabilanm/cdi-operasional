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

    const handleEdit = (id) => {
        navigate(`/profit-loss/${id}/edit`);
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
                                    // onClick={() => handleDetail(row)}
                                >
                                    <Icon
                                        icon="solar:check-circle-linear"
                                        width="30"
                                        height="30"
                                    />
                                </button>
                                <button
                                    className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                                    // onClick={() => handleDetail(row)}
                                >
                                    <Icon
                                        icon="solar:close-circle-linear"
                                        width="30"
                                        height="30"
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
        </div>
    );
};

export default Index;
