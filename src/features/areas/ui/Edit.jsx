import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import Button from "../../../components/ui/Button";
import { useEditArea } from "../hooks/useEditArea";
import { useParams } from "react-router-dom";
import Input from "../../../components/ui/Input";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Areas", to: "/areas", active: false },
        { label: "Edit", active: true },
    ];
    const {
        data,
        users,
        loadUsersOptions,
        handleChange,
        handleUsersChange,
        handleSubmit,
    } = useEditArea(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit Areas" items={breadcrumbItems} />
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
                    <AsyncSelect
                        label="Selected Users"
                        id="users"
                        className="mb-3"
                        value={
                            users && users.value
                                ? { value: users.value, label: users.label }
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
