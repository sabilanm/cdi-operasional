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
        { label: "Roles", to: "/roles", active: true },
    ];
    const { data, handleChange, handleSubmit } = useEdit(id);
    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Users
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        <Input
                            label="Tanggal Mulai"
                            name="startDate"
                            value={data?.startDate}
                            onChange={handleChange}
                            placeholder="Tanggal Mulai"
                            type="date"
                        />
                        <Input
                            label="Tanggal Selesai"
                            name="endDate"
                            value={data?.endDate}
                            onChange={handleChange}
                            placeholder="Tanggal Selesai"
                            type="date"
                        />
                    </div>
                    <InputArea
                        label="Description"
                        name="description"
                        value={data?.description}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <Input
                                label="File Pendukung"
                                name="file"
                                value={data?.file}
                                onChange={handleChange}
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
