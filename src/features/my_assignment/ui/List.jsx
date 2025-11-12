import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSpecialAssignment } from "../hooks/useSpecialAssignment";
import Input from "../../../components/ui/Input";
import { AsyncPaginate } from "react-select-async-paginate";
import Button from "../../../components/ui/Button";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Branches", to: "/branches", active: true },
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
        { key: "status", label: "Status" },
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
        status: val.status,
    }));
    const handleEdit = (id) => {
        navigate(`/users/${id}/edit`);
    };
    const handleDetail = (id) => {
        navigate(`/master-kpi/special-assignment/${id}/detail`);
    };
    const handleCreate = () => {
        // console.log("tambah");
        navigate(`/master-kpi/special-assignment/create`);
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Branches List" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3">
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
                <div className="col-span-1">
                    <Button type="button" label="Cari" color="#00ACC1" />
                </div>
                <div className="col-span-1">
                    <Button
                        type="button"
                        label="Tambah"
                        onClick={() => handleCreate()}
                        color="#00ACC1"
                    />
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
                            onClick={() => handleDetail(datas.userid)}
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
                            onClick={() => handleEdit(datas.userid)}
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
                            onClick={() => console.log("Delete", datas.userid)}
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
