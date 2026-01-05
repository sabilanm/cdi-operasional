import { CardBody, CardTitle, Form } from "reactstrap";
import { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Button from "../../../components/ui/SubmitButton";
import { useCreate } from "../hooks/useCreate";
import { AsyncPaginate } from "react-select-async-paginate";

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
    const {
        data,
        loading,
        error,
        position,
        loadPositionOptions,
        handlePositionChange,
        handleChange,
        handleDetailChange,
        addDetail,
        removeDetail,
        handleSubmit,
    } = useCreate();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Users" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Master KPI Admin
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Indicator"
                        name="indicator"
                        value={data?.indicator}
                        onChange={handleChange}
                        placeholder="indicator"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
                        <div className="col-span-2">
                            <AsyncPaginate
                                value={
                                    position && position.id
                                        ? {
                                              value: position.id,
                                              label: position.name,
                                          }
                                        : null
                                }
                                loadOptions={loadPositionOptions}
                                onChange={handlePositionChange}
                                additional={{ page: 1 }}
                                placeholder="Pilih Jobdesc"
                                menuPortalTarget={
                                    typeof document !== "undefined"
                                        ? document.body
                                        : null
                                }
                                className="mt-4 border-2 border-gray-300"
                                styles={{
                                    menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                    }),
                                }}
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Bobot"
                                name="bobot"
                                value={data?.bobot}
                                onChange={handleChange}
                                placeholder="Bobot"
                                type="text"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Target"
                                name="target"
                                value={data?.target}
                                onChange={handleChange}
                                placeholder="Target"
                            />
                        </div>
                    </div>
                    {data.detail.map((item, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-7 gap-3 items-end mb-2"
                        >
                            <div className="col-span-1">
                                <Input
                                    label="Poin"
                                    value={item.score}
                                    onChange={(e) =>
                                        handleDetailChange(
                                            i,
                                            "score",
                                            e.target.value
                                        )
                                    }
                                    placeholder="0"
                                    type="number"
                                />
                            </div>

                            <div className="col-span-5">
                                <Input
                                    label="Deskripsi"
                                    value={item.penilaian}
                                    onChange={(e) =>
                                        handleDetailChange(
                                            i,
                                            "penilaian",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Deskripsi penilaian"
                                />
                            </div>

                            <div className="col-span-1 flex gap-2">
                                <button
                                    type="button"
                                    className="p-2 rounded bg-red-100 text-red-600"
                                    onClick={() => removeDetail(i)}
                                    disabled={data.detail.length === 1}
                                >
                                    −
                                </button>

                                {i === data.detail.length - 1 && (
                                    <button
                                        type="button"
                                        className="p-2 rounded bg-green-100 text-green-600"
                                        onClick={addDetail}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

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
