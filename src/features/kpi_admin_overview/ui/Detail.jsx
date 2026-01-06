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
import { useDetail } from "../hooks/useDetail";

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
    const { data, loading, error } = useDetail();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    const groupedData = data.reduce((acc, item) => {
        acc[item.role] = acc[item.role] || [];
        acc[item.role].push(item);
        return acc;
    }, {});

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

            <div className="overflow-x-auto rounded-lg">
                <table className="w-full border-collaps text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-[#E0F7FA] text-[#004D40] uppercase tracking-wider text-xs border-b border-[#B2EBF2]">
                            <th className="p-3 text-center font-bold">
                                Jobdes
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Indikator
                            </th>
                            <th className="p-3 text-center font-bold bg-[#80DEEA]">
                                Poin
                            </th>
                            <th className="p-3 text-center font-bold bg-[#80DEEA]">
                                Bobot
                            </th>
                            <th className="p-3 text-center font-bold bg-[#80DEEA]">
                                Target
                            </th>
                            <th className="p-3 text-center font-bold bg-[#80DEEA]">
                                Actual
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedData).map(([role, items]) =>
                            items.map((row, index) => (
                                <tr
                                    key={`${role}-${index}`}
                                    className={`
                                            bg-white
                                            hover:bg-[#E0F7FA]/40
                                            transition-all
                                            ${
                                                index === 0
                                                    ? "border-t-4 border-[#00796B]"
                                                    : "border-t"
                                            }
                                            `}
                                >
                                    {index === 0 && (
                                        <td
                                            rowSpan={items.length}
                                            className="
                                                p-3
                                                text-center
                                                align-middle
                                                font-bold
                                                text-[#004D40]
                                                bg-[#E0F2F1]
                                                border-r-4 border-[#00796B]
                                                "
                                        >
                                            {role}
                                        </td>
                                    )}

                                    <td className="p-3 border text-[#00796B] font-semibold">
                                        {row.indikator}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {row.poin}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {row.bobot}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {row.target}
                                    </td>
                                    <td className="p-3 border text-center">
                                        {row.actual_score}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
