import { Button, FormGroup, InputGroup, InputGroupText, Input,Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

const Index = () => {
    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Users", to: "/users", active: true },
    ];
    const navigate = useNavigate();
    const {
        data,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
        handleDeleteClick,
        handleDownloadTemplate,
        handleUploadExcel,
        uploadModal,
        setUploadModal,
        selectedFile,
        setSelectedFile,
    } = useUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const columns = [
        { key: "no", label: "No" },
        { key: "image", label: "Image" },
        { key: "name", label: "Nama" },
        { key: "id", label: "Username" },
        { key: "cabang", label: "Cabang" },
        { key: "posisi", label: "Jobdesc" },
        { key: "divisi", label: "Divisi" },
        { key: "status", label: "Status" },
    ];

    const datas = Array.isArray(data)
        ? data.map((val, i) => ({
              no: startRecord + i,
              image: val.image,
              name: val.name,
              id: val.username,
              cabang: val.branch_name,
              posisi: Array.isArray(val.positions) && val.positions.length > 0 ? val.positions.map((p) => p.position_name).join(", ") : "-",
              divisi: val.division_name,
              role: val.role_name,
              status: val.status,
              userid: val.id,
              gender: val.gender,
          }))
        : [];

    const handleEdit = (id) => {
        navigate(`/users/${id}/edit`);
    };
    const handleDetail = (id) => {
        navigate(`/users/${id}/detail`);
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Users List" items={breadcrumbItems} />
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    <label className="font-semibold text-2xl">{totalRecords} Users</label>
                </div>
                <div className="flex gap-2 justify-end">
                    {/* Download Template */}
                    <Button className="bg-[#FFCDC9] border-[#FFCDC9] hover:bg-[#FFCDC9] w-38 h-12 hover:border-[#FFCDC9] shadow-lg" onClick={handleDownloadTemplate}>
                        <i className="bi bi-download"></i> Unduh Template
                    </Button>

                    {/* Upload Excel */}
                    <Button className="bg-[#FD7979] border-[#FD7979] hover:bg-[#FD7979] w-36 h-12 hover:border-[#FFCDC9
                    ] shadow-lg" onClick={() => setUploadModal(true)}>
                        <i className="bi bi-upload"></i> Unggah Excel
                    </Button>

                    {/* Tambah */}
                    <Link to="/users/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-36 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i className="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>

            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) => (
                    <>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => handleDetail(datas.userid)}
                        >
                            <Icon
                                icon="solar:eye-broken"
                                width="20"
                                height="20"
                            />
                        </button>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => handleEdit(datas.userid)}
                        >
                            <Icon
                                icon="solar:clapperboard-edit-broken"
                                width="20"
                                height="20"
                            />
                        </button>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                            title="Delete"
                            onClick={() => handleDeleteClick(datas.userid)}
                        >
                            <Icon
                                icon="solar:trash-bin-minimalistic-broken"
                                width="20"
                                height="20"
                            />
                        </button>
                    </>
                )}
                page={page}
                length={length}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                handleRowsPerPageChange={handleRowsPerPageChange}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
            />
            {/* Upload Modal */}
            <Modal isOpen={uploadModal} toggle={() => setUploadModal(false)}>
                <ModalHeader toggle={() => setUploadModal(false)}>
                    Upload Excel Users
                </ModalHeader>
                <ModalBody>
                    <input
                        type="file"
                        className="form-control"
                        accept=".xlsx"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setUploadModal(false)}>Batal</Button>
                    <Button color="primary" onClick={handleUploadExcel}>Upload</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
