import { Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import Radio from "../../../components/ui/RadioButton";
import Button from "../../../components/ui/SubmitButton";
import { useParams, useLocation } from "react-router-dom";

const Index = () => {
    const { id } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "List", to: "/KPIScoring", active: false },
        { label: "Input", active: true },
    ];
    const navigate = useNavigate();
    const {
        data,
        loading,
        error,
        handleChange,
        handleFileChange,
        handleNoteChange,
        handleSubmit,
    } = useInput(id, userId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

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
                                label="File"
                                name={`file-${val.id}`}
                                value={data?.bobot}
                                onChange={(e) => handleFileChange(val.id, e)}
                                type="file"
                                className="mb-3"
                            />
                            <textarea
                                id="message"
                                rows="2"
                                onChange={(e) => handleNoteChange(val.id, e)}
                                class="mb-3 border text-heading text-sm rounded-base w-full p-3.5 shadow-xs"
                                placeholder="notes..."
                            ></textarea>
                            <Radio
                                label="Point"
                                name={`point-${val.id}`}
                                value={val.point}
                                onChange={(e) => {
                                    handleChange(
                                        val.id,
                                        "point",
                                        e.target.value,
                                    );
                                }}
                                options={val.detail.map((item) => ({
                                    label: `${item.score} - ${item.penilaian}`,
                                    value: JSON.stringify({
                                        id: item.id,
                                        score: item.score,
                                    }),
                                    activeClass:
                                        "bg-green-300 border-green-500 shadow",
                                }))}
                            />
                        </div>
                    </div>
                ))}
            </div>
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
    );
};

export default Index;
