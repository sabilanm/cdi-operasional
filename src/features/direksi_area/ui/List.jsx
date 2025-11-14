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
import { useDireksiArea } from "../hooks/useDireksiArea";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Direksi Area", to: "/direksi-area", active: true },
    ];
    const {
        data,
        loading,
        error,
        expandedItems,
        toggleExpand,
        handleEditClick,
        refetch: fetchBranchArea,
    } = useDireksiArea();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Direksi Area List" items={breadcrumbItems} />
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
                    <label className="font-semibold text-2xl">
                        {data?.length || 0} Direksi Area
                    </label>
                </div>
                <div className="flex justify-end">
                    <Link to="/direksi-area/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i className="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                >
                    {/* Header - selalu visible dengan tombol Edit & Delete */}
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 cursor-pointer hover:from-blue-600 hover:to-cyan-600 transition-all"
                        onClick={() => toggleExpand(item.id)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {index + 1}
                                </span>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">
                                        {item.c_level_name}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {/* Tombol Edit & Delete di Header */}
                                <div className="flex space-x-2 mr-4">
                                    <button
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition transform hover:scale-105"
                                        title="Edit"
                                        onClick={(e) => handleEditClick(item.id, e)}
                                    >
                                        <Icon
                                            icon="solar:clapperboard-edit-broken"
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition transform hover:scale-105"
                                        title="Delete"
                                        // onClick={(e) => handleDeleteClick(item.id, e)}
                                    >
                                        <Icon
                                            icon="solar:trash-bin-minimalistic-broken"
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                </div>

                                <span className="text-blue-100 text-sm">
                                    ID: {item.id}
                                </span>
                                <span className="text-blue-100 text-sm">
                                    {item.divisions?.length || 0} Division
                                </span>
                                <button className="text-white hover:text-blue-200 transition transform hover:scale-110">
                                    {/* Icon expand bisa ditambahkan jika perlu */}
                                </button>
                            </div>
                        </div>

                        {expandedItems[item.id] && (
                            <div className="p-4 border-t border-gray-200">
                                {/* Header table untuk divisions */}
                                <div className="grid grid-cols-12 gap-4 mb-3 px-4 py-2 bg-gray-50 rounded-lg font-semibold text-gray-700">
                                    <div className="col-span-2">No</div>
                                    <div className="col-span-10">
                                        Nama Divisi
                                    </div>
                                </div>

                                {/* List divisions */}
                                {item.divisions && item.divisions.length > 0 ? (
                                    item.divisions.map((division, divisionIndex) => (
                                        <div
                                            key={division.id}
                                            className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="col-span-2 text-gray-600">
                                                {divisionIndex + 1}
                                            </div>
                                            <div className="col-span-10 text-gray-800">
                                                {division.division_name || "-"}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        Tidak ada divisi yang terhubung
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
