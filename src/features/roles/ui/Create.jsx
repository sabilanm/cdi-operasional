import { CardBody, CardTitle, Form } from "reactstrap";
import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";

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
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [menu, setMenu] = useState([]);
    const [data, setData] = useState({
        name: "",
        status: "active",
    });
    const availableUsers = [
        { value: 1, label: "Bila" },
        { value: 2, label: "Siti" },
        { value: 3, label: "Pebble" },
    ];
    const availablePermission = [
        { value: 1, label: "aaa" },
        { value: 2, label: "bbb" },
        { value: 3, label: "ccc" },
    ];
    const availableMenu = [
        { value: 1, label: "111" },
        { value: 2, label: "222" },
        { value: 3, label: "333" },
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleUserChange = (selectedOptions) => {
        const updatedUsers = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setUsers(updatedUsers);
    };
    const handlePermissionChange = (selectedOptions) => {
        const updatedPermission = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setPermissions(updatedPermission);
    };
    const handleMenuChange = (selectedOptions) => {
        const updatedMenu = selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
        }));
        setMenu(updatedMenu);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            name: data.name,
            status: data.status,
            users: users.map((user) => user.id),
            permissions: permissions.map((permission) => permission.id),
            menus: menu.map((menu) => menu.id),
        };
        console.log("kirim", postData);
    };
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
