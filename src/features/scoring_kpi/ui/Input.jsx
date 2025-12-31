import { Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Radio from "../../../components/ui/Radio";
import Button from "../../../components/ui/SubmitButton";

const Index = () => {
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
    const { data, loading, error, handleChange } = useInput();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    console.log(data);

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Input Scoring KPI" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                {data.map((val, i) => (
                    <div className="bg-white mb-4 rounded-xl">
                        <div className="p-4">
                            <div className="mb-3 pb-2 border-b border-gray-200">
                                <div className="flex gap-2">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 font-semibold text-gray-600">
                                        {i + 1}.
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {val.indikator}
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
                                name="point"
                                value={data?.point}
                                onChange={(e) =>
                                    handleChange(i, "point", e.target.value)
                                }
                                options={[
                                    {
                                        label: "0",
                                        value: 0,
                                        activeClass:
                                            "bg-green-300 border-green-500 shadow",
                                    },
                                    {
                                        label: "1",
                                        value: 1,
                                        activeClass:
                                            "bg-green-300 border-green-500 shadow",
                                    },
                                    {
                                        label: "2",
                                        value: 2,
                                        activeClass:
                                            "bg-red-300 border-red-500 shadow",
                                    },
                                ]}
                            />
                            {val.penilaian &&
                                Object.entries(val.penilaian).map(
                                    ([key, val]) => (
                                        <div key={key}>
                                            <span className="font-semibold">
                                                {key}
                                            </span>{" "}
                                            - {val}
                                        </div>
                                    )
                                )}
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
