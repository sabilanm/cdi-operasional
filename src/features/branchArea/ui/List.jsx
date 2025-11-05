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
import { useBranchArea } from "../hooks/useBranchArea";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Division", to: "/division", active: true },
    ];
    const navigate = useNavigate();
    const { data, loading, error, refetch } = useBranchArea();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "name", label: "Nama" },
        { key: "status", label: "Status" },
    ];
    // const datas = division.map((val, i) => ({
    //     no: i + 1,
    //     name: val.name,
    //     status: val.status,
    //     id: val.id,
    // }));
    const handleEdit = (id) => {
        navigate(`/division/${id}/edit`);
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Division List" items={breadcrumbItems} />
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
                    <label className="font-semibold text-2xl">0 Division</label>
                </div>
                <div className="flex justify-end">
                    <Link to="/branch-areas/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i class="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            {data.map((item, index) => (
                <div
                    key={item.area_id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                >
                    {/* Header - selalu visible dengan tombol Edit & Delete */}
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 cursor-pointer hover:from-blue-600 hover:to-cyan-600 transition-all"
                        // onClick={() => toggleExpand(item.area_id)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {/* {getRecordNumber(index)} */}
                                </span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">
                                        {item.area}
                                    </h4>
                                    <p className="text-blue-100 text-sm">
                                        PIC: {item.pic}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {/* Tombol Edit & Delete di Header */}
                                <div className="flex space-x-2 mr-4">
                                    <button
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition transform hover:scale-105"
                                        title="Detail"
                                        // onClick={(e) => handleDetailClick(item.area_id, e)}
                                    >
                                        <Icon
                                            icon="solar:eye-linear"
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition transform hover:scale-105"
                                        title="Edit"
                                        // onClick={(e) => handleEditClick(item.area_id, e)}
                                    >
                                        <Icon
                                            icon="solar:clapperboard-edit-broken"
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition transform hover:scale-105"
                                        title="Delete"
                                        // onClick={(e) => handleDeleteClick(item.area_id, e)}
                                    >
                                        <Icon
                                            icon="solar:trash-bin-minimalistic-broken"
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                </div>

                                <span className="text-blue-100 text-sm">
                                    ID: {item.area_id}
                                </span>
                                <span className="text-blue-100 text-sm">
                                    {item.branches?.length || 0} Branch
                                    {item.branches?.length !== 1 ? "es" : ""}
                                </span>
                                <button className="text-white hover:text-blue-200 transition transform hover:scale-110">
                                    {/* {expandedItems[item.area_id] ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />} */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
