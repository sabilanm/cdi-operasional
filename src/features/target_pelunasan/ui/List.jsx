import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useTargetPelunasan } from "../hooks/useList";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import "./../../../assets/css/custom.css";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        {
            label: "Target Pelunasan",
            to: "/master-kpi/target-pelunasan",
            active: true,
        },
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
    const handleEdit = (id) => {
        navigate(`/master-kpi/target-pelunasan/${id}/edit`);
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
            <table className="w-full border-separate [border-spacing-y:6px] text-sm mt-5">
                <thead className="sticky top-0 z-10">
                    <tr className="text-left text-gray-600 shadow bg-[#26C6DA] text-white transition">
                        <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-l-lg">
                            No
                        </th>
                        <th className="p-3 text-center font-bold bg-[#26C6DA]">
                            Periode
                        </th>
                        <th className="p-3 text-center font-bold bg-[#26C6DA]">
                            Rata-Rata
                        </th>
                        <th className="p-3 text-center font-bold bg-[#26C6DA]">
                            Bobot
                        </th>
                        <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-r-lg">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((val, i) =>
                        val.details.map((item, index) => (
                            <tr
                                key={`${i}-${index}`}
                                className="bg-white hover:bg-gray-50 border border-gray-200"
                            >
                                {index === 0 && (
                                    <>
                                        <td
                                            rowSpan={val.details.length}
                                            className="p-3 align-top font-semibold text-gray-700"
                                        >
                                            {i + 1}
                                        </td>
                                        <td
                                            rowSpan={val.details.length}
                                            className="p-3 align-top font-medium text-gray-700"
                                        >
                                            {val.name}
                                        </td>
                                    </>
                                )}

                                <td className="p-3 text-center font-medium text-gray-800">
                                    {item.min_range}-{item.max_range}
                                </td>

                                <td className="p-3 text-center font-semibold text-gray-800">
                                    {item.bobot}
                                </td>

                                {index === 0 && (
                                    <td
                                        rowSpan={val.details.length}
                                        className="p-3 text-center"
                                    >
                                        <button
                                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                            title="Edit"
                                            onClick={() => handleEdit(val.id)}
                                        >
                                            <Icon
                                                icon="solar:clapperboard-edit-broken"
                                                width="20"
                                                height="20"
                                            />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
