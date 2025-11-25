import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useDetailUser } from "../hooks/useDetailUser";

const DetailUser = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "My Assignment", to: "/my-assignment", active: false },
        { label: "Detail", active: true },
    ];
    const { data, handleChange, handleSubmit } = useDetailUser(id);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Detail Assignment User" items={breadcrumbItems} />
            <CardTitle tag="h6" className="text-center text-3xl font-weight-bold mb-5">
                Detail Assignment
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <div className="m-3">
                    <div className="border-2 border-gray-500 rounded-lg mb-2">
                        <label className="m-3">
                            {new Date(data.start_date).toLocaleDateString("id-ID", {
                                month: "long",
                                year: "numeric",
                            })}
                        </label>
                    </div>
                    <div className="border-2 border-gray-500 rounded-lg mb-2">
                        <label className="m-3">{data.assignment?.replace(/<\/?[^>]+(>|$)/g, "")}</label>
                    </div>
                    <embed src={`${process.env.REACT_APP_IMAGE_URL}${data.assignment_file}`} type="application/pdf" className="w-full h-[600px] rounded-lg" />
                    <Input label="Link Drive" name="link" value={data?.link} onChange={handleChange} placeholder="Link Drive" />
                    <div className="flex justify-end">
                        <Button type="submit" label="Kirim" color="#00ACC1" onClick={(e) => handleSubmit(e)} />
                    </div>
                </div>
            </CardBody>
        </div>
    );
};

export default DetailUser;
