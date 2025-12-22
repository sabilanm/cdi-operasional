// src/features/jobdesc_admin/ui/List.jsx
import { useState } from "react";
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Tables from "../../../components/ui/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useJobdesc } from "../hooks/useList";

const Index = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const base = location.pathname;
    const [showDescModal, setShowDescModal] = useState(false);

    const [descRow, setDescRow] = useState(null);

    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false, style: { textDecoration: "none" } },
        { label: "Jobdesc", to: base, active: true },
    ];

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

    const [searchFilters, setSearchFilters] = useState({
        position: "",
        type: "",
        methode: "",
    });

    const { jobdescs, loading, error, page, length, totalRecords, rowsPerPageOptions, setFilters, fetchJobdesc, handleRowsPerPageChange, handleNextPage, handlePreviousPage } =
        useJobdesc(searchFilters);

    const handleSort = (column, direction) => {
        setSortColumn(column);
        setSortDirection(direction);

        // Filter Sorting
        setFilters({
            ...searchFilters,
            sortField: column,
            sortDirection: direction,
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = () => {
        setFilters({
            ...searchFilters,
            sortField: sortColumn,
            sortDirection: sortDirection,
        });

        fetchJobdesc(0, length, {
            ...searchFilters,
            sortField: sortColumn,
            sortDirection: sortDirection,
        });
    };

    const datas = (jobdescs.data || []).map((val, i) => ({
        no: page * length + i + 1,
        position: val.position,
        jobdesc: val.jobdesc,
        detail: val.description,
        koefisien: val.koefisien,
        type: val.type,
        repetition: val.repetition,
        methode: val.methode,
        id: val.id,

        _raw: {
            ...val,
            onOpenDescription: (row) => {
                setDescRow(row);
                setShowDescModal(true);
            }
        }
    }));

    const columns = [
        { key: "no", label: "No", width: "5%" },
        { key: "position", label: "Jobdesc" },
        { key: "jobdesc", label: "Title" },
        { key: "detail", label: "Deskripsi" },
        { key: "koefisien", label: "Koefisien" },
        { key: "type", label: "Tipe" },
    ];

    const handleEdit = (id) => navigate(`${id}/edit`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Jobdesc List" items={breadcrumbItems} />

            {/* Search Filters */}
            <FormGroup className="flex gap-2 mb-4">
                <Input
                    name="position"
                    placeholder="Cari Posisi"
                    value={searchFilters.position}
                    onChange={handleFilterChange}
                    className="w-1/4 rounded-lg"
                />
                <Input
                    name="type"
                    placeholder="Cari Tipe"
                    value={searchFilters.type}
                    onChange={handleFilterChange}
                    className="w-1/4 rounded-lg"
                />
                <Input
                    name="methode"
                    placeholder="Cari Metode"
                    value={searchFilters.methode}
                    onChange={handleFilterChange}
                    className="w-1/4 rounded-lg"
                />
                <Button
                    color="primary"
                    onClick={handleFilterSubmit}
                    className="flex items-center gap-2"
                >
                    <Icon icon="solar:magnifer-broken" width="18" height="18" />
                    Cari
                </Button>
            </FormGroup>

            {/* Header Table + Tambah Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-center">
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
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => handleEdit(row.id)}
                        >
                            <Icon icon="solar:clapperboard-edit-broken" width="20" height="20" />
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
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                enableSorting={true}
                onOpenDetail={(row) => {
                    setDescRow(row);
                    setShowDescModal(true);
                }}
            />

            {/* MODAL DESKRIPSI */}
            <Modal isOpen={showDescModal} toggle={() => setShowDescModal(false)} size="lg">
                <ModalHeader toggle={() => setShowDescModal(false)}>
                    Detail Deskripsi
                </ModalHeader>

                <ModalBody>
                    <div className="mb-3">
                        <strong>Deskripsi</strong>
                        <div
                            className="border rounded p-2 mt-1 bg-gray-50"
                            dangerouslySetInnerHTML={{
                                __html: descRow?.detail || "-"
                            }}
                        />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowDescModal(false)}>
                        Tutup
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Index;
