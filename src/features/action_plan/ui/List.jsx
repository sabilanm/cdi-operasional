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
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { AsyncPaginate } from "react-select-async-paginate";
import "../../../assets/css/custom.css";

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
        value,
        branch,
        task,
        position,
        plan,
        loading,
        error,
        user,
        Popup,
        performa,
        setPopup,
        loadUserOptions,
        loadBranchOptions,
        loadTaskOptions,
        loadPositionOptions,
        handleUserChange,
        handleBranchChange,
        handleTaskChange,
        handlePositionChange,
        handleChange,
        handleSubmit,
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
    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Action Plan" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-3 mb-3 mt-2">
                <div className="col-span-2">
                    <div className="bg-blue-300 rounded-full">
                        <label className="m-2 font-semibold px-3">
                            C006 - Jakarta
                        </label>
                    </div>
                </div>
                <div className="col-span-1">
                    <InputCustom
                        label="Bulan"
                        type="select"
                        name="month"
                        // value={filters.month}
                        // onChange={handleTempFilterChange}
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
                        options={monthOptions}
                        border="border-1"
                    />
                </div>
                <div className="col-span-2">
                    <div className="mt-1">
                        <AsyncPaginate
                            placeholder="Pilih Branch"
                            // isClearable
                            loadOptions={loadBranchOptions}
                            onChange={handleBranchChange}
                            value={
                                branch && branch.id
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
                <div className="col-span-1">
                    <div className="p-4 bg-green-100 rounded-2xl shadow-md h-full flex flex-col">
                        <div className="mb-3">
                            <h5 className="text-center text-lg font-semibold text-gray-900 md:text-xl">
                                Action Plan
                            </h5>
                        </div>

                        <div className="text-gray-700 flex-1 overflow-y-auto pr-1 mb-3 min-h-[520px] max-h-[520px]">
                            {plan?.map((val, i) => (
                                <div
                                    key={i}
                                    className={`bg-white mb-2 p-3 rounded-lg shadow-sm`}
                                >
                                    <div className="bg-yellow-500 rounded-full border-2 border-blue-500 mb-2">
                                        <p className="m-1 text-center">
                                            {val.jobdesc}
                                        </p>
                                    </div>
                                    <p className="text-center mb-2">
                                        {val.problems}
                                    </p>
                                    <div className="bg-yellow-100 rounded-lg border-2 border-blue-500">
                                        <div
                                            className="m-3 content-html"
                                            dangerouslySetInnerHTML={{
                                                __html: val.plans,
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4 items-center">
                                        <div className="flex items-center gap-1">
                                            <img
                                                className="w-10 h-10 rounded-full object-cover"
                                                src={gambar}
                                                alt="profil"
                                            />
                                            <span className="py-1 w-full text-center bg-yellow-500 text-sm rounded-full border-2 border-blue-500">
                                                {val.user_name}
                                            </span>
                                        </div>
                                        <div className="flex justify-end">
                                            <label className="text-gray-600 text-sm">
                                                {val.due_date}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
            <Modal isOpen={Popup} toggle={() => setPopup(false)} size="xl">
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
                    <AsyncSelect
                        label="Pilih Task"
                        id="task"
                        value={
                            task && task.id
                                ? {
                                      value: task.id,
                                      label: task.name,
                                      data: task.jobdesc,
                                  }
                                : null
                        }
                        loadOptions={loadTaskOptions}
                        onChange={handleTaskChange}
                        className="mb-3"
                        placeholder="Pilih Task"
                        isClearable={false}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        <InputCustom
                            label="Problem"
                            name="problem"
                            value={value.problem}
                            onChange={handleChange}
                            placeholder="Problem"
                            marginBot="mb-0"
                            marginTop="mt-0"
                        />
                        <InputCustom
                            label="Due Date"
                            name="dueDate"
                            value={value.dueDate}
                            type="date"
                            onChange={handleChange}
                            placeholder="Due Date"
                            marginBot="mb-0"
                            marginTop="mt-0"
                        />
                    </div>
                    <InputArea
                        label="Plan"
                        name="plan"
                        value={value.plan}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                </ModalBody>
                <ModalFooter>
                    <SubmitButton
                        label="Tambah"
                        color="primary"
                        onClick={handleSubmit}
                    />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
