import { Button } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import InputCustom from "../../../components/ui/Input";
import "./../../../assets/css/custom.css";
import Circle from "../../../components/ui/circleChart";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Target Pelunasan", active: true },
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
            <Breadcrumbs title="Target Pelunasan" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3 mb-3 mt-2">
                <div className="col-span-1">
                    <InputCustom
                        label="Start Date"
                        name="startDate"
                        value={data.startDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-start_date"
                    />
                </div>
                <div className="col-span-1">
                    <InputCustom
                        label="End Date"
                        name="endDate"
                        value={data.endDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-3 mb-3 mt-2 items-stretch">
                <div className="col-span-1 h-full flex flex-col gap-3">
                    <div className="w-full relative flex justify-center px-2 sm:px-0">
                        <div
                            className="
            absolute top-3
            border-2 border-[#26C6DA]
            bg-gray-200 text-gray-700 
            text-xs sm:text-sm font-medium 
            px-3 sm:px-5 py-1 
            rounded-full shadow-sm
            text-center
        "
                        >
                            Total Target Pelunasan
                        </div>
                        <div
                            className="
            w-full 
            bg-gray-100 
            border-2 border-[#26C6DA] 
            rounded-2xl sm:rounded-3xl 
            p-4 sm:p-6 
            flex flex-col items-center 
            mt-3 sm:mt-4
            h-full
        "
                        >
                            <h4
                                className="
                text-xl sm:text-2xl md:text-3xl 
                font-semibold text-[#0A2A5C]
                text-center
            "
                            >
                                Rp3.819.372.131
                            </h4>
                        </div>
                    </div>
                    <div className="w-full relative flex justify-center px-2 sm:px-0">
                        <div
                            className="
            absolute top-3
            bg-green-300 text-gray-700 
            text-xs sm:text-sm font-medium 
            px-3 sm:px-5 py-1 
            rounded-full shadow-sm
            text-center
            border-2 border-[#26C6DA]
        "
                        >
                            Realisasi
                        </div>
                        <div
                            className="
            w-full 
            bg-green-100 
            rounded-2xl sm:rounded-3xl 
            p-4 sm:p-6 
            flex flex-col items-center 
            mt-3 sm:mt-4
            border-2 border-[#26C6DA]
            h-full
        "
                        >
                            <h4
                                className="
                text-xl sm:text-2xl md:text-3xl 
                font-semibold text-[#0A2A5C]
                text-center
            "
                            >
                                Rp1.919.372.131
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 h-full">
                    <div
                        className="w-full 
            bg-green-100 
            rounded-2xl sm:rounded-3xl 
            p-4 sm:p-6 
            flex flex-col items-center 
            mt-3 sm:mt-4
            border-2 border-[#26C6DA]"
                    >
                        <label className="text-gray-700 text-center">
                            Persentase
                        </label>
                        <Circle value={53} color="green" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="w-full relative flex justify-center px-2 sm:px-0 h-full">
                        <div
                            className="
                absolute top-3
                bg-blue-300 text-gray-700 
                text-xs sm:text-sm font-medium 
                px-3 sm:px-5 py-1 
                rounded-full shadow-sm
                text-center
                border-2 border-[#26C6DA]
            "
                        >
                            Pelunasan Tertinggi
                        </div>

                        <div
                            className="
                w-full 
                bg-blue-100 
                rounded-2xl sm:rounded-3xl 
                p-4 sm:p-6 
                flex flex-col 
                items-center 
                justify-between
                mt-3
                border-2 border-[#26C6DA]
            "
                        >
                            <div className="flex-1 flex items-center justify-center w-full">
                                <h4
                                    className="
                        text-xl sm:text-2xl md:text-3xl 
                        font-semibold text-[#0A2A5C]
                        text-center
                    "
                                >
                                    Rp1.919.372.131
                                </h4>
                            </div>

                            <label className="text-center pb-1">
                                PT Cobra Dental Makasar
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="w-full relative flex justify-center px-2 sm:px-0 h-full">
                        <div
                            className="
                absolute top-3
                bg-yellow-300 text-gray-700 
                text-xs sm:text-sm font-medium 
                px-3 sm:px-5 py-1 
                rounded-full shadow-sm
                text-center
                border-2 border-[#26C6DA]
            "
                        >
                            Pelunasan Terendah
                        </div>

                        <div
                            className="
                w-full 
                bg-yellow-100 
                rounded-2xl sm:rounded-3xl 
                p-4 sm:p-6 
                flex flex-col 
                items-center 
                justify-between
                mt-3
                border-2 border-[#26C6DA]
            "
                        >
                            <div className="flex-1 flex items-center justify-center w-full">
                                <h4
                                    className="
                        text-xl sm:text-2xl md:text-3xl 
                        font-semibold text-[#0A2A5C]
                        text-center
                    "
                                >
                                    Rp188.445.629
                                </h4>
                            </div>
                            <label className="text-center pb-1">
                                PT Cobra Dental Unair
                            </label>
                        </div>
                    </div>
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
