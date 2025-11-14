import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Button from "../../../components/ui/Button";
import { useEdit } from "../hooks/useEdit";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        {
            label: "Assignment",
            to: "/master-kpi/special-assignment",
            active: false,
        },
        { label: "Edit", active: true },
    ];
    const { data, handleChange, handleFileChange, handleSubmit } = useEdit(id);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Edit Assignment" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Assignment
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        <Input
                            label="Tanggal Mulai"
                            name="start_date"
                            value={data?.start_date}
                            onChange={handleChange}
                            placeholder="Tanggal Mulai"
                            type="date"
                        />
                        <Input
                            label="Tanggal Selesai"
                            name="end_date"
                            value={data?.end_date}
                            onChange={handleChange}
                            placeholder="Tanggal Selesai"
                            type="date"
                        />
                    </div>
                    <InputArea
                        label="Description"
                        name="assignment"
                        value={data?.assignment}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <Input
                                label="File Pendukung"
                                name="file"
                                onChange={handleFileChange}
                                placeholder="File Pendukung"
                                type="file"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Bobot"
                                name="bobot"
                                value={data?.bobot}
                                onChange={handleChange}
                                placeholder="Bobot"
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
