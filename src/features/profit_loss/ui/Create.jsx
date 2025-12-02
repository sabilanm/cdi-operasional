import {
    CardBody,
    CardTitle,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import SubmitButton from "../../../components/ui/SubmitButton";
import { useCreate } from "../hooks/useCreate";
import Select from "../../../components/ui/Select";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Profit & Loss", to: "/profit-loss", active: false },
        { label: "Create", active: true },
    ];
    const {
        data,
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        showConfirm,
        submitting,
        handleChange,
        handleMounthChange,
        handleYearChange,
        handleFileChange,
        openConfirm,
        setShowConfirm,
        handleSubmit,
    } = useCreate();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create profit & loss" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Profit & Loss
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Select
                        label="Selected Branch"
                        id="areas"
                        options={
                            branch
                                ? [{ value: branch.value, label: branch.label }]
                                : []
                        }
                        value={
                            branch
                                ? { value: branch.value, label: branch.label }
                                : null
                        }
                        isDisabled
                        className="mb-3"
                        placeholder="Select Branch"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <Select
                            label="Selected Bulan"
                            id="mounth"
                            options={mounthOptions}
                            value={
                                mounth
                                    ? { value: mounth.id, label: mounth.name }
                                    : null
                            }
                            onChange={handleMounthChange}
                            className="mb-3"
                            placeholder="Select Bulan"
                        />
                        <Select
                            label="Selected Tahun"
                            id="year"
                            options={yearOptions}
                            value={
                                year
                                    ? { value: year.id, label: year.name }
                                    : null
                            }
                            onChange={handleYearChange}
                            className="mb-3"
                            placeholder="Select Tahun"
                        />
                        <Radio
                            label="Profit & Loss"
                            name="pnl"
                            value={data?.pnl}
                            onChange={handleChange}
                            options={[
                                {
                                    label: "Profit",
                                    value: "profit",
                                    activeClass:
                                        "bg-green-300 border-green-500 shadow",
                                },
                                {
                                    label: "Loss",
                                    value: "loss",
                                    activeClass:
                                        "bg-red-300 border-red-500 shadow",
                                },
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <div className="relative z-0 w-full mt-4 mb-4 group">
                                {/* INPUT */}
                                <input
                                    type="text"
                                    name="persentase"
                                    id="persentase"
                                    className="
            peer block py-2.5 pl-3 pr-10 w-full text-sm text-gray-800 
            bg-transparent border-2 border-gray-400 rounded-md
            focus:outline-none focus:border-blue-500 
            placeholder-transparent
        "
                                    placeholder="Persentase"
                                    value={data?.persentase}
                                    onChange={handleChange}
                                    required
                                />

                                {/* LABEL */}
                                <label
                                    htmlFor="persen"
                                    className="
            absolute text-sm text-gray-500 duration-300 transform
            -translate-y-6 scale-75 top-3 left-3 bg-white px-1
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:left-3
            peer-focus:top-3
            peer-focus:scale-75
            peer-focus:-translate-y-6
            peer-focus:text-blue-500
        "
                                >
                                    Persentase
                                </label>

                                {/* BUTTON % */}
                                <button
                                    type="button"
                                    className="
            absolute right-0 top-0 h-full px-4 flex items-center justify-center
            text-sm text-gray-700 bg-gray-100 border-l border-gray-300
            hover:bg-gray-200 transition rounded-r-md
        "
                                >
                                    %
                                </button>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Input
                                type="file"
                                label="Lampiran"
                                name="file"
                                onChange={handleFileChange}
                                placeholder="Lampiran"
                                isRequired
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            label="Kirim"
                            color="#00ACC1"
                            onClick={openConfirm}
                        />
                    </div>
                </Form>
            </CardBody>
            <Modal
                isOpen={showConfirm}
                toggle={() => setShowConfirm(false)}
                centered
            >
                <ModalHeader
                    toggle={() => setShowConfirm(false)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                >
                    Konfirmasi Create Profit & Loss
                </ModalHeader>
                <ModalBody className="p-4">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-4 rounded-xl shadow-inner border border-teal-200">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Cabang:
                                </span>
                                <span className="text-gray-800">
                                    {branch?.label || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Bulan:
                                </span>
                                <span className="text-gray-800">
                                    {mounth?.name || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Tahun:
                                </span>
                                <span className="text-gray-800">
                                    {year?.name || year?.id || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    P/L:
                                </span>
                                <span
                                    className={`font-medium ${
                                        data?.pnl === "profit"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {data?.pnl || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    Persentase:
                                </span>
                                <span className="text-gray-800">
                                    {data?.persentase
                                        ? `${data.persentase}%`
                                        : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">
                                    File:
                                </span>
                                <span
                                    className="text-gray-800 truncate max-w-[200px]"
                                    title={data?.file?.name}
                                >
                                    {data?.file?.name || "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-gray-50 rounded-b-xl">
                    <Button
                        type="button"
                        label="Batal"
                        color="#9AA0A6"
                        onClick={() => setShowConfirm(false)}
                        className="hover:opacity-90 transition-opacity"
                    />
                    <SubmitButton
                        onClick={handleSubmit}
                        loading={submitting}
                        label="OK"
                        color="primary"
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white"
                    />
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Create;
