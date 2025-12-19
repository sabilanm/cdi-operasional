import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/SubmitButton";
import { useUpdateMaster } from "../hooks/useEditMaster";
import { useParams } from "react-router-dom";

const UpdateMaster = () => {
    const { id } = useParams();
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
    const { data, loading, error, handleChange, handleSubmit } =
        useUpdateMaster(id);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Users" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Master KPI
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Input
                        label="Indikator"
                        name="indicator"
                        value={data?.indicator}
                        onChange={handleChange}
                        placeholder="Indikator"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
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

export default UpdateMaster;
