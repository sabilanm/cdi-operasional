import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/SubmitButton";
import { useDetailUser } from "../hooks/useDetailUser";

const DetailUser = () => {
    const { id, assignment_detail_id } = useParams();
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
    const { data, loading, handleChange, handleSubmit } = useDetailUser(
        id,
        assignment_detail_id
    );

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs
                title="Detail Assignment User"
                items={breadcrumbItems}
            />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Detail Assignment
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <div className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-1 mb-3 mt-2">
                        <div className="col-span-1 border-2 border-gray-500 rounded-lg mb-2">
                            <label className="m-3 font-semibold text-lg">
                                {new Date(data.start_date).toLocaleDateString(
                                    "id-ID",
                                    {
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </label>
                        </div>
                        <div className="col-span-3 border-2 border-gray-500 rounded-lg mb-2">
                            <label className="m-3 font-semibold text-lg">
                                {data.user_name}
                            </label>
                        </div>
                    </div>
                    <div className="border-2 border-gray-500 rounded-lg mb-2">
                        <label className="m-3">
                            {data.assignment?.replace(/<\/?[^>]+(>|$)/g, "")}
                        </label>
                    </div>
                    <embed
                        src={`${process.env.REACT_APP_IMAGE_URL}${data.file_soal}`}
                        type="application/pdf"
                        className="w-full h-[600px] rounded-lg mb-2"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 items-start">
                        <div className="col-span-3 border-2 border-gray-500 rounded-lg mb-2 flex items-center h-10 mt-4">
                            <span className="text-sm m-3">
                                {data.link_jawaban}
                            </span>
                        </div>

                        <div className="col-span-1">
                            <Input
                                label="Masukkan Nilai"
                                name="score"
                                value={data?.score}
                                onChange={handleChange}
                                placeholder="Masukkan Nilai"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={(e) => handleSubmit(e)}
                            loading={loading}
                            label="Approve"
                            color="primary"
                        />
                    </div>
                </div>
            </CardBody>
        </div>
    );
};

export default DetailUser;
