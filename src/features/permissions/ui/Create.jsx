import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useCreatePermissions } from "../hooks/useCreatePermissions";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Permissions", to: "/permissions", active: false },
        { label: "Create", active: true },
    ];
    const { data, handleChange, handleSubmit } = useCreatePermissions();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Permissions" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Permissions
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <Input
                        label="Url"
                        name="url"
                        value={data.url}
                        onChange={handleChange}
                        placeholder="url"
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
