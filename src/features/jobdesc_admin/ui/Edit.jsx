import { useEffect } from "react";
import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useEditJobdesc } from "../hooks/useEditJobdesc";
import AsyncSelect from "../../../components/ui/AsyncSelect";

const Edit = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Jobdesc", to: "/master-kpi/jobdescs", active: false },
        { label: "Edit", active: true },
    ];

    const {
        data,
        position,
        handleChange,
        handleSubmit,
        loadPositionsOptions,
        handlePositionChange,
    } = useEditJobdesc(id);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Edit Jobdesc" items={breadcrumbItems} />
            <CardTitle tag="h6" className="text-center text-3xl font-weight-bold mb-5">
                Edit Jobdescs
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
                        label="Selected Position"
                        id="position_id"
                        isMulti={false} // single select
                        value={position ? { value: position.id, label: position.name } : null}
                        loadOptions={loadPositionsOptions} // dari hook
                        onChange={handlePositionChange} // dari hook
                        placeholder="Pilih Position"
                    />
                    <Radio
                        label="Methode"
                        name="methode"
                        value={data.methode}
                        onChange={handleChange}
                        options={[
                            {
                                label: "Manual",
                                value: "Manual",
                                activeClass:
                                    "bg-green-300 border-green-500 shadow",
                            },
                            {
                                label: "Sistem",
                                value: "Sistem",
                                activeClass: "bg-blue-300 border-blue-500 shadow",
                            },
                            {
                                label: "Mix",
                                value: "Mix",
                                activeClass: "bg-red-300 border-red-500 shadow",
                            },
                        ]}
                    />
                    <Radio
                        label="Type"
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        options={[
                            {
                                label: "Daily",
                                value: "daily",
                                activeClass:
                                    "bg-green-300 border-green-500 shadow",
                            },
                            {
                                label: "Weekly",
                                value: "weekly",
                                activeClass: "bg-blue-300 border-blue-500 shadow",
                            },
                            {
                                label: "Monthly",
                                value: "monthly",
                                activeClass: "bg-red-300 border-red-500 shadow",
                            },
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

export default Edit;
