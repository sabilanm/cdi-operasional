import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEditPelunasan } from "../hooks/useEditPelunasan";

const Edit = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Jobdesc", to: "/master-kpi/jobdescs", active: false },
        { label: "Edit", active: true },
    ];

    const { data, loading, error, handleChange, handleSubmit } =
        useEditPelunasan(id);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs
                title="Edit Target Pelunasan"
                items={breadcrumbItems}
            />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Target Pelunasan
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-3">
                        <div className="col-span-1">
                            <label className="flex relative z-0 w-full mb-4 group mt-4 mx-4">
                                Periode
                            </label>
                        </div>
                        <div className="col-span-2">
                            <Input
                                label="Tanggal Mulai"
                                name="startDate"
                                value={data?.children?.[0]?.start_date}
                                onChange={handleChange}
                                placeholder="Tanggal Mulai"
                                type="date"
                            />
                        </div>
                        <div className="col-span-2">
                            <Input
                                label="Tanggal Selesai"
                                name="endDate"
                                value={data?.children?.[0]?.end_date}
                                onChange={handleChange}
                                placeholder="Tanggal Selesai"
                                type="date"
                            />
                        </div>
                    </div>
                    {data?.children.map((val, num) => (
                        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-3">
                            <div className="col-span-1">
                                <label className="flex relative z-0 w-full mb-4 group mt-4 mx-4">
                                    Range {val.range_level}
                                </label>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Bobot"
                                    name={`bobot`}
                                    value={val?.bobot}
                                    onChange={(e) => handleChange(e, num)}
                                    placeholder="Bobot"
                                    required={false}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Min Range"
                                    name={`min_range`}
                                    value={val?.min_range}
                                    onChange={(e) => handleChange(e, num)}
                                    placeholder="Min Range"
                                    required={false}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Max Range"
                                    name={`max_range`}
                                    value={val?.max_range}
                                    onChange={(e) => handleChange(e, num)}
                                    placeholder="Max Range"
                                    required={false}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Edit;
