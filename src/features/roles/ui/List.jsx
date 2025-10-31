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
import { useRole } from "../hooks/useRole";

const Login = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Roles", to: "/roles", active: true },
    ];
    const { roles, loading, error, refetch } = useRole();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const data = [
        {
            id: 1,
            name: "Superadmin",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-12 03:43:38",
            deleted_at: null,
        },
        {
            id: 2,
            name: "Admin",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:24:51",
            deleted_at: null,
        },
        {
            id: 3,
            name: "BOD",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:24:03",
            deleted_at: null,
        },
        {
            id: 4,
            name: "Manager Departemen",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:25:02",
            deleted_at: null,
        },
        {
            id: 5,
            name: "Branch Manager",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:25:21",
            deleted_at: null,
        },
        {
            id: 6,
            name: "Staff",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-10-13 13:47:36",
            deleted_at: null,
        },
        {
            id: 17,
            name: "Supervisor",
            status: "active",
            created_at: "2025-10-27 11:33:44",
            updated_at: "2025-10-27 11:33:44",
            deleted_at: null,
        },
        {
            id: 18,
            name: "Asisten Manager",
            status: "active",
            created_at: "2025-10-28 08:27:52",
            updated_at: "2025-10-28 08:27:52",
            deleted_at: null,
        },
    ];
    const columns = [
        { key: "no", label: "No" },
        { key: "name", label: "Nama" },
        { key: "status", label: "Status" },
    ];
    const datas = roles.map((val, i) => ({
        no: i + 1,
        name: val.name,
        status: val.status,
    }));
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Roles List" items={breadcrumbItems} />
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
                    <label className="font-semibold text-2xl">0 Roles</label>
                </div>
                <div className="flex justify-end">
                    <Link to="/roles/create">
                        <Button className="bg-[#00ACC1] font-semibold border-[#00ACC1] w-64 h-12 hover:bg-[#00ACC1] hover:border-[#00ACC1] shadow-lg btn">
                            <i class="bi bi-plus-lg"></i> Tambah
                        </Button>
                    </Link>
                </div>
            </div>
            <Tables
                columns={columns}
                data={datas}
                renderActions={(item) => (
                    <>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() => console.log("Edit", item.id)}
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
                            onClick={() => console.log("Delete", item.id)}
                        >
                            <Icon
                                icon="solar:trash-bin-minimalistic-broken"
                                width="20"
                                height="20"
                            />
                        </button>
                    </>
                )}
            />
        </div>
    );
};

export default Login;
