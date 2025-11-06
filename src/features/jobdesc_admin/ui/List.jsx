// src/features/jobdesc_admin/ui/List.jsx

import { useState } from "react";
import { Button, FormGroup, InputGroup, InputGroupText, Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import Pagination from "../../../components/common/Pagination";
import { Icon } from "@iconify/react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useJobdesc } from "../hooks/useList";

const Index = () => {
    const location = useLocation();
    const base = location.pathname;
    const navigate = useNavigate();

    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Jobdesc", to: base, active: true },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { jobdescs, loading, error, fetchJobdesc } = useJobdesc(currentPage, itemsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const totalRecords = jobdescs.recordsTotal || 0;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentData = jobdescs.data || [];

    const columns = [
        { key: "no", label: "No" },
        { key: "position", label: "Posisi" },
        { key: "jobdesc", label: "Jobdesc" },
        { key: "description", label: "Detail" },
        { key: "koefisien", label: "Koefisien" },
        { key: "type", label: "Tipe" },
        { key: "repetition", label: "Pengulangan" },
        { key: "methode", label: "Metode" },
    ];

    const datas = currentData.map((val, i) => ({
        no: indexOfFirst + i + 1,
        position: val.position,
        jobdesc: val.jobdesc,
        description: val.description,
        koefisien: val.koefisien,
        type: val.type,
        repetition: val.repetition,
        methode: val.methode,
        id: val.id,
    }));

    const handleEdit = (id) => navigate(`${id}/edit`);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchJobdesc(page, itemsPerPage);
    };

    const handleRowsPerPageChange = (e) => {
        const newLength = Number(e.target.value);
        setItemsPerPage(newLength);
        setCurrentPage(1);
        fetchJobdesc(1, newLength);
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Jobdesc List" items={breadcrumbItems} />

            {/* Search */}
            <FormGroup className="flex justify-start mb-4">
                <InputGroup className="w-1/2 h-12">
                    <InputGroupText style={{ borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}>
                        <BiSearch />
                    </InputGroupText>
                    <Input placeholder="Cari nama" style={{ borderTopRightRadius: "15px", borderBottomRightRadius: "15px" }} />
                </InputGroup>
            </FormGroup>

            {/* Header Table + Tambah Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2 items-center">
                <div className="ml-3">
                    <label className="font-semibold text-2xl">{totalRecords} Jobdesc</label>
                </div>
                <div className="flex justify-end">
                    <Link to="create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i className="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <Tables
                columns={columns}
                data={datas}
                renderActions={(row) => (
                    <>
                        <button className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit" onClick={() => handleEdit(row.id)}>
                            <Icon icon="solar:clapperboard-edit-broken" width="20" height="20" />
                        </button>
                        <button className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition" title="Delete" onClick={() => console.log("Delete", row.id)}>
                            <Icon icon="solar:trash-bin-minimalistic-broken" width="20" height="20" />
                        </button>
                    </>
                )}
            />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalRecords={totalRecords}
                length={itemsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                handleRowsPerPageChange={handleRowsPerPageChange}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Index;
