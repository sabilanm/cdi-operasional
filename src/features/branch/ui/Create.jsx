import { CardBody, CardTitle, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useCreateBranch } from "../hooks/useCreateBranch";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Branches", to: "/branches", active: false },
        { label: "Create", active: true },
    ];
    const { data, handleChange, handleSubmit } = useCreateBranch();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Branches" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Branches
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
                    <Input
                        label="code"
                        name="code"
                        value={data.code}
                        onChange={handleChange}
                        placeholder="code"
                    />
                    <Input
                        label="zone"
                        name="zone"
                        value={data.zone}
                        onChange={handleChange}
                        placeholder="zone"
                    />
                    <Input
                        label="alamat"
                        name="alamat"
                        value={data.alamat}
                        onChange={handleChange}
                        placeholder="alamat"
                    />
                    <Input
                        label="alamatDetail"
                        name="alamatDetail"
                        value={data.alamatDetail}
                        onChange={handleChange}
                        placeholder="alamatDetail"
                    />
                    <Input
                        label="kodePos"
                        name="kodePos"
                        value={data.kodePos}
                        onChange={handleChange}
                        placeholder="kodePos"
                    />
                    <Input
                        label="hp"
                        name="hp"
                        value={data.hp}
                        onChange={handleChange}
                        placeholder="hp"
                    />
                    <Input
                        label="fax"
                        name="fax"
                        value={data.fax}
                        onChange={handleChange}
                        placeholder="fax"
                    />
                    <Input
                        label="npwp"
                        name="npwp"
                        value={data.npwp}
                        onChange={handleChange}
                        placeholder="npwp"
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
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
