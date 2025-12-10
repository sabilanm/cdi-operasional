// src/features/jobdesc_admin/ui/Create.jsx
import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useCreatePelunasan } from "../hooks/useCreate";
import Select from "../../../components/ui/Select";
import { Icon } from "@iconify/react";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "pelunasan", active: true },
    ];

    const {
        data,
        branch,
        mounth,
        year,
        mounthOptions,
        yearOptions,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleMounthChange,
        handleYearChange,
    } = useCreatePelunasan();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Pelunasan" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Pelunasan
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-3">
                        <div className="col-span-2">
                            <Select
                                label="Selected Branch"
                                id="areas"
                                options={
                                    branch
                                        ? [
                                              {
                                                  value: branch.value,
                                                  label: branch.label,
                                              },
                                          ]
                                        : []
                                }
                                value={
                                    branch
                                        ? {
                                              value: branch.value,
                                              label: branch.label,
                                          }
                                        : null
                                }
                                isDisabled
                                className="mb-3"
                                placeholder="Select Branch"
                            />
                        </div>
                        <div className="col-span-1">
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
                        <div className="col-span-1">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <Input
                            type="text"
                            label="Target Gov"
                            name="gov"
                            onChange={handleChange}
                            placeholder="Target Gov"
                            isRequired
                        />
                        <Input
                            type="text"
                            label="Target Reguler"
                            name="reguler"
                            onChange={handleChange}
                            placeholder="Target Reguler"
                            isRequired
                        />
                        <Input
                            type="text"
                            label="Target Omset"
                            name="omset"
                            onChange={handleChange}
                            placeholder="Target Omset"
                            isRequired
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-3">
                        <div className="col-span-2">
                            <Input
                                type="text"
                                label="Total Target"
                                name="target"
                                onChange={handleChange}
                                placeholder="Total Target"
                                isRequired
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                type="text"
                                label="Realisasi"
                                name="reguler"
                                onChange={handleChange}
                                placeholder="Realisasi"
                                isRequired
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="col-span-2 border-2 border-green-400 rounded-xl p-2 bg-green-50 shadow-sm flex items-center gap-3 mt-4">
                                <Icon
                                    icon="solar:sale-bold"
                                    width="26"
                                    height="26"
                                    className="text-green-600"
                                />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        30 %
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="col-span-2 border-2 border-green-400 rounded-xl p-2 bg-green-50 shadow-sm flex items-center gap-3 mt-4">
                                <Icon
                                    icon="solar:cup-bold-duotone"
                                    width="26"
                                    height="26"
                                    className="text-green-600"
                                />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        30
                                    </p>
                                </div>
                            </div>
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
