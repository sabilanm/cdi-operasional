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
    } = useEditPermissions(id);
    const loadDivisionOptions = async (search, loadedOptions, { page }) => {
        try {
            const res = await roleDropdown.getAll(search, loadedOptions, {
                page,
            });

            const items = res.items;
            return {
                options: items.map((item) => ({
                    value: item.id,
                    label: item.name,
                })),
                hasMore: res.hasMore,
                additional: {
                    page: page + 1,
                },
            };
        } catch (error) {
            console.error("Error loading role options:", error);
            return {
                options: [],
                hasMore: false,
                additional: {
                    page,
                },
            };
        }
    };
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
                    <Select
                        label="Selected Role"
                        id="roles"
                        options={availableRole}
                        value={role.map((user) => ({
                            value: user.id,
                            label: user.name,
                        }))}
                        onChange={handleRoleChange}
                        isMulti
                        className="mb-3"
                        placeholder="Select role"
                    />

                    <AsyncPaginate
                        value={
                            role.id && role.name
                                ? { value: role.id, label: role.name }
                                : null
                        }
                        loadOptions={loadDivisionOptions}
                        onChange={(selected) => {
                            setRole((prev) => ({
                                ...prev,
                                id: selected ? selected.value : "",
                            }));
                        }}
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
