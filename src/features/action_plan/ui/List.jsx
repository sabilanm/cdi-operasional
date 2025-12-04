import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import InputCustom from "../../../components/ui/Input";
import "./../../../assets/css/custom.css";
import gambar from "../../../assets/images/users/user6.png";
import SubmitButton from "../../../components/ui/SubmitButton";
import InputArea from "../../../components/ui/InputArea";
import { useState } from "react";
import AsyncSelect from "../../../components/ui/AsyncSelect";

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
    const [Popup, setPopup] = useState(false);
    const {
        data,
        plan,
        loading,
        error,
        user,
        loadUserOptions,
        handleUserChange,
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
        bobot: val.bobot,
        target: val.target,
        actual: val.actual,
        kpi: val.kpiScore,
        id: val.id,
    }));
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
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-3 mt-2">
                <div className="col-span-3">
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
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">
                                        Pengantaran barang ke ekspedisi
                                    </span>

                                    <span className="text-blue-600 font-semibold bg-white px-3 py-1 rounded-md border border-blue-200 shadow-sm">
                                        0,70
                                    </span>
                                </div>
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
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">
                                        Kartu stok
                                    </span>

                                    <span className="text-blue-600 font-semibold bg-white px-3 py-1 rounded-md border border-blue-200 shadow-sm">
                                        2,00
                                    </span>
                                </div>
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
                <div className="col-span-1">
                    <div className="p-4 bg-green-100 rounded-2xl shadow-md h-full flex flex-col">
                        <div className="mb-3">
                            <h5 className="text-center text-lg font-semibold text-gray-900 md:text-xl">
                                Action Plan
                            </h5>
                        </div>

                        <div className="text-gray-700 flex-1 overflow-y-auto pr-1 mb-3 min-h-[520px] max-h-[520px]">
                            <div
                                className={`bg-white mb-2 p-3 rounded-lg shadow-sm`}
                            >
                                <div className="bg-yellow-500 rounded-full border-2 border-blue-500 mb-2">
                                    <p className="m-1 text-center">
                                        Cash Opname Harian
                                    </p>
                                </div>
                                <p className="text-center mb-2">
                                    Proses cash opname tidak konsisten setiap
                                    hari, sering terlambat
                                </p>
                                <div className="bg-yellow-100 rounded-lg border-2 border-blue-500">
                                    <p className="m-3">
                                        Membuat checklist harian di awal shift.
                                        Menentukan PIC yang berbeda tiap minggu
                                        untuk memastikan rotasi tanggung jawab.
                                        Laporan opname difoto & dikirim via grup
                                        WA internal.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4 items-center">
                                    <div className="flex items-center gap-1">
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={gambar}
                                            alt="profil"
                                        />
                                        <span className="py-1 w-full text-center bg-yellow-500 text-sm rounded-full border-2 border-blue-500">
                                            Admin Barang
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <label className="text-gray-600 text-sm">
                                            31 Oktober 2025
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-2 border-t border-gray-200 flex justify-end">
                            <button
                                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-500 bg-blue-50 text-2xl text-blue-600 font-bold hover:shadow-md hover:bg-blue-100 hover:scale-105 active:scale-95 transition-all duration-200"
                                title="Tambah"
                                onClick={() => setPopup(true)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={Popup} toggle={() => setPopup(false)}>
                <ModalHeader toggle={() => setPopup(false)}>
                    Action Plan
                </ModalHeader>
                <ModalBody>
                    <AsyncSelect
                        label="Pilih User"
                        id="user"
                        value={
                            user && user.id
                                ? {
                                      value: user.id,
                                      label: user.name,
                                  }
                                : null
                        }
                        loadOptions={loadUserOptions}
                        onChange={handleUserChange}
                        className="mb-3"
                        placeholder="Pilih User"
                        isClearable={false}
                    />
                    <InputCustom
                        label="Problem"
                        name="problem"
                        value={data.problem}
                        // onChange={handleChange}
                        placeholder="Problem"
                        marginBot="mb-0"
                        marginTop="mt-0"
                    />
                    <InputArea
                        label="Plan"
                        name="plan"
                        value={data?.plan}
                        // onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                    <InputCustom
                        label="Due Date"
                        name="dueDate"
                        value={data.dueDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Due Date"
                        marginBot="mb-0"
                        marginTop="mt-0"
                    />
                </ModalBody>
                <ModalFooter>
                    <SubmitButton label="Kirim" color="primary" />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
