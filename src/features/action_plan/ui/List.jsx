import { Button } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import InputCustom from "../../../components/ui/Input";
import "./../../../assets/css/custom.css";
import gambar from "../../../assets/images/users/user6.png";
import { AsyncPaginate } from "react-select-async-paginate";
import "../../../assets/css/custom.css";
import Cookies from "js-cookie";

const Index = () => {
    const userRole = Cookies.get("operasional_role");
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
        branch,
        loading,
        error,
        performa,
        month,
        year,
        monthOptions,
        yearOptions,
        setMonth,
        setYear,
        loadBranchOptions,
        handleBranchChange,
    } = useList();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "indicator", label: "Indicator" },
        { key: "bobot", label: "Bobot" },
        { key: "target", label: "Target" },
        { key: "actual", label: "Actual" },
        { key: "kpi", label: "KPI Score" },
    ];
    const datas = data.map((val, i) => ({
        no: i + 1,
        indicator: val.indicator,
        bobot: val.bobot + "%",
        target: val.target,
        actual: val.actual,
        kpi: (val.actual / val.target) * val.bobot + "%",
        id: val.id,
    }));

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Action Plan" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-3 mb-3 mt-2">
                <div className="col-span-2">
                    <div className="bg-blue-300 rounded-full">
                        <label className="m-2 font-semibold px-3">
                            C001 - Cab Yogyakarta
                        </label>
                    </div>
                </div>
                <div className="col-span-1">
                    <InputCustom
                        label="Bulan"
                        type="select"
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        marginBot="mb-0"
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
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
                        options={yearOptions}
                        border="border-1"
                    />
                </div>
                {["1", "3", "4"].includes(userRole) && (
                    <div className="col-span-2">
                        <div className="mt-1">
                            <AsyncPaginate
                                placeholder="Pilih Branch"
                                loadOptions={loadBranchOptions}
                                onChange={handleBranchChange}
                                value={
                                    branch
                                        ? {
                                              value: branch.id,
                                              label: branch.name,
                                          }
                                        : null
                                }
                                additional={{ page: 1 }}
                                menuPortalTarget={document.body}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        boxShadow: "none",
                                        "&:hover": { borderColor: "#26C6DA" },
                                    }),
                                    menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                    }),
                                }}
                            />
                        </div>
                    </div>
                )}

                <Button
                    color="primary"
                    // onClick={handleFilterSubmit}
                    className="flex items-center gap-2 w-20"
                >
                    <Icon icon="solar:magnifer-broken" width="18" height="18" />
                    Cari
                </Button>
            </div>
            <div>
                <Tables
                    columns={columns}
                    data={datas}
                    showActions={false}
                    showPagination={false}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-1 mt-2">
                    {/* area for improvement */}
                    <div className="w-full relative flex justify-center px-2 sm:px-0 h-full">
                        <div
                            className="
                                    absolute top-1
                                    bg-yellow-300 text-gray-700 
                                    text-xs sm:text-sm font-medium 
                                    px-3 sm:px-5 py-1 
                                    rounded-full shadow-sm
                                    text-center
                                    border-2 border-[#26C6DA]
                                "
                        >
                            Area for Improvement
                        </div>

                        <div
                            className="
                                    w-full 
                                    bg-yellow-100 
                                    rounded-2xl sm:rounded-3xl 
                                    p-4 sm:p-6
                                    mt-3
                                    border-2 border-[#26C6DA]
                                "
                        >
                            {performa?.min.map((val, i) => (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">
                                        {val.jobdesc}
                                    </span>

                                    <span className="text-blue-600 font-semibold bg-white px-3 py-1 rounded-md border border-blue-200 shadow-sm">
                                        {Math.round(val.poin)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Performance Highlight */}
                    <div className="w-full relative flex justify-center px-2 sm:px-0 h-full">
                        <div
                            className="
                                    absolute top-1
                                    bg-blue-300 text-gray-700 
                                    text-xs sm:text-sm font-medium 
                                    px-3 sm:px-5 py-1 
                                    rounded-full shadow-sm
                                    text-center
                                    border-2 border-[#26C6DA]
                                "
                        >
                            Performance Highlight
                        </div>

                        <div
                            className="
                                    w-full 
                                    bg-blue-100 
                                    rounded-2xl sm:rounded-3xl 
                                    p-4 sm:p-6
                                    mt-3
                                    border-2 border-[#26C6DA]
                                "
                        >
                            {performa?.max.map((val, i) => (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">
                                        {val.jobdesc}
                                    </span>

                                    <span className="text-blue-600 font-semibold bg-white px-3 py-1 rounded-md border border-blue-200 shadow-sm">
                                        {Math.round(val.poin)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Performer Overview */}
                    <div className="w-full relative flex justify-center px-2 sm:px-0 h-full">
                        <div
                            className="
                                    absolute top-1
                                    bg-pink-300 text-gray-700 
                                    text-xs sm:text-sm font-medium 
                                    px-3 sm:px-5 py-1 
                                    rounded-full shadow-sm
                                    text-center
                                    border-2 border-[#26C6DA]
                                "
                        >
                            Performer Overview
                        </div>

                        <div
                            className="
                                    w-full 
                                    bg-pink-100 
                                    rounded-2xl sm:rounded-3xl 
                                    p-4 sm:p-6
                                    mt-3
                                    border-2 border-[#26C6DA]
                                "
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
                                <div className="col-span-1 flex flex-col items-center p-4 rounded-xl">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-yellow-600">
                                        Best
                                    </span>
                                    <img
                                        className="w-14 h-14 rounded-full object-cover shadow-sm"
                                        src={gambar}
                                        alt="gambar"
                                    />
                                    <span className="px-4 py-1 text-center bg-yellow-400 text-xs font-medium rounded-full border border-blue-500 shadow-sm">
                                        Admin Barang
                                    </span>
                                    <span className="text-gray-800 font-semibold text-sm">
                                        Andrea Hinata
                                    </span>
                                </div>
                                <div className="col-span-1 flex flex-col items-center p-4 rounded-xl">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-yellow-600">
                                        Weak
                                    </span>
                                    <img
                                        className="w-14 h-14 rounded-full object-cover shadow-sm"
                                        src={gambar}
                                        alt="gambar"
                                    />
                                    <span className="px-4 py-1 text-center bg-yellow-400 text-xs font-medium rounded-full border border-blue-500 shadow-sm">
                                        Admin Barang
                                    </span>
                                    <span className="text-gray-800 font-semibold text-sm">
                                        Arjuna
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
