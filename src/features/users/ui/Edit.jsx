import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEditBranch } from "../hooks/useEditBranch";

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
    const { data, handleChange, handleSubmit } = useEditBranch(id);
    const InfoItem = ({ icon, label, value }) => (
        <div className="flex items-center">
            <i className={`bi bi-${icon} mr-3 text-[#003B8F] text-xl`} />
            <span className="font-semibold w-32">{label}:</span>
            <span className="ml-1">{value}</span>
        </div>
    );
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
                <Form onSubmit={handleSubmit} className="p-3">
                    {data && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            {/* Avatar */}
                            <div className="flex flex-col items-center col-span-1">
                                <div className="relative mt-2">
                                    <img
                                        // src={image || imageUrl}
                                        alt="avatar"
                                        className="rounded-lg border-4 border-white shadow-lg object-cover transition duration-300 ease-in-out hover:scale-105"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            backgroundColor: "white",
                                        }}
                                    />
                                </div>

                                {/* Position Name */}
                                <div className="mt-5">
                                    <span className="bg-[#003B8F] text-[#FAF3E0] text-base italic border border-[#C9ADA7] px-6 py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:translate-y-[-6px] hover:scale-110 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)]">
                                        {data.position_name}
                                    </span>
                                </div>
                            </div>
                            {/* Info */}
                            <div className="col-span-3 space-y-6">
                                <div>
                                    <h1 className="text-5xl text-[#003B8F] font-bold tracking-tight">
                                        {data.name}
                                    </h1>
                                    <p className="text-[#6C757D] text-xl mt-2">
                                        {data.branch_name}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-lg text-[#003B8F]">
                                    <InfoItem
                                        icon="person-fill-gear"
                                        label="Role"
                                        value={data.role_name}
                                    />
                                    <InfoItem
                                        icon="person-badge"
                                        label="Division"
                                        value={data.division_name}
                                    />
                                    <InfoItem
                                        icon="person-circle"
                                        label="Username"
                                        value={data.username}
                                    />
                                    <InfoItem
                                        icon="envelope-fill"
                                        label="Email"
                                        value={data.email}
                                    />
                                    <InfoItem
                                        icon="activity"
                                        label="Status"
                                        value={
                                            <span
                                                className={`capitalize font-semibold ${
                                                    data.status === "active"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {data.status}
                                            </span>
                                        }
                                    />
                                    <InfoItem
                                        icon="briefcase-fill"
                                        label="Position"
                                        value={data.position_name}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </CardBody>
        </div>
    );
};

export default Create;
