import { CardBody, CardTitle, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import { useCreateDivision } from "../hooks/useCreateDivision";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Division", to: "/division", active: false },
        { label: "Create", active: true },
    ];
    const { data, handleChange, handleSubmit } = useCreateDivision();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Division" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Division
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
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
