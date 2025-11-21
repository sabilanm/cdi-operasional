import { CardBody, CardTitle, Form } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import AsyncSelect from "../../../components/ui/AsyncSelect";
import Button from "../../../components/ui/Button";
import { useEditBranchArea } from "../hooks/useEditBranchArea";
import { useParams } from "react-router-dom";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Branch Area", to: "/branch-areas", active: false },
        { label: "Create", active: true },
    ];
    const {
        branch,
        areas,
        loadBranchOptions,
        loadAreaOptions,
        handleBranchChange,
        handleAreasChange,
        handleSubmit,
    } = useEditBranchArea(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit Branch Area" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Branch Area
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <Form onSubmit={handleSubmit} className="p-3">
                    <AsyncSelect
                        label="Selected Areas"
                        id="areas"
                        className="mb-3"
                        value={
                            areas
                                ? { value: areas.value, label: areas.label }
                                : null
                        }
                        loadOptions={loadAreaOptions}
                        onChange={handleAreasChange}
                        placeholder="Select Areas"
                    />
                    <AsyncSelect
                        label="Selected Branch"
                        id="branch"
                        className="mb-3"
                        isMulti
                        value={
                            Array.isArray(branch) && branch.length
                                ? branch.map((b) => ({
                                      value: b.value,
                                      label: b.label,
                                  }))
                                : []
                        }
                        loadOptions={loadBranchOptions}
                        onChange={handleBranchChange}
                        placeholder="Select Branches"
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
