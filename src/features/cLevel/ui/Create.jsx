import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import Radio from "../../../components/ui/Radio";
import Input from "../../../components/ui/Input";
import { useCreateCLevel } from "../hooks/useCreateCLevel";

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
                Create C - Level
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Name C Level"
                        name="name"
                        value={data?.name}
                        onChange={handleChange}
                        placeholder="Name C Level"
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
                    <Radio
                        label="Status"
                        name="status"
                        value={data?.status}
                        onChange={handleChange}
                        options={[
                            {
                                label: "Active",
                                value: "active",
                                activeClass:
                                    "bg-green-300 border-green-500 shadow",
                            },
                            {
                                label: "Inactive",
                                value: "inactive",
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

export default Create;
