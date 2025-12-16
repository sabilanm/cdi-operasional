// src/features/jobdesc_admin/ui/Create.jsx
import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEditPelunasan } from "../hooks/useEdit";
import Select from "../../../components/ui/Select";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const Create = () => {
    const { id } = useParams();
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
        persen,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleMounthChange,
        handleYearChange,
    } = useEditPelunasan(id);

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
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
                        <Input
                            type="text"
                            label="Target Gov"
                            name="gov"
                            value={data?.target_gov}
                            onChange={handleChange}
                            placeholder="Target Gov"
                            isRequired
                        />
                        <Input
                            type="text"
                            label="Target Reguler"
                            name="reguler"
                            value={data?.target_reguler}
                            onChange={handleChange}
                            placeholder="Target Reguler"
                            isRequired
                        />
                        <Input
                            type="text"
                            label="Target Omset"
                            name="omset"
                            value={data?.target_omset}
                            onChange={handleChange}
                            placeholder="Target Omset"
                            isRequired
                        />
                        <Input
                            type="text"
                            label="Realisasi"
                            name="realisasi"
                            value={data?.realisasi}
                            onChange={handleChange}
                            placeholder="Realisasi"
                            isRequired
                        />
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
