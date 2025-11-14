import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import Button from "../../../components/ui/Button";
import { useCreateArea } from "../hooks/useCreateArea";
import Input from "../../../components/ui/Input";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Areas", to: "/areas", active: false },
        { label: "Create", active: true },
    ];
    const {
        data,
        users,
        loadUsersOptions,
        handleChange,
        handleUsersChange,
        handleSubmit,
    } = useCreateArea();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Areas" items={breadcrumbItems} />
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
                    <AsyncSelect
                        label="Selected Users"
                        id="users"
                        className="mb-3"
                        value={
                            users && users.id
                                ? { value: users.id, label: users.name }
                                : null
                        }
                        loadOptions={loadUsersOptions}
                        onChange={handleUsersChange}
                        placeholder="Pilih Users"
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
