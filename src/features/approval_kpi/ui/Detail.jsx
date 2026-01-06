import { Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useDetail } from "../hooks/useDetail";
import Radio from "../../../components/ui/Radio";
import { useParams } from "react-router-dom";
import Button from "../../../components/ui/SubmitButton";

const Index = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Master KPI", active: true },
    ];
    const navigate = useNavigate();
    const { data, loading, error, handleChange } = useDetail(id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    // console.log(data);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Detail Approval KPI" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {data.map((val, i) => (
                    <div key={val.id} className="bg-white mb-4 rounded-xl">
                        <div className="p-4">
                            <div className="mb-3 pb-2 border-b border-gray-200">
                                <div className="flex gap-2">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 font-semibold text-gray-600">
                                        {i + 1}.
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {val.indicator}
                                    </span>
                                </div>
                            </div>
                            {val.file && (
                                <div className="flex justify-center items-center mb-3">
                                    <img
                                        src={`${process.env.REACT_APP_IMAGE_URL}${val.file}`}
                                        alt="gambar"
                                        className="max-w-[300px] max-h-[300px] object-contain rounded-md shadow"
                                    />
                                </div>
                            )}

                            <textarea
                                id="message"
                                rows="2"
                                value={val.note}
                                class="mb-3 border text-heading text-sm rounded-base w-full p-3.5 shadow-xs"
                                placeholder="notes..."
                                readOnly
                            ></textarea>
                            <Radio
                                label="Score"
                                name={`score-${val.id}`}
                                value={String(val.score_id)}
                                readOnly
                                options={val.detail.map((item) => ({
                                    label: item.score,
                                    value: String(item.id),
                                    activeClass:
                                        "bg-green-300 border-green-500 shadow",
                                }))}
                            />

                            {val.detail.map((val, i) => (
                                <div key={i}>
                                    <span className="font-semibold">
                                        {val.score}
                                    </span>{" "}
                                    - {val.penilaian}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end gap-3">
                <Button
                    type="submit"
                    loading={loading}
                    label="Reject"
                    className="bg-[#EF4444] w-40"
                />
                <Button
                    type="submit"
                    loading={loading}
                    label="Approve"
                    className="bg-[#00ACC1] w-40"
                />
            </div>
        </div>
    );
};

export default Index;
