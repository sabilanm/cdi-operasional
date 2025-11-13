import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSpecialAssignment } from "../hooks/useSpecialAssignment";
// import Input from "../../../components/ui/Input";
import { Input, Button } from "reactstrap";
import { AsyncPaginate } from "react-select-async-paginate";
// import Button from "../../../components/ui/Button";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Assignment", to: "/branches", active: true },
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
    } = useSpecialAssignment();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const columns = [
        { key: "no", label: "No" },
        { key: "periode", label: "Periode" },
        { key: "assignment", label: "Assignment" },
        { key: "file", label: "File Pendukung" },
        { key: "bobot", label: "Bobot" },
        { key: "boh", label: "Total BOH" },
    ];

    const datas = data.map((val, i) => ({
        no: startRecord + i,
        periode: new Date(val.start_date).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
        }),
        assignment: val.assignment,
        file: val.file,
        bobot: `${val.bobot} %`,
        boh: val.total_boh,
        id: val.id,
    }));
    const handleEdit = (id) => {
        navigate(`/master-kpi/special-assignment/${id}/edit`);
    };
    const handleDetail = (id) => {
        navigate(`/master-kpi/special-assignment/${id}/detail`);
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Assignment List" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3 mb-3 mt-2">
                <div className="col-span-1">
                    <Input
                        label="Start Date"
                        name="startDate"
                        value={data.startDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        label="End Date"
                        name="endDate"
                        value={data.endDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="col-span-1">
                    <AsyncPaginate
                        // value={
                        //     role && role.id
                        //         ? {
                        //               value: role.id,
                        //               label: role.name,
                        //           }
                        //         : null
                        // }
                        // loadOptions={loadDivisionOptions}
                        // onChange={handleRoleChange}
                        // additional={{ page: 1 }}
                        placeholder="Pilih Role"
                        isClearable
                    />
                </div>
                <Button
                    color="primary"
                    // onClick={handleFilterSubmit}
                    className="flex items-center gap-2 w-20"
                >
                    <Icon icon="solar:magnifer-broken" width="18" height="18" />
                    Cari
                </Button>
                {/* <div className="col-span-1">
                    <Button type="button" label="Cari" color="#00ACC1" />
                </div> */}
            </div>

            {/* Header Table + Tambah Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">
                        {totalRecords} Assignment
                    </label>
                </div>
                <div className="flex justify-end">
                    {/* <Button
                        type="button"
                        label="Tambah"
                        onClick={() => handleCreate()}
                        color="#00ACC1"
                    /> */}
                    <Link to="create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i className="bi bi-plus-lg"></i> Tambah
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
                            title="Detail"
                            onClick={() => handleDetail(datas.id)}
                        >
                            <Icon
                                icon="solar:eye-broken"
                                width="20"
                                height="20"
                            />
                        </button>
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
                            onClick={() => console.log("Delete", datas.id)}
                        >
                            <Icon
                                icon="solar:trash-bin-minimalistic-broken"
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
        </div>
    );
};

export default Index;
