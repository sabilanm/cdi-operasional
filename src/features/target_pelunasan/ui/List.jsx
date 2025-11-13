import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useTargetPelunasan } from "../hooks/useList";
import Input from "../../../components/ui/Input";
import { AsyncPaginate } from "react-select-async-paginate";
import Button from "../../../components/ui/Button";
import './../../../assets/css/custom.css'

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Target Pelunasan", to: "/master-kpi/target-pelunasan", active: true },
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
    } = useTargetPelunasan();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const columns = [
        { key: "no", label: "No" },
        { key: "periode", label: "Periode" },
        { key: "range", label: "Range" },
        { key: "bobot", label: "Bobot" },
    ];

    const datas = data.map((val, i) => {
        let range = "-";

        if (val.min_range !== null && val.max_range !== null) {
            range = `${val.min_range}%-${val.max_range}%`;
        } else if (val.min_range !== null && val.max_range === null) {
            range = `>${val.min_range}%`;
        } else if (val.min_range === null && val.max_range !== null) {
            range = `<${val.max_range}%`;
        }

        return {
            no: startRecord + i,
            periode: new Date(val.start_date).toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
            }),
            range,
            bobot: val.bobot ?? 0,
            boh: val.total_boh ?? 0,
        };
    });
    const handleEdit = (id) => {
        navigate(`/users/${id}/edit`);
    };
    const handleDetail = (id) => {
        navigate(`/master-kpi/special-assignment/${id}/detail`);
    };
    const handleCreate = () => {
        navigate(`/master-kpi/target-pelunasan/create`);
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Target Pelunasan" items={breadcrumbItems} />
            <div className="w-full border-separate border-spacing-y-3 mb-3">
                <div className="row">
                    <div className="col">
                        <Input
                            label="Bulan"
                            name="month"
                            value={data.month}
                            // onChange={handleChange}
                            placeholder="Bulan"
                            marginBot="mb-0"
                            marginTop="mt-0"
                            background="bg-month"
                        />
                    </div>
                    <div className="col">
                        <Input
                            label="Tahun"
                            name="year"
                            value={data.year}
                            placeholder="Tahun"
                            marginBot="mb-0"
                            marginTop="mt-0"
                            background="bg-year"
                        />
                    </div>
                        <div className="col d-flex justify-content-end gap-1">
                            <Button
                                type="button"
                                label="Cari"
                                color="#00ACC1"
                                marginBot="mb-0"
                                marginTop="mt-0"
                                />
                        </div>
                        <div className="col d-flex justify-content-end gap-1">
                            <Button
                                type="button"
                                label="Tambah"
                                onClick={() => handleCreate()}
                                color="#00ACC1"
                                marginBot="mb-0"
                                marginTop="mt-0"
                            />
                        </div>
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
