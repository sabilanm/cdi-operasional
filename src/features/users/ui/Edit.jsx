import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    CardBody,
    CardTitle,
    Card,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input as RSInput,
    Spinner,
    Button,
    Input
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { useEditUsers } from "../hooks/useEditUsers";
import {
    branchDropdown,
    roleDropdown,
    positionDropdown,
    divisionDropdown,
} from "../../dropdown/listDropdown";
import defaultImage from "../../../assets/images/users/user6.png";
import ToastNotification from "../../../components/common/ToastNotification";


const EditUser = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Users", to: "/users", active: false },
        { label: "Edit", active: true },
    ];
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        user,
        loading,
        imagePreview,
        position,
        division,
        branch,
        role,
        handleChange,
        handlePasswordChange,
        handleImageChange,
        handlePositionChange,
        handleDivisionChange,
        handleBranchChange,
        handleRoleChange,
        handleSubmit,
        loadPositionOptions,
        loadDivisionOptions,
        loadBranchOptions,
        loadRoleOptions,
    } = useEditUsers(id);

    const getPositionNames = () => {
        if (position && position.length > 0) {
            return position.map((p) => p.name).filter(Boolean).join(", ");
        }
        const userData = user?.data || user;
        if (userData?.positions && Array.isArray(userData.positions)) {
            return userData.positions.map((pos) => pos.name).filter(Boolean).join(", ");
        }
        return user?.position_name || "-";
    };
    const getUserValue = (key) => {
        const userData = user?.data || user;
        return userData?.[key] || "";
    };
    
    const displayImage =
        imagePreview ||
        (getUserValue('image')
            ? `https://app.cobradental.co.id:1780/operasional-api/public/storage/${getUserValue('image')}`
            : defaultImage);

    if (loading && !user) {
        return (
            <div className="w-full flex justify-center items-center py-10">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit User" items={breadcrumbItems} />
            <Card className="bg-[#FFFFFF] border border-[#e5d8c0] shadow-inner rounded-xl p-6">
                <CardBody>
                    {user && (
                        <Row className="mx-1 mt-4">
                            <Col md="5">
                                <Row>
                                    <div className="d-flex align-items-center justify-content-center p-2 position-relative">
                                        <div className="position-relative">
                                            <img
                                                src={displayImage}
                                                className="rounded-lg border-2 border-white shadow-lg object-cover transition duration-300 ease-in-out hover:scale-105"
                                                alt="avatar"
                                                width="100"
                                                height="100"
                                                style={{
                                                    padding: "10px",
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <label
                                                className="camera-icon position-absolute"
                                                style={{
                                                    top: "5px",
                                                    right: "5px",
                                                    backgroundColor: "#f79797",
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
                                </Row>
                                <Row className="mt-3">
                                    <Col md="12">
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Nama
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Email
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('email')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Nomor Hp
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {"+" + (getUserValue('phone') || "")}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Status
                                            </label>
                                            <label className="col-md-7 text-gray-800 text-capitalize">
                                                <strong>:</strong>{" "}
                                                {getUserValue('status')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold">
                                                Nama Cabang
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('branch_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Posisi
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getPositionNames()}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Divisi
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('division_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Role
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('role_name')}
                                            </label>
                                        </div>
                                        <div className="row mt-3">
                                            <label className="col-md-5 text-gray-600 fw-bold ">
                                                Alamat
                                            </label>
                                            <label className="col-md-7 text-gray-800">
                                                <strong>:</strong>{" "}
                                                {getUserValue('address')}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md="7">
                                <Form onSubmit={handleSubmit}>
                                    {/* Form fields dengan styling yang sama seperti kode pertama */}
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Name"
                                            value={getUserValue('name') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Nama
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="User Name"
                                            value={getUserValue('username') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            htmlFor="username"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Username
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Email"
                                            value={getUserValue('email') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Email
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Password"
                                            value={user.password || ""}
                                            onChange={handlePasswordChange}
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Kata Sandi
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="Phone"
                                            value={getUserValue('phone') ? `+${getUserValue('phone')}` : "+"}
                                            onChange={(e) => {
                                                const onlyNums = e.target.value.replace(/^\+|[^0-9]/g, "");
                                                handleChange({ target: { name: "phone", value: onlyNums } });
                                            }}
                                            pattern="\+62[0-9]*"
                                            title="Phone number must be numeric"
                                            required
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Nomor Telepon
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            className="peer block py-2.5 px-3 w-full text-sm text-dark bg-transparent border border-dark rounded-md focus:outline-none focus:ring-0 focus:border-b-2 focus:border-t-transparent focus:border-dark placeholder-transparent"
                                            placeholder="address"
                                            value={getUserValue('address') || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label
                                            htmlFor="address"
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-[#FFFFFF] px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-[#FFFFFF] peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Alamat
                                        </label>
                                    </div>

                                    <FormGroup>
                                        <Label>Status</Label>
                                        <div>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="status"
                                                        value="active"
                                                        checked={
                                                            getUserValue('status') === "active"
                                                        }
                                                        onChange={handleChange}
                                                    />{" "}
                                                    Active
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input
                                                        type="radio"
                                                        name="status"
                                                        value="inactive"
                                                        checked={
                                                            getUserValue('status') === "inactive"
                                                        }
                                                        onChange={handleChange}
                                                    />{" "}
                                                    Inactive
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </FormGroup>

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
                                            placeholder="Pilih Posisi"
                                        />
                                        <AsyncSelect
                                            label="Pilih Divisi"
                                            id="division_id"
                                            value={division && division.id ? { value: division.id, label: division.name } : null}
                                            loadOptions={loadDivisionOptions}
                                            onChange={handleDivisionChange}
                                            placeholder="Pilih Divisi"
                                            isClearable={false}
                                        />
                                    </div>

                                    <AsyncSelect
                                        label="Pilih Cabang"
                                        id="branch_id"
                                        value={branch && branch.id ? { value: branch.id, label: branch.name } : null}
                                        loadOptions={loadBranchOptions}
                                        onChange={handleBranchChange}
                                        placeholder="Pilih Cabang"
                                        isClearable={false}
                                    />

                                    <AsyncSelect
                                        label="Pilih Role"
                                        id="role_id"
                                        value={role && role.id ? { value: role.id, label: role.name } : null}
                                        loadOptions={loadRoleOptions}
                                        onChange={handleRoleChange}
                                        placeholder="Pilih Role"
                                    />
                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="w-40 rounded-md border border-[#5D3A00] bg-[#007BFF] text-[#FFFFFF] shadow-inner hover:bg-[#4B3832] hover:shadow-lg transition-all duration-300"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            "Simpan Perubahan"
                                        )}
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default EditUser;
