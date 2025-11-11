// src/features/jobdesc_admin/ui/Create.jsx
import { useEffect } from "react";
import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { useCreateJobdesc } from "../hooks/useCreateJobdesc";

const Create = () => {
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Jobdesc", to: "/master-kpi/jobdescs", active: false },
        { label: "Create", active: true },
    ];

    const {
        data,
        position,
        handleChange,
        handleSubmit,
        loadPositionsOptions,
        handlePositionChange,
    } = useCreateJobdesc();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Jobdesc" items={breadcrumbItems} />
            <CardTitle tag="h6" className="text-center text-3xl font-weight-bold mb-5">
                Create Jobdesc
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Jobdesc"
                        name="jobdesc"
                        value={data.jobdesc}
                        onChange={handleChange}
                        placeholder="Jobdesc"
                    />
                    <InputArea
                        label="Description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                    <Input
                        label="Koefisien"
                        name="koefisien"
                        value={data.koefisien}
                        onChange={handleChange}
                        placeholder="Koefisien"
                    />
                    <Input
                        label="Repetition"
                        name="repetition"
                        value={data.repetition || ""}
                        onChange={handleChange}
                        placeholder="Repetition"
                        required={false}
                    />
                    <AsyncSelect
                        label="Select Position"
                        id="position_id"
                        isMulti={false} // single select
                        value={position ? { value: position.id, label: position.name } : null}
                        loadOptions={loadPositionsOptions}
                        onChange={handlePositionChange}
                        placeholder="Pilih Position"
                    />
                    <Radio
                        label="Methode"
                        name="methode"
                        value={data.methode}
                        onChange={handleChange}
                        options={[
                            { label: "Manual", value: "Manual", activeClass: "bg-green-300 border-green-500 shadow" },
                            { label: "Sistem", value: "Sistem", activeClass: "bg-blue-300 border-blue-500 shadow" },
                            { label: "Mix", value: "Mix", activeClass: "bg-red-300 border-red-500 shadow" },
                        ]}
                    />
                    <Radio
                        label="Type"
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        options={[
                            { label: "Daily", value: "daily", activeClass: "bg-green-300 border-green-500 shadow" },
                            { label: "Weekly", value: "weekly", activeClass: "bg-blue-300 border-blue-500 shadow" },
                            { label: "Monthly", value: "monthly", activeClass: "bg-red-300 border-red-500 shadow" },
                        ]}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
