import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CardTitle } from "reactstrap";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { useScoreboardDetailUser } from "../hooks/useScoreboardDetailUser";
import { Icon } from "@iconify/react";
import "./../../../assets/css/custom.css";
import "./Style.css";

const DetailUser = () => {
    const { branchId, userId, positionId } = useParams();
    const navigate = useNavigate();

    const { data, additionals, loading, error, zoomClass } = useScoreboardDetailUser(userId, positionId, branchId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data || data.length === 0) return <p className="text-red-500">Data kosong...</p>;

    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false },
        { label: "Scoreboards", to: "/scoreboards", active: false },
        {
            label: "Scoreboard Detail",
            to: `/scoreboards/${branchId}/detail`,
            active: false,
        },
        { label: "Detail User", to: "", active: true },
    ];

    // Tentukan bulan dari tanggal pertama
    const username = additionals.name;
    const position = data[0]?.position;
    const firstDetailItem = data.find((item) => item.detail && item.detail.length > 0);
    const firstDate = firstDetailItem?.detail[0]?.start_date ?? new Date();
    const baseDate = new Date(firstDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Hitung total score seluruh item
    const totalScoreAll = data
        .map((item) => {
            const scores = days
                .map((d) => {
                    const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                    const detailForDay = item.detail.find((x) => x.start_date === date);
                    if (!detailForDay) return null;

                    const endDate = new Date(detailForDay.end_date);
                    endDate.setHours(0, 0, 0, 0);

                    if (endDate > today) return null;
                    if (detailForDay.status === "Approved" || detailForDay.status === "Rejected") {
                        return detailForDay.score !== null ? Number(detailForDay.score) : 2;
                    }
                    if (detailForDay.status === "Rejected") {
                        return detailForDay.score !== null ? Number(detailForDay.score) : "";
                    }
                    if (detailForDay.status === "Not Started" && !detailForDay.submitted_date && endDate < tomorrow) {
                        return detailForDay.score !== null ? Number(detailForDay.score) : 0;
                    }
                    if (detailForDay.score !== null) return Number(detailForDay.score);
                    if (detailForDay.status === "Not Started") return 0;
                    return null;
                })
                .filter((s) => s !== null);

            const total = scores.reduce((acc, val) => acc + val, 0);
            const avg = scores.length > 0 ? total / scores.length : 0;
            return avg * item.koefisien;
        })
        .reduce((acc, val) => acc + val, 0);

    // Hitung total avg seluruh jobdesc
    const totalAvg = data
        .map((item) => {
            const scores = days
            .map((d) => {
                const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                const detailForDay = item.detail.find((x) => x.start_date === date);
                if (!detailForDay) return null;

                const endDate = new Date(detailForDay.end_date);
                endDate.setHours(0, 0, 0, 0);

                if (endDate > today) return null;
                if (detailForDay.status === "Approved") return detailForDay.score !== null ? Number(detailForDay.score) : 2;
                if (detailForDay.status === "Not Started" && !detailForDay.submitted_date && endDate < tomorrow) return detailForDay.score !== null ? Number(detailForDay.score) : 0;
                if (detailForDay.score !== null) return Number(detailForDay.score);
                if (detailForDay.status === "Not Started") return 0;
                return null;
            })
            .filter((s) => s !== null);

            const total = scores.reduce((acc, val) => acc + val, 0);
            const avg = scores.length > 0 ? total / scores.length : 0;
            return avg; // Kembalikan avg tiap jobdesc
        })
        .reduce((acc, val) => acc + val, 0); // Jumlahkan semua avg

    const totalScoreValiditas = data
        .map((item) => {
            // Hitung avg per row
            const scores = days
            .map((d) => {
                const date = `${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
                const detailForDay = item.detail.find(x => x.start_date === date);
                if (!detailForDay) return null;

                const endDate = new Date(detailForDay.end_date);
                endDate.setHours(0,0,0,0);

                if (endDate > today) return null;
                if (detailForDay.status === "Approved") return detailForDay.score !== null ? Number(detailForDay.score) : 2;
                if (detailForDay.status === "Not Started" && !detailForDay.submitted_date && endDate < tomorrow) return detailForDay.score !== null ? Number(detailForDay.score) : 0;
                if (detailForDay.score !== null) return Number(detailForDay.score);
                if (detailForDay.status === "Not Started") return 0;
                return null;
            })
            .filter(s => s !== null);

            const total = scores.reduce((acc, val) => acc + val, 0);
            const avg = scores.length > 0 ? total / scores.length : 0;

            // Score Validitas row
            return avg === 2 ? item.koefisien * 2 : 0;
        })
        .reduce((acc, val) => acc + val, 0); // jumlahkan semua row


    return (
        <div>
            <title>Scoreboard Detail</title>
            <Breadcrumbs title="Scoreboard Detail" items={breadcrumbItems} />
            <CardTitle tag="h6" className="text-center text-3xl font-weight-bold mb-5">
                <h3 style={{ color: "#26c6da", fontWeight: "500" }}> {position} </h3>
                Detail {username}
            </CardTitle>

            <div className={`table-wrapper ${zoomClass}`}>
                <div className="overflow-x-auto rounded-lg">
                    <table
                        style={{
                            padding: "10px",
                            backgroundColor: "#e0f7fa",
                            borderRadius: "10px",
                        }}
                        className="min-w-[1500px] border-separate text-sm mt-5"
                    >
                        <thead>
                            <tr className="text-left text-gray-600 shadow bg-[#26C6DA] text-white transition">
                                <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-l-lg">No</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">Jobdesc</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">Description</th>
                                {days.map((d) => (
                                    <th key={d} className="p-2 text-center font-bold bg-[#26C6DA]">
                                        {d}
                                    </th>
                                ))}
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">0</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">2</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">Score Validitas</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">Koefisien</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">AVG</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-r-lg">
                                    Score
                                    <label style={{ fontSize: "10px" }} className="text-danger">
                                        <br />
                                        koefisien x avg
                                    </label>
                                </th>
                                {/* <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-r-lg">Action</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, idx) => {
                                const scores = days
                                    .map((d) => {
                                        const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                                        const detailForDay = item.detail.find((x) => x.start_date === date);
                                        if (!detailForDay) return null;

                                        const endDate = new Date(detailForDay.end_date);
                                        endDate.setHours(0, 0, 0, 0);

                                        if (endDate > today) return null; // hari > hari ini

                                        if (detailForDay.status === "Approved") {
                                            return detailForDay.score !== null ? Number(detailForDay.score) : 2;
                                        }

                                        if (detailForDay.status === "Not Started" && !detailForDay.submitted_date && endDate < tomorrow) {
                                            return detailForDay.score !== null ? Number(detailForDay.score) : 0;
                                        }

                                        if (detailForDay.score !== null) return Number(detailForDay.score);

                                        if (detailForDay.status === "Not Started") return 0;

                                        return null;
                                    })
                                    .filter((s) => s !== null);

                                const total = scores.reduce((acc, val) => acc + val, 0);
                                const avg = scores.length > 0 ? (total / scores.length).toFixed(2) : 0;
                                const finalScore =( avg * item.koefisien).toFixed(2);

                                return (
                                    <tr key={idx} className="bg-white hover:bg-gray-50 border border-gray-200">
                                        <td className="p-3 font-semibold text-gray-700 text-center">{idx + 1}</td>
                                        <td className="p-3 text-left font-medium text-gray-800">{item.jobdesc}</td>
                                        <td
                                            className="p-3 text-left font-medium text-gray-800"
                                            dangerouslySetInnerHTML={{
                                                __html: item.description,
                                            }}
                                        />
                                        {days.map((d) => {
                                            const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                                            const detailForDay = item.detail.find((x) => x.start_date === date);
                                            if (!detailForDay) return <td key={d} className="bg-blue-200"></td>;

                                            const endDate = new Date(detailForDay.end_date);
                                            endDate.setHours(0, 0, 0, 0);

                                            let displayScore;
                                            // default background untuk hari > hari ini
                                            let bgClass = "bg-gray-500";
                                            let displayStatus = detailForDay.status;

                                            if (endDate > today && detailForDay.status === "Not Started" ) {
                                                displayScore = "";
                                                bgClass = "bg-yellow-300";
                                            } else if (detailForDay.status === "Approved") {
                                                displayScore = detailForDay.score !== null ? Number(detailForDay.score) : 2;
                                                bgClass = "bg-green-500 text-white";
                                            } else if (detailForDay.status === "Rejected") {
                                                displayScore = detailForDay.score !== null ? Number(detailForDay.score) : 2;
                                                bgClass = "bg-orange-500 text-white";
                                            } else if (detailForDay.status === "Not Started" && !detailForDay.submitted_date && endDate < tomorrow) {
                                                // Kondisi baru: Not Started, belum submit, tanggal sudah lewat → beri 2
                                                displayScore = 0;
                                                bgClass = "bg-red-500 text-white";
                                                displayStatus = "Doesn't work";
                                            } else if (detailForDay.submitted_date !== null && detailForDay.status === "Approved") {
                                                displayScore = Number(detailForDay.score);
                                                bgClass = displayScore === 2 ? "bg-green-500 text-white" : displayScore === 0 ? "bg-red-500 text-white" : "";
                                            } else if (detailForDay.status === "Not Started" && detailForDay.submitted_date !== null) {
                                                displayScore = 0;
                                                bgClass = "bg-blue-500 text-white";
                                                displayStatus = "Waiting Approve";
                                            } else {
                                                displayScore = 0; // default untuk safety
                                                bgClass = "bg-gray-500 text-white";
                                            }

                                            return (
                                                <td key={d} className={`border text-center font-bold ${bgClass}`} title={detailForDay.status}>
                                                    {displayScore}
                                                </td>
                                            );
                                        })}

                                        <td className="p-3 text-center font-bold">{avg === "2.00" ? "" : <span>✔️</span>}</td>
                                        <td className="p-3 text-center font-bold">{avg !== "2.00" ? "" : <span>✔️</span>}</td>
                                        <td className="p-3 text-center font-bold">{avg !== "2.00" ? "0" : item.koefisien*avg }</td>
                                        <td className="p-3 text-center font-bold">{item.koefisien}</td>
                                        <td className="p-3 text-center font-bold">{avg}</td>
                                        <td className="p-3 text-center font-bold">{finalScore}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        <tfoot>
                            <tr className="bg-gray-400 font-bold">
                                <td colSpan={4 + days.length + 1} className="rounded-l-lg p-3 text-right">
                                    Total Score:
                                </td>
                                <td className="p-3 text-center">
                                    <td>{(totalScoreValiditas/200)*100} %</td>
                                </td>
                                <td className="p-3 text-center">
                                    <td>100</td>
                                </td>
                                <td className="p-3 text-center">
                                    <td>{totalAvg.toFixed(2)}</td>
                                </td>
                                <td className="p-3 text-center rounded-r-lg">
                                    <td>{totalScoreAll.toFixed(1)}</td>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailUser;
