import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEditBranch } from "../hooks/useEditBranch";

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
    const { data, handleChange, handleSubmit } = useEditBranch(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Roles
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
                        label="code"
                        name="code"
                        value={data.code}
                        onChange={handleChange}
                        placeholder="code"
                    />
                    <Input
                        label="zone"
                        name="zone"
                        value={data.zone}
                        onChange={handleChange}
                        placeholder="zone"
                    />
                    <Input
                        label="address"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        placeholder="address"
                    />
                    <Input
                        label="address_details"
                        name="address_details"
                        value={data.address_details}
                        onChange={handleChange}
                        placeholder="address_details"
                    />
                    <Input
                        label="postal_code"
                        name="postal_code"
                        value={data.postal_code}
                        onChange={handleChange}
                        placeholder="postal_code"
                    />
                    <Input
                        label="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="phone"
                    />
                    <Input
                        label="fax"
                        name="fax"
                        value={data.fax}
                        onChange={handleChange}
                        placeholder="fax"
                    />
                    <Input
                        label="npwp"
                        name="npwp"
                        value={data.npwp}
                        onChange={handleChange}
                        placeholder="npwp"
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
