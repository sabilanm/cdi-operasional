import { CardBody, CardTitle, Form, Spinner } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import SubmitButton from "../../../components/ui/SubmitButton";
import { useCreate } from "../hooks/useCreate";
import Select from "../../../components/ui/Select";
import InputArea from "../../../components/ui/InputArea";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Ketepatan Laporan", to: "/ketepatan-laporan", active: false },
        { label: "Create", active: true },
    ];
    const {
        loading,
        data,
        branch,
        month,
        year,
        monthOptions,
        yearOptions,
        handleChange,
        handleMonthChange,
        handleYearChange,
        handleFileChange,
        handleSubmit,
    } = useCreate();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs
                title="Create Ketepatan Laporan"
                items={breadcrumbItems}
            />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Ketepatan Laporan
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
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                <Select
                                    label="Selected Bulan"
                                    id="mounth"
                                    options={monthOptions}
                                    value={
                                        month
                                            ? {
                                                  value: month.id,
                                                  label: month.name,
                                              }
                                            : null
                                    }
                                    onChange={handleMonthChange}
                                    className="mb-3"
                                    placeholder="Select Bulan"
                                />
                                <Select
                                    label="Selected Tahun"
                                    id="year"
                                    options={yearOptions}
                                    value={
                                        year
                                            ? {
                                                  value: year.id,
                                                  label: year.name,
                                              }
                                            : null
                                    }
                                    onChange={handleYearChange}
                                    className="mb-3"
                                    placeholder="Select Tahun"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                <Radio
                                    label="Legal"
                                    name="legal"
                                    value={data?.legal}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            label: "Sesuai Dateline",
                                            value: "3",
                                            activeClass:
                                                "bg-green-300 border-green-500 shadow",
                                        },
                                        {
                                            label: "Dateline > 1-5 hari",
                                            value: "2",
                                            activeClass:
                                                "bg-yellow-300 border-yellow-500 shadow",
                                        },
                                        {
                                            label: "Dateline (> 5 hari)",
                                            value: "1",
                                            activeClass:
                                                "bg-red-300 border-red-500 shadow",
                                        },
                                    ]}
                                />
                                <Radio
                                    label="Ketepatan"
                                    name="ketepatan"
                                    value={data?.ketepatan}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            label: "Sesuai Datelina",
                                            value: "3",
                                            activeClass:
                                                "bg-green-300 border-green-500 shadow",
                                        },
                                        {
                                            label: "Dikirim H+1",
                                            value: "2",
                                            activeClass:
                                                "bg-yellow-300 border-yellow-500 shadow",
                                        },
                                        {
                                            label: "Dikirim > H+1",
                                            value: "1",
                                            activeClass:
                                                "bg-red-300 border-red-500 shadow",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <InputArea
                                label="Description"
                                name="description"
                                value={data?.description}
                                onChange={handleChange}
                                placeholder="Masukkan deskripsi..."
                            />
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
                            // label="Kirim"
                            label={loading ? <Spinner size="sm" /> : "Kirim"}
                            color="#00ACC1"
                            disabled={loading}
                            onClick={handleSubmit}
                        />
                    </div>
                </Form>
            </CardBody>
            {/* <Modal
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
            </Modal> */}
        </div>
    );
};

export default Create;
