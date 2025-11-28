import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import { useDetail } from "../hooks/useDetail";
import Button from "../../../components/ui/SubmitButton";
import { Icon } from "@iconify/react";

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
    const { data, loading, handleChange, handleSubmit } = useDetail(id);
    // console.log(data);

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
                <div className="m-3">
                    {data.assignment_file && (
                        <>
                            {/\.(jpg|jpeg|png|gif)$/i.test(
                                data.assignment_file
                            ) ? (
                                <img
                                    src={`${process.env.REACT_APP_IMAGE_URL}${data.assignment_file}`}
                                    alt="Assignment"
                                    className="w-full max-h-[600px] object-contain rounded-lg mb-3"
                                />
                            ) : (
                                <div className="w-full h-screen mb-3">
                                    <embed
                                        src={`${process.env.REACT_APP_IMAGE_URL}${data.assignment_file}`}
                                        type="application/pdf"
                                        className="w-full h-full rounded-lg"
                                    />
                                </div>
                            )}
                        </>
                    )}
                    <div className="border border-gray-300 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-gray-700 font-semibold space-x-4">
                            <div className="flex items-center space-x-2">
                                <Icon
                                    icon="solar:calendar-bold-duotone"
                                    width="20"
                                    height="20"
                                />
                                <span>
                                    {new Date(
                                        data.start_date
                                    ).toLocaleDateString("id-ID", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="w-px h-5 bg-gray-500"></div>{" "}
                            {/* Divider */}
                            <div className="flex items-center space-x-2">
                                <Icon
                                    icon="solar:star-circle-bold-duotone"
                                    width="20"
                                    height="20"
                                />
                                <span>{data.bobot}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-xl p-4 mb-4 bg-white shadow-sm">
                        <h3 className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <Icon
                                icon="solar:document-bold-duotone"
                                width="20"
                                height="20"
                            />
                            Deskripsi :
                        </h3>

                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap ml-10">
                            {data.assignment?.replace(/<\/?[^>]+(>|$)/g, "") ||
                                "-"}
                        </p>
                    </div>

                    <Input
                        label="Masukkan Link Google Drive"
                        name="link"
                        value={data?.link}
                        onChange={handleChange}
                        placeholder="Masukkan Link Google Drive"
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            loading={loading}
                            label="Kirim"
                            className="bg-[#00ACC1] w-40"
                        />
                    </div>
                </div>
            </CardBody>
        </div>
    );
};

export default Create;
