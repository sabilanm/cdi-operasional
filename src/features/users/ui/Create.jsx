import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Row,
    Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useCreateUsers } from "../hooks/useCreateUsers";
import AsyncSelect from "../../../components/ui/AsyncSelect";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Users", to: "/users", active: false },
        { label: "Create", active: true },
    ];
    const {
        data,
        position,
        division,
        branch,
        role,
        availableDivision,
        availablePosition,
        availableBranch,
        handlePositionChange,
        handleDivisionChange,
        handleBranchChange,
        handleRoleChange,
        handleChange,
        handleImageChange,
        handleSubmit,
        loadPositionOptions,
        loadDivisionOptions,
        loadBranchOptions,
        loadRoleOptions,
    } = useCreateUsers();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Users" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Users
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Row className="mx-1  mt-4">
                        <Col md="4">
                            <div className="d-flex align-items-center justify-content-center p-2 position-relative mb-2">
                                <div className="position-relative">
                                    {data?.image ? (
                                        <img
                                            src={URL.createObjectURL(
                                                data?.image
                                            )}
                                            className="rounded-circle"
                                            alt="avatar"
                                            width="125"
                                            height="125"
                                            padding="10px"
                                        />
                                    ) : (
                                        <div
                                            className="rounded-circle border-2 border-[#C5D6E5] bg-[#F5FAFF] d-flex align-items-center justify-content-center"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                            }}
                                        >
                                            <i
                                                className="bi bi-person"
                                                style={{
                                                    fontSize: "50px",
                                                    color: "#C5D6E5",
                                                }}
                                            ></i>
                                        </div>
                                    )}
                                    <label
                                        className="camera-icon position-absolute"
                                        style={{
                                            top: "5px",
                                            right: "5px",
                                            backgroundColor: "#bfa890",
                                            color: "#ffffff",
                                            borderRadius: "50%",
                                            padding: "0px 4px 0px 4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <i className="bi bi-camera"></i>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                        />
                                    </label>
                                </div>
                            </div>
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
                                        activeClass:
                                            "bg-red-300 border-red-500 shadow",
                                    },
                                ]}
                            />
                        </Col>
                        <Col md="8">
                            <Input
                                label="Name"
                                name="name"
                                value={data?.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <Input
                                label="Username"
                                name="username"
                                value={data?.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            <Input
                                label="Email"
                                name="email"
                                value={data?.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                        </Col>
                        <div className="grid grid-cols-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2">
                                <Input
                                    label="Kata Sandi"
                                    name="password"
                                    value={data?.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                <Input
                                    label="No Telpon"
                                    name="phone"
                                    value={data?.phone}
                                    onChange={handleChange}
                                    placeholder="phone"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-4">
                                <AsyncSelect
                                    label="Pilih Posisi"
                                    id="position_id"
                                    value={position?.map((val) => ({
                                        value: val.id,
                                        label: val.name,
                                    }))}
                                    loadOptions={loadPositionOptions}
                                    onChange={handlePositionChange}
                                    isMulti
                                    className="mb-3"
                                    placeholder="Select Posisi"
                                />
                                <AsyncSelect
                                    label="Selected Division"
                                    id="division_id"
                                    value={
                                        division && division.id
                                            ? {
                                                  value: division.id,
                                                  label: division.name,
                                              }
                                            : null
                                    }
                                    loadOptions={loadDivisionOptions}
                                    onChange={handleDivisionChange}
                                    className="mb-3"
                                    placeholder="Select Division"
                                    isClearable={false}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-4">
                                <AsyncSelect
                                    label="Selected Branch"
                                    id="branch_id"
                                    value={
                                        branch && branch.id
                                            ? {
                                                  value: branch.id,
                                                  label: branch.name,
                                              }
                                            : null
                                    }
                                    loadOptions={loadBranchOptions}
                                    onChange={handleBranchChange}
                                    className="mb-3"
                                    placeholder="Select Branch"
                                    isClearable={false}
                                />
                                <AsyncSelect
                                    label="Selected Role"
                                    id="role"
                                    value={
                                        role && role.id
                                            ? {
                                                  value: role.id,
                                                  label: role.name,
                                              }
                                            : null
                                    }
                                    loadOptions={loadRoleOptions}
                                    onChange={handleRoleChange}
                                    placeholder="Select Role"
                                />
                            </div>

                            <Input
                                label="Address"
                                name="address"
                                value={data?.address}
                                onChange={handleChange}
                                placeholder="Address"
                            />
                        </div>
                    </Row>
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
