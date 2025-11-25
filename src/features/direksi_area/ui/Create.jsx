import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import AsyncSelect from "../../../components/ui/AsyncSelect";
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
        loadCLevelOptions,
        loadDivisionOptions,
        handleCLevelChange,
        handleDivisionsChange,
        handleSubmit,
    } = useCreateDireksiArea();

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Create Direksi Area" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Direksi Area
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <AsyncSelect
                        label="Selected C Level"
                        id="cLevel"
                        className="mb-3"
                        value={
                            cLevel && cLevel.id
                                ? {
                                      value: cLevel.id,
                                      label: cLevel.name,
                                  }
                                : null
                        }
                        loadOptions={loadCLevelOptions}
                        onChange={handleCLevelChange}
                        placeholder="Select C Level"
                        isClearable={false}
                    />
                    <AsyncSelect
                        label="Selected Divisions"
                        id="divisions"
                        className="mb-3"
                        isMulti
                        value={Array.isArray(divisions) ? divisions : []}
                        loadOptions={loadDivisionOptions}
                        onChange={handleDivisionsChange}
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
