import { useState } from "react";
import {
    Button,
    FormGroup,
    InputGroup,
    InputGroupText,
    Input,
} from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";
import ToastNotification from "../../../components/common/ToastNotification";
import { scoringService } from "../services/scoringServices";

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
    const { data, additionals, loading, error } = useList();
    const [processing, setProcessing] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const columns = [
        { key: "no", label: "No" },
        { key: "username", label: "User" },
        { key: "position_name", label: "Jobdesc" },
        { key: "periode", label: "Periode" },
    ];

    const datas = (data || []).map((val, i) => ({
        no: i + 1,
        username: val.username,
        position_name: val.position_name,
        periode: val.periode,
        id: val.id,
        admin_kpi_id: val.admin_kpi_id,
    }));

    const handleDetail = (id, admin_kpi_id) => navigate(`${id}/detail/${admin_kpi_id}`);

    // ===============  GENERATE BULANAN  =================
    const handleGenerate = async () => {
        if (!window.confirm("Yakin ingin melakukan generate bulanan?")) return;

        try {
            setProcessing(true);
            const res = await scoringService.generate();
            ToastNotification.success(res?.message || "Generate berhasil.");
            window.location.reload(); // muat ulang list
        } catch (err) {
            ToastNotification.error(err?.message || "Gagal generate data.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <title>Operasional</title>

            <Breadcrumbs title="Scoring KPI" items={breadcrumbItems} />

            <FormGroup className="flex justify-between items-center mb-3">
                <InputGroup className="w-1/2 h-12">
                    <InputGroupText
                        style={{
                            borderTopLeftRadius: "15px",
                            borderBottomLeftRadius: "15px",
                        }}
                    >
                        <BiSearch />
                    </InputGroupText>

                    <Input
                        placeholder="Nama"
                        style={{
                            borderTopRightRadius: "15px",
                            borderBottomRightRadius: "15px",
                        }}
                    />
                </InputGroup>

                <Button
                    color="danger"
                    disabled={!additionals?.generate}
                    onClick={handleGenerate}
                    className="flex items-center gap-2"
                >
                    <Icon
                        icon="solar:database-bold-duotone"
                        width="18"
                        height="18"
                    />
                    {processing ? "Memproses..." : "Generate Bulanan"}
                </Button>
            </FormGroup>

            <Tables
                columns={columns}
                data={datas}
                renderActions={(row) => (
                    <button className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Detail" onClick={() => handleDetail(row.id, row.admin_kpi_id)}>
                        <Icon icon="solar:rocket-2-outline" width="20" height="20" />
                    </button>
                )}
                showPagination={false}
            />
        </div>
    );
};

export default Index;
