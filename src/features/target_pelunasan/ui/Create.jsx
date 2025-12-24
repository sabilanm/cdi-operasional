// src/features/jobdesc_admin/ui/Create.jsx
import { useEffect } from "react";
import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { useCreatePelunasan } from "../hooks/useCreatePelunasan";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        {
            label: "Target Pelunasan",
            to: "/master-kpi/target-pelunasan",
            active: false,
        },
        { label: "Create", active: true },
    ];

    const { data, loading, error, handleChange, handleSubmit } =
        useCreatePelunasan();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs
                title="Create Target Pelunasan"
                items={breadcrumbItems}
            />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Target Pelunasan
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-3">
                        <div className="col-span-1">
                            <label className="flex relative z-0 w-full mb-4 group mt-4 mx-4">
                                Periode
                            </label>
                        </div>
                        <div className="col-span-2">
                            <Input
                                label="Tanggal Mulai"
                                name="startDate"
                                value={data?.startDate}
                                onChange={handleChange}
                                placeholder="Tanggal Mulai"
                                type="date"
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                label="Tanggal Selesai"
                                name="endDate"
                                value={data?.endDate}
                                onChange={handleChange}
                                placeholder="Tanggal Selesai"
                                type="date"
                            />
                        </div>
                    </div>
                    {[1, 2, 3, 4].map((num) => (
                        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-3">
                            <div className="col-span-1">
                                <label className="flex relative z-0 w-full mb-4 group mt-4 mx-4">
                                    Range {num}
                                </label>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Bobot"
                                    name={`bobot${num}`}
                                    value={data?.[`bobot${num}`]}
                                    onChange={handleChange}
                                    placeholder="Bobot"
                                    required={false}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Min Range"
                                    name={`minRange${num}`}
                                    value={data?.[`minRange${num}`]}
                                    onChange={handleChange}
                                    placeholder="Min Range"
                                    required={false}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Max Range"
                                    name={`maxRange${num}`}
                                    value={data?.[`maxRange${num}`]}
                                    onChange={handleChange}
                                    placeholder="Max Range"
                                    required={false}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
