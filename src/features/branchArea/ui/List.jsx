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
import Pagination from "../../../components/common/Pagination";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Branch Area", to: "/branch-areas", active: true },
    ];
    const {
        data,
        loading,
        error,
        expandedItems,
        toggleExpand,
        handleEditClick,
        handleDeleteClick,
        refetch: fetchBranchArea,
        searchQuery,
        setSearchQuery,
        totalRecords,
        startRecord,
        page,
        length,
        rowsPerPageOptions,
        handleRowsPerPageChange,
        handlePreviousPage,
        handleNextPage,
    } = useBranchArea();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const dataArray = data || [];
    const actualTotalRecords = totalRecords || dataArray.length || 0;

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Branch Area List" items={breadcrumbItems} />
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
            </FormGroup>

            {/* Bagian bawah: total & button tambah */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">
                        {actualTotalRecords} Branch Area
                    </label>
                </div>
                <div className="flex justify-end">
                    <Link to="/branch-areas/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i className="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            {dataArray.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada data Branch Area
                </div>
            ) : (
                dataArray.map((item, index) => (
                    <div
                        key={item.area_id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-1"
                    >
                        {/* Header - selalu visible dengan tombol Edit & Delete */}
                        <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 cursor-pointer hover:from-blue-600 hover:to-cyan-600 transition-all"
                            onClick={() => toggleExpand(item.area_id)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                        {startRecord + index}
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">
                                            {item.area || "N/A"}
                                        </h4>
                                        <p className="text-blue-100 text-sm">
                                            PIC: {item.pic || "N/A"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {/* Tombol Edit & Delete di Header */}
                                    <div className="flex space-x-2 mr-4">
                                        <button
                                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition transform hover:scale-105"
                                            title="Edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(item.area_id, e);
                                            }}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(item.area_id, e);
                                            }}
                                        >
                                            <Icon
                                                icon="solar:trash-bin-minimalistic-broken"
                                                width="20"
                                                height="20"
                                            />
                                        </button>
                                    </div>

                                    <span className="text-blue-100 text-sm">
                                        ID: {item.area_id || "N/A"}
                                    </span>
                                    <span className="text-blue-100 text-sm">
                                        {(item.branches && item.branches.length) || 0} Branch
                                        {(item.branches && item.branches.length !== 1) ? "es" : ""}
                                    </span>
                                    <button className="text-white hover:text-blue-200 transition transform hover:scale-110">
                                        <Icon 
                                            icon={expandedItems[item.area_id] ? "mdi:chevron-up" : "mdi:chevron-down"} 
                                            width="20" 
                                            height="20" 
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content yang expandable */}
                        {expandedItems[item.area_id] && (
                            <div className="p-4 bg-gray-50">
                                {/* Header table untuk branches */}
                                <div className="grid grid-cols-12 gap-4 mb-3 px-4 py-2 bg-white rounded-lg font-semibold text-gray-700 border">
                                    <div className="col-span-1">No</div>
                                    <div className="col-span-3">Kode Cabang</div>
                                    <div className="col-span-8">Nama Cabang</div>
                                </div>

                                {/* List branches */}
                                {item.branches && item.branches.length > 0 ? (
                                    item.branches.map((branch, branchIndex) => (
                                        <div
                                            key={branch.branch_id}
                                            className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 hover:bg-blue-50 transition-colors items-center"
                                        >
                                            <div className="col-span-1 text-gray-600">
                                                {branchIndex + 1}
                                            </div>
                                            <div className="col-span-3 font-medium text-gray-800">
                                                {branch.kode_cabang || "-"}
                                            </div>
                                            <div className="col-span-8 text-gray-600">
                                                {branch.cabang || "-"}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500 bg-white rounded-lg border">
                                        Tidak ada branch yang terhubung
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
            <Pagination
                page={page}
                length={length}
                totalRecords={actualTotalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={handleRowsPerPageChange}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default Index;
