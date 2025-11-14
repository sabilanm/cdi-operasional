import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { useCreateDireksiArea } from "../hooks/useCreateDireksiArea";

const Create = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Direksi Area", to: "/direksi-area", active: false },
        { label: "Create", active: true },
    ];
    const {
        cLevel,
        divisions,
        availableCLevels,
        availableDivisions,
        handleCLevelChange,
        handleDivisionsChange,
        handleSubmit,
    } = useCreateDireksiArea();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Direksi Area" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Direksi Area
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Select
                        label="Selected C Level"
                        id="cLevel"
                        options={availableCLevels}
                        value={cLevel}
                        onChange={handleCLevelChange}
                        className="mb-3"
                        placeholder="Select C Level"
                    />
                    <Select
                        label="Selected Divisions"
                        id="divisions"
                        options={availableDivisions}
                        value={divisions}
                        onChange={handleDivisionsChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select Divisions"
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
