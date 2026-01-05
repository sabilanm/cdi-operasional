import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useList } from "../hooks/useList";

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
    const { data, loading, error } = useList();
    const [openRow, setOpenRow] = useState(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "position_name", label: "Jobdesc" },
        { key: "indicator", label: "Indikator" },
        { key: "bobot", label: "Bobot" },
        { key: "target", label: "Target" },
    ];
    const datas = data.map((val, i) => ({
        no: i + 1,
        position_name: val.position_name,
        indicator: val.indicator,
        bobot: val.bobot,
        target: val.target,
        detail: val.detail,
        id: val.id,
    }));

    const handleEdit = (id) => {
        navigate(`/KPIAdmin/${id}/edit`);
    };

    const toggleCollapse = (id) => {
        setOpenRow(openRow === id ? null : id);
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Master KPI" items={breadcrumbItems} />
            <FormGroup className="flex justify-start">
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
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            borderTopRightRadius: "15px",
                            borderBottomRightRadius: "15px",
                        }}
                    />
                </InputGroup>
            </FormGroup>

            {/* Bagian bawah: total & button tambah */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">KPI</label>
                </div>
                <div className="flex justify-end">
                    <Link to="/KPIAdmin/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i class="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <Tables
                columns={columns}
                data={datas}
                renderActions={(row) => (
                    <>
                        {/* tombol collapse */}
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition"
                            title="Collapse"
                            onClick={() => toggleCollapse(row.id)}
                        >
                            <Icon
                                icon={openRow === row.id ? "mdi:chevron-up" : "mdi:chevron-down"}
                                width="20"
                                height="20"
                            />
                        </button>

                        {/* tombol detail/edit (tetap seperti sebelumnya) */}
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => handleEdit(row.id)}
                        >
                            <Icon
                                icon="solar:clapperboard-edit-broken"
                                width="20"
                                height="20"
                            />
                        </button>
                    </>
                )}
                renderCollapse={(row) => (
                    <div className="bg-gray-50 p-4 rounded-lg">
                        {" "}
                        <p className="font-semibold mb-2">Penilaian</p>{" "}
                        <ul className="space-y-1">
                            {" "}
                            {row.detail.map((d) => (
                                <li key={d.id} className="flex gap-2 text-sm">
                                    <span className="font-semibold w-6">
                                        {d.score}
                                    </span>
                                    <span>– {d.penilaian}</span>
                                </li>
                            ))}{" "}
                        </ul>{" "}
                    </div>
                )}
                showPagination={false}
            />
        </div>
    );
};

export default Index;
