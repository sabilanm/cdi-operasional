// src/features/jobdesc_admin/ui/Create.jsx
import { useEffect, useMemo } from "react";
import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import InputArea from "../../../components/ui/InputArea";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/Button";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import { useCreateJobdesc } from "../hooks/useCreateJobdesc";

const Create = () => {
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Jobdesc", to: "/master-kpi/jobdescs", active: false },
        { label: "Create", active: true },
    ];

    const {
        data,
        position,
        handleChange,
        handleSubmit,
        loadPositionsOptions,
        handlePositionChange,
        branch,
        loadBranchOptions,
        handleBranchChange,
        toggleDate,
    } = useCreateJobdesc();

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const formatDate = (date) => date.toISOString().split("T")[0];

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Jobdesc" items={breadcrumbItems} />
            <CardTitle tag="h6" className="text-center text-3xl font-weight-bold mb-5">
                Create Jobdesc
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Title"
                        name="jobdesc"
                        value={data.jobdesc}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                    <InputArea
                        label="Detail"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Masukkan detail..."
                        border="border-1"
                    />
                    <Input
                        label="Koefisien"
                        name="koefisien"
                        value={data.koefisien}
                        onChange={handleChange}
                        placeholder="Koefisien"
                    />
                    <Input
                        label="Repetition"
                        name="repetition"
                        value={data.repetition || ""}
                        onChange={handleChange}
                        placeholder="Repetition"
                        required={false}
                    />
                    <AsyncSelect
                        label="Select Jobdesc"
                        id="position_id"
                        isMulti={false}
                        value={position ? { value: position.id, label: position.name } : null}
                        loadOptions={loadPositionsOptions}
                        onChange={handlePositionChange}
                        placeholder="Pilih Jobdesc"
                        marginTop="m-3"
                    />
                    <Radio
                        label="Methode"
                        name="methode"
                        value={data.methode}
                        onChange={handleChange}
                        options={[
                            { label: "Manual", value: "Manual", activeClass: "bg-green-300 border-green-500 shadow" },
                            { label: "Sistem", value: "Sistem", activeClass: "bg-blue-300 border-blue-500 shadow" },
                            { label: "Mix", value: "Mix", activeClass: "bg-red-300 border-red-500 shadow" },
                        ]}
                    />
                    <Radio
                        label="Type"
                        name="type"
                        value={data.type}
                        onChange={handleChange}
                        options={[
                            { label: "Daily", value: "daily", activeClass: "bg-green-300 border-green-500 shadow" },
                            { label: "Weekly", value: "weekly", activeClass: "bg-blue-300 border-blue-500 shadow" },
                            { label: "Monthly", value: "monthly", activeClass: "bg-red-300 border-red-500 shadow" },
                            { label: "By Date", value: "by date", activeClass: "bg-yellow-300 border-yellow-500 shadow" },
                        ]}
                    />
                    {data.type === "by date" && (
                        <div className="border-1 border-gray-400 rounded-lg p-4 bg-yellow-50 space-y-3">
                            <label className="font-semibold block">
                                Pilih Tanggal (Bulan Ini)
                            </label>

                            <input
                                type="date"
                                min={formatDate(firstDayOfMonth)}
                                max={formatDate(lastDayOfMonth)}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        toggleDate(e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                                className="border rounded p-2"
                            />

                            {/* LIST TANGGAL TERPILIH */}
                            <div className="flex flex-wrap gap-2">
                                {data.dates.map((date) => (
                                    <span
                                        key={date}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm flex items-center gap-2"
                                    >
                                        {date}
                                        <button
                                            type="button"
                                            className="text-white font-bold"
                                            onClick={() => toggleDate(date)}
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* BRANCH */}
                            <AsyncSelect
                                id="branch_filter"
                                value={branch || null}
                                loadOptions={loadBranchOptions}
                                onChange={handleBranchChange}
                                placeholder="Pilih Cabang"
                                marginTop="m-0"
                                border="border-0"
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
