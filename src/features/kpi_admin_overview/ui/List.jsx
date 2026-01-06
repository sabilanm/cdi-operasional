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

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const columns = [
        { key: "no", label: "No" },
        { key: "branch", label: "Branch" },
        { key: "periode", label: "Periode" },
    ];
    const datas = data.map((val, i) => ({
        no: i + 1,
        branch: val.branch_name,
        periode: val.periode,
        id: val.branch_id,
    }));
    // console.log(data);

    const handleDetail = (id, date) => {
        const periode = date.slice(0, 7);
        navigate(`/overview/${id}/detail`, {
            state: periode,
        });
    };
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Overview KPI Admin" items={breadcrumbItems} />
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

            <Tables
                columns={columns}
                data={datas}
                renderActions={(datas) => (
                    <>
                        <button
                            className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Edit"
                            onClick={() =>
                                handleDetail(datas.id, datas.periode)
                            }
                        >
                            <Icon
                                icon="solar:eye-outline"
                                width="20"
                                height="20"
                            />
                        </button>
                    </>
                )}
                showPagination={false}
            />
        </div>
    );
};

export default Index;
