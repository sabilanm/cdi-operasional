import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/SubmitButton";
import { useDetailUser } from "../hooks/useDetailUser";
import { Icon } from "@iconify/react";

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
                    {data.file_soal && (
                        <>
                            {/\.(jpg|jpeg|png|gif)$/i.test(data.file_soal) ? (
                                <img
                                    src={`${process.env.REACT_APP_IMAGE_URL}${data.file_soal}`}
                                    alt="Assignment"
                                    className="w-full max-h-[600px] object-contain rounded-lg mb-3"
                                />
                            ) : (
                                <div className="w-full h-screen mb-3">
                                    <embed
                                        src={`${process.env.REACT_APP_IMAGE_URL}${data.file_soal}`}
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
                            <div className="flex items-center space-x-2">
                                <Icon
                                    icon="solar:star-circle-bold-duotone"
                                    width="20"
                                    height="20"
                                />
                                <span>{data.bobot}%</span>
                            </div>
                            <div className="w-px h-5 bg-gray-500"></div>{" "}
                            <div className="flex items-center space-x-2">
                                <Icon
                                    icon="solar:people-nearby-bold-duotone"
                                    width="20"
                                    height="20"
                                />
                                <span>{data.user_name}</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-3">
                        {/* Link Jawaban */}
                        <a
                            href={data.link_jawaban}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-span-2 mt-2 flex items-center gap-2 px-4 py-3 bg-gray-50 
    border border-gray-300 rounded-lg text-blue-600 hover:text-blue-700 
    hover:border-blue-400 transition"
                        >
                            <Icon
                                icon="solar:link-bold-duotone"
                                width="20"
                                height="20"
                            />
                            <span className="truncate">
                                {data.link_jawaban || "Belum ada link jawaban"}
                            </span>
                            <Icon
                                icon="solar:arrow-right-up-linear"
                                width="18"
                                height="18"
                            />
                        </a>

                        {/* Input Score */}
                        {data?.score === null ? (
                            <div className="col-span-2 relative w-full mt-2">
                                <Icon
                                    icon="solar:cup-line-duotone"
                                    width="20"
                                    height="20"
                                    className="absolute right-3 top-3 text-gray-400 peer-focus:text-blue-500 transition"
                                />

                                <input
                                    type="number"
                                    name="score"
                                    value={data?.score ?? ""}
                                    onChange={handleChange}
                                    placeholder=" "
                                    className="peer w-full border-2 border-red-300 rounded-lg px-3 py-3 pr-10 
        text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500 transition"
                                    min="0"
                                    max="100"
                                    required
                                />

                                <label
                                    htmlFor="score"
                                    className="absolute left-3 top-3 bg-white px-1 text-red-600 text-sm 
        font-medium pointer-events-none transform duration-300 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-95
        peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:text-blue-600 
        peer-focus:scale-75"
                                >
                                    Masukkan Nilai (0-100)
                                </label>
                            </div>
                        ) : (
                            <div className="col-span-2 border-2 border-green-400 rounded-xl p-2 bg-green-50 shadow-sm flex items-center gap-3 mt-2">
                                <Icon
                                    icon="solar:cup-bold-duotone"
                                    width="26"
                                    height="26"
                                    className="text-green-600"
                                />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {data.score}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {data?.score === null ? (
                        <div className="flex justify-end">
                            <Button
                                onClick={(e) => handleSubmit(e)}
                                loading={loading}
                                label="Save"
                                className="bg-[#00ACC1] w-40"
                            />
                        </div>
                    ) : null}
                </div>
            </CardBody>
        </div>
    );
};

export default DetailUser;
