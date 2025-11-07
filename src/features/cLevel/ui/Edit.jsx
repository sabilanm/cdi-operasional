import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { useEditCLevel } from "../hooks/useEditCLevel";
import { useParams } from "react-router-dom";
import Input from "../../../components/ui/Input";

const Edit = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Division", to: "/division", active: false },
        { label: "Edit", active: true },
    ];
    const {
        data,
        users,
        availableUsers,
        handleChange,
        handleUsersChange,
        handleSubmit,
    } = useEditCLevel(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit " items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Area
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
                        value={
                            users
                                ? { value: users.value, label: users.label }
                                : null
                        }
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

export default Edit;
