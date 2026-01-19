import { CardBody, CardTitle, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Button from "../../../components/ui/SubmitButton";
import { useCreatePalanAction } from "../hooks/useCreate";
import InputCustom from "../../../components/ui/Input";
import AsyncSelect from "../../../components/ui/AsyncSelect";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        {
            label: "Assignment",
            to: "/master-kpi/special-assignment",
            active: false,
        },
        { label: "Create", active: true },
    ];
    const {
        data,
        branch,
        task,
        position,
        loading,
        user,
        handleChange,
        loadUserOptions,
        loadBranchOptions,
        loadTaskOptions,
        loadPositionOptions,
        handleUserChange,
        handleBranchChange,
        handleTaskChange,
        handlePositionChange,
        handleSubmit,
    } = useCreatePalanAction();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Action Plan" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Action Plan
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        <AsyncSelect
                            label="Pilih User"
                            id="user"
                            value={
                                user && user.id
                                    ? {
                                          value: user.id,
                                          label: user.name,
                                      }
                                    : null
                            }
                            loadOptions={loadUserOptions}
                            onChange={handleUserChange}
                            className="mb-3"
                            placeholder="Pilih User"
                            isClearable={false}
                        />
                        <AsyncSelect
                            label="Pilih Task"
                            id="task"
                            value={
                                task && task.id
                                    ? {
                                          value: task.id,
                                          label: task.name,
                                          data: task.jobdesc,
                                      }
                                    : null
                            }
                            loadOptions={loadTaskOptions}
                            onChange={handleTaskChange}
                            className="mb-3"
                            placeholder="Pilih Task"
                            isClearable={false}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                        <InputCustom
                            label="Problem"
                            name="problem"
                            value={data?.problem}
                            onChange={handleChange}
                            placeholder="Problem"
                            marginBot="mb-0"
                            marginTop="mt-0"
                        />
                        <InputCustom
                            label="Due Date"
                            name="dueDate"
                            value={data?.dueDate}
                            type="date"
                            onChange={handleChange}
                            placeholder="Due Date"
                            marginBot="mb-0"
                            marginTop="mt-0"
                        />
                    </div>
                    <InputArea
                        label="Plan"
                        name="plan"
                        value={data?.plan}
                        onChange={handleChange}
                        placeholder="Masukkan deskripsi..."
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            loading={loading}
                            label="Save"
                            className="bg-[#00ACC1] w-40"
                        />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
