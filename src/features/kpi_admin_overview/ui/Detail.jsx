import { FormGroup, InputGroup, InputGroupText, Input } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDetail } from "../hooks/useDetail";
import { useLocation, useParams } from "react-router-dom";

const Index = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "KPI", to: "overview", active: false },
        { label: "Detail", active: true },
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const periode = location.state;
    const { id } = useParams();
    const { data, loading, error } = useDetail(id, periode);
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Overview KPI Admin" items={breadcrumbItems} />
            {/* <FormGroup className="flex justify-start">
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
            </FormGroup> */}

            <div className="overflow-x-auto rounded-lg mt-4">
                <table className="w-full border-collaps text-sm">
                    <thead className="sticky top-0 z-10">
                        <tr className="bg-[#E0F7FA] text-[#004D40] font-bold uppercase tracking-wider border-b border-[#B2EBF2]">
                            <th className="p-3 text-center font-bold">
                                Jobdes
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Indikator
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Poin
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Bobot
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Target
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                Actual
                            </th>
                            <th className="p-3 text-center font-bold bg-[#B2DFDB]">
                                KPI Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([role, items]) => {
                            const totalBobot = items.reduce(
                                (sum, item) => sum + Number(item.bobot || 0),
                                0
                            );
                            const totalPoin = items.reduce(
                                (sum, item) => sum + Number(item.score || 0),
                                0
                            );
                            const totalTargert = items.reduce(
                                (sum, item) => sum + Number(item.target || 0),
                                0
                            );

                            const totalActual = items.reduce(
                                (sum, item) =>
                                    sum +
                                    Number(item.score || 0) *
                                        Number(item.bobot || 0),
                                0
                            );

                            return (
                                <>
                                    {items.map((row, index) => {
                                        const score = Number(row.score || 0);
                                        const bobot = Number(row.bobot || 0);
                                        const target = Number(row.target || 0);
                                        const actual = score * bobot;

                                        return (
                                            <tr
                                                key={row.id}
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
                                                            p-2
                                                            text-center
                                                            align-middle
                                                            font-bold
                                                            text-[#004D40]
                                                            bg-[#E0F2F1]
                                                            border-r-4 border-[#00796B]
                                                        "
                                                    >
                                                        {row.username}
                                                    </td>
                                                )}

                                                <td className="p-3 border text-[#00796B] font-semibold">
                                                    {row.indicator}
                                                </td>

                                                <td className="p-3 border text-center">
                                                    {score}
                                                </td>
                                                <td className="p-3 border text-center">
                                                    {bobot}
                                                </td>
                                                <td className="p-3 border text-center">
                                                    {target}
                                                </td>
                                                <td className="p-3 border text-center font-bold">
                                                    {actual}
                                                </td>
                                                {index === 0 && (
                                                    <td
                                                        rowSpan={items.length}
                                                        className="
                                                            p-2
                                                            text-center
                                                            align-middle
                                                            font-bold
                                                            border-r-4 border-[#00796B]
                                                        "
                                                    ></td>
                                                )}
                                            </tr>
                                        );
                                    })}

                                    <tr className="bg-[#B2DFDB] text-[#004D40] font-bold">
                                        <td
                                            colSpan={2}
                                            className="p-3 text-center"
                                        >
                                            SCORE
                                        </td>
                                        <td className="p-3 text-center">
                                            {totalPoin}
                                        </td>
                                        <td className="p-3 text-center">
                                            {totalBobot}
                                        </td>
                                        <td className="p-3 text-center">
                                            {totalTargert}
                                        </td>
                                        <td className="p-3 text-center">
                                            {totalActual}
                                        </td>
                                        <td className="p-3 text-center">
                                            {(
                                                (totalActual / totalTargert) *
                                                100
                                            ).toFixed(2)}
                                            %
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
