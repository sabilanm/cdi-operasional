import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useEditRole } from "../hooks/useEditRole";
import AsyncSelect from "../../../components/ui/AsyncSelect";

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
    const {
        data,
        users,
        permissions,
        menu,
        loadMenusOptions,
        loadPermissionsOptions,
        loadUsersOptions,
        handleChange,
        handleMenuChange,
        handleUserChange,
        handlePermissionChange,
        handleSubmit,
    } = useEditRole(id);

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
                    <Radio
                        label="Status"
                        name="status"
                        value={data.status}
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
                    <AsyncSelect
                        label="Selected Users"
                        id="users"
                        isMulti
                        className="mb-3"
                        value={
                            users && users.length > 0
                                ? users.map((r) => ({
                                      value: r.id,
                                      label: r.name,
                                  }))
                                : []
                        }
                        loadOptions={loadUsersOptions}
                        onChange={handleUserChange}
                        placeholder="Pilih Users"
                    />
                    <AsyncSelect
                        label="Selected Permissions"
                        id="permissions"
                        isMulti
                        className="mb-3"
                        value={
                            permissions && permissions.length > 0
                                ? permissions.map((r) => ({
                                      value: r.id,
                                      label: r.name,
                                  }))
                                : []
                        }
                        loadOptions={loadPermissionsOptions}
                        onChange={handlePermissionChange}
                        placeholder="Pilih Permissions"
                    />
                    <AsyncSelect
                        label="Selected Menus"
                        id="menu"
                        isMulti
                        className="mb-3"
                        value={
                            menu && menu.length > 0
                                ? menu.map((r) => ({
                                      value: r.id,
                                      label: r.name,
                                  }))
                                : []
                        }
                        loadOptions={loadMenusOptions}
                        onChange={handleMenuChange}
                        placeholder="Pilih Menus"
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
