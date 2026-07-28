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
        handleRowsPerPageChange,
        handleNextPage,
        handleFilter,
        handleClear,
        handlePreviousPage,
        setSearchQuery,
    } = useList();

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
                // showPagination={false}
            />
        </div>
    );
};

export default Index;
