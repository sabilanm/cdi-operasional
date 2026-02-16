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
import { useEdit } from "../hooks/useEdit";
import Select from "../../../components/ui/Select";
import InputArea from "../../../components/ui/InputArea";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
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
        data,
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        existingFile,
        loading,
        handleChange,
        handleMounthChange,
        handleYearChange,
        handleFileChange,
        handleSubmit,
    } = useEdit(id);

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
                Edit Ketepatan Laporan
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
                    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-3">
                        <div className="col-span-2">
                            <Select
                                label="Selected Bulan"
                                id="mounth"
                                options={mounthOptions}
                                value={
                                    mounth
                                        ? {
                                              value: mounth.id,
                                              label: mounth.name,
                                          }
                                        : null
                                }
                                onChange={handleMounthChange}
                                className="mb-3"
                                placeholder="Select Bulan"
                            />
                        </div>
                        <div className="col-span-2">
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
                        </div>
                        <div className="col-span-4">
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
                        </div>
                        <div className="col-span-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div className="col-span-1">
                            <InputArea
                                label="Notes"
                                name="notes"
                                value={data?.notes}
                                onChange={handleChange}
                                placeholder="Masukkan deskripsi..."
                            />
                        </div>

                        {/* <div className="col-span-2">
                            <Input
                                type="file"
                                label="Lampiran"
                                name="file"
                                onChange={handleFileChange}
                                placeholder="Lampiran"
                                isRequired
                            />
                        </div> */}
                        <div className="col-span-2 flex items-start gap-3">
                            {existingFile && (
                                <button
                                    type="button"
                                    className="p-2 w-48 mt-6 rounded bg-green-50 text-green-700 border border-green-300"
                                    onClick={() =>
                                        window.open(
                                            `${process.env.REACT_APP_IMAGE_URL}${existingFile}`,
                                            "_blank",
                                        )
                                    }
                                >
                                    Lihat Lampiran
                                </button>
                            )}

                            <Input
                                type="file"
                                label="Lampiran"
                                name="file"
                                onChange={handleFileChange}
                                placeholder="Lampiran"
                                required={false}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            label="Kirim"
                            color="#00ACC1"
                            onClick={handleSubmit}
                        />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Edit;
