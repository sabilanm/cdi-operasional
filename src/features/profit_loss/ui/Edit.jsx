import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useEdit } from "../hooks/useEdit";
import Select from "../../../components/ui/Select";
import { useParams } from "react-router-dom";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Profit & Loss", to: "/profit-loss", active: false },
        { label: "Edit", active: true },
    ];
    const {
        data,
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        handleChange,
        handleMounthChange,
        handleYearChange,
        handleSubmit,
    } = useEdit(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit profit & loss" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Profit & Loss
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Select
                        label="Selected Branch"
                        id="areas"
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
                            name="profitLoss"
                            value={data?.profitLoss}
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
                                    name="persen"
                                    id="persen"
                                    className="
            peer block py-2.5 pl-3 pr-10 w-full text-sm text-gray-800 
            bg-transparent border-2 border-gray-400 rounded-md
            focus:outline-none focus:border-blue-500 
            placeholder-transparent
        "
                                    placeholder="Persentase"
                                    value={data?.persen}
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
                                label="Link Drive"
                                name="link"
                                value={data?.link}
                                onChange={handleChange}
                                placeholder="Link Drive"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
