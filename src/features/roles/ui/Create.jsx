import { CardBody, CardTitle, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useCreateRole } from "../hooks/useCreateRole";

const Create = () => {
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
        availableMenu,
        availableUsers,
        availablePermission,
        handleChange,
        handleMenuChange,
        handleUserChange,
        handlePermissionChange,
        handleSubmit,
    } = useCreateRole();
    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Roles
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
                    <Select
                        label="Selected Users"
                        id="users"
                        options={availableUsers}
                        value={users.map((user) => ({
                            value: user.id,
                            label: user.name,
                        }))}
                        onChange={handleUserChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select user"
                    />
                    <Select
                        label="Selected Permissions"
                        id="permissions"
                        options={availablePermission}
                        value={permissions.map((user) => ({
                            value: user.id,
                            label: user.name,
                        }))}
                        onChange={handlePermissionChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select user"
                    />
                    <Select
                        label="Selected Menu"
                        id="menus"
                        options={availableMenu}
                        value={menu.map((user) => ({
                            value: user.id,
                            label: user.name,
                        }))}
                        onChange={handleMenuChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select user"
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
