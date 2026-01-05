import { Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/SubmitButton";
import { useParams } from "react-router-dom";

const Index = () => {
    const { id, admin_kpi_id } = useParams();
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
    const { data, loading, error, handleChange } = useInput(id, admin_kpi_id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    console.log(data);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Input Scoring KPI" items={breadcrumbItems} />
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
                            <Input
                                label="Bobot"
                                name="bobot"
                                value={data?.bobot}
                                onChange={(e) =>
                                    handleChange(i, "bobot", e.target.value)
                                }
                                placeholder="Bobot"
                                type="file"
                                className="mb-3"
                            />
                            <Radio
                                label="Point"
                                name={`point-${val.id}`}
                                value={val.point}
                                onChange={(e) => {
                                    handleChange(
                                        val.id,
                                        "point",
                                        e.target.value
                                    );
                                }}
                                options={val.detail.map((item) => ({
                                    label: item.score,
                                    value: item.score,
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
            <div className="flex justify-end">
                <Button
                    type="submit"
                    loading={loading}
                    label="Kirim"
                    className="bg-[#00ACC1] w-40"
                />
            </div>
        </div>
    );
};

export default Index;
