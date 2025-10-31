import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Row,
    Col,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";

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
    const [data, setData] = useState({
        name: "",
        status: "active",
    });
    const availableUsers = [
        { value: 1, label: "Bila" },
        { value: 2, label: "Siti" },
        { value: 3, label: "Pebble" },
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("kirim");
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
                        label="Pilih User"
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
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
