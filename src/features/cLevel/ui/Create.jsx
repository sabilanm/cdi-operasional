import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { useCreateCLevel } from "../hooks/useCreateCLevel";
import Input from "../../../components/ui/Input";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Division", to: "/division", active: false },
        { label: "Create", active: true },
    ];
    const {
        data,
        users,
        availableUsers,
        handleChange,
        handleUsersChange,
        handleSubmit,
    } = useCreateCLevel();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Division" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Areas
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Name"
                        name="name"
                        value={data?.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <Select
                        label="Selected Users"
                        id="users"
                        options={availableUsers}
                        value={users?.value}
                        onChange={handleUsersChange}
                        className="mb-3"
                        placeholder="Select Users"
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
