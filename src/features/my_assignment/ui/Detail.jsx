import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
// import { useEditBranch } from "../hooks/useEditBranch";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Roles", to: "/roles", active: true },
    ];
    // const { data, handleChange, handleSubmit } = useEditBranch(id);
    // const InfoItem = ({ icon, label, value }) => (
    //     <div className="flex items-center">
    //         <i className={`bi bi-${icon} mr-3 text-[#003B8F] text-xl`} />
    //         <span className="font-semibold w-32">{label}:</span>
    //         <span className="ml-1">{value}</span>
    //     </div>
    // );
    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Users
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <div className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3">
                        <div className="col-span-1">
                            <Input
                                label="Start Date"
                                name="startDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="Start Date"
                                type="date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="End Date"
                                name="endDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="End Date"
                                type="date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="End Date"
                                name="endDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="End Date"
                                type="date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Name"
                                name="name"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                </div>
            </CardBody>
        </div>
    );
};

export default Create;
