import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import { useCreateBranchArea } from "../hooks/useCreateBranchArea";

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
    const {
        branch,
        areas,
        availableBranch,
        availableAreas,
        handleBranchChange,
        handleAreasChange,
        handleSubmit,
    } = useCreateBranchArea();

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Division" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Create Divisi
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <Select
                        label="Selected Areas"
                        id="areas"
                        options={availableAreas}
                        value={areas?.value}
                        onChange={handleAreasChange}
                        className="mb-3"
                        placeholder="Select Areas"
                    />
                    <Select
                        label="Selected Branch"
                        id="branch"
                        options={availableBranch}
                        value={branch?.map((val) => ({
                            value: val.id,
                            label: val.name,
                        }))}
                        onChange={handleBranchChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select Branch"
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
