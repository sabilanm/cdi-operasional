import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Radio from "../../../components/ui/Radio";
import { AsyncPaginate } from "react-select-async-paginate";
import { useEditPermissions } from "../hooks/useEditPermissions";
import { roleDropdown } from "../../dropdown/listDropdown";

const Edit = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Permissions", to: "/permissions", active: false },
        { label: "Edit", active: true },
    ];
    const {
        data,
        role,
        setRole,
        availableRole,
        handleChange,
        handleRoleChange,
        handleSubmit,
        loadDivisionOptions,
    } = useEditPermissions(id);

    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Edit Permissions" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Permissions
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
                    <Input
                        label="Uri"
                        name="uri"
                        value={data.uri}
                        onChange={handleChange}
                        placeholder="Uri"
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
                    <AsyncPaginate
                        isMulti
                        value={
                            role && role.length > 0
                                ? role.map((r) => ({
                                      value: r.id,
                                      label: r.name,
                                  }))
                                : []
                        }
                        loadOptions={loadDivisionOptions}
                        onChange={handleRoleChange}
                        additional={{ page: 1 }}
                        placeholder="Pilih Divisi"
                        isClearable
                    />
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" />
                    </div>
                </Form>
            </CardBody>
        </div>
    );
};

export default Edit;
