import { Button } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import InputCustom from "../../../components/ui/Input";
import "./../../../assets/css/custom.css";
import Circle from "../../../components/ui/circleChart";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Target Pelunasan", active: true },
    ];
    const navigate = useNavigate();
    const { data, plan, loading, error } = useList();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "indicator", label: "Indicator" },
        { key: "bobot", label: "Bobot" },
        { key: "target", label: "Target" },
        { key: "actual", label: "Actual" },
        { key: "kpi", label: "KPI Score" },
    ];
    const datas = data.map((val, i) => ({
        no: i + 1,
        indicator: val.indicator,
        bobot: val.bobot,
        target: val.target,
        actual: val.actual,
        kpi: val.kpiScore,
        id: val.id,
    }));

    const handleEdit = (id) => {
        navigate(`/profit-loss/${id}/edit`);
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Target Pelunasan" items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3 mb-3 mt-2">
                <div className="col-span-1">
                    <InputCustom
                        label="Start Date"
                        name="startDate"
                        value={data.startDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-start_date"
                    />
                </div>
                <div className="col-span-1">
                    <InputCustom
                        label="End Date"
                        name="endDate"
                        value={data.endDate}
                        type="date"
                        // onChange={handleChange}
                        placeholder="Name"
                        marginBot="mb-0"
                        marginTop="mt-0"
                        background="bg-end_date"
                    />
                </div>
                <Button
                    color="primary"
                    // onClick={handleFilterSubmit}
                    className="flex items-center gap-2 w-20"
                >
                    <Icon icon="solar:magnifer-broken" width="18" height="18" />
                    Cari
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-3 mt-2">
                <div className="col-span-3">
                    <Tables
                        columns={columns}
                        data={datas}
                        showActions={false}
                        showPagination={false}
                    />
                </div>
                <div className="col-span-1">
                    <div className="p-4 bg-white rounded-2xl shadow-md h-full flex flex-col">
                        <div className="mb-3">
                            <h5 className="text-center text-lg font-semibold text-gray-900 md:text-xl">
                                Action Plan
                            </h5>
                        </div>

                        <div className="text-gray-700 flex-1 overflow-y-auto pr-1 mb-3 min-h-[420px] max-h-[420px]">
                            <div
                                className={`bg-white mb-2 p-3 rounded-lg shadow-sm`}
                            >
                                <p>
                                    Membuat checklist harian di awal shift.
                                    Menentukan PIC yang berbeda tiap minggu
                                    untuk memastikan rotasi tanggung jawab.
                                    Laporan opname difoto & dikirim via grup WA
                                    internal.
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto pt-2 border-t border-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
