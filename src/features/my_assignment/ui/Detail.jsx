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
        { label: "My Assignment", to: "/my-assignment", active: false },
        { label: "Detail", active: true },
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
            <title>Operasional</title>
            <Breadcrumbs title="Detail Assignment" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Detail Assignment
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <div className="m-3"></div>
            </CardBody>
        </div>
    );
};

export default Create;
