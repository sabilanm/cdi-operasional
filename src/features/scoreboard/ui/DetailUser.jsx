import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import { useScoreboardDetailUser } from "../hooks/useScoreboardDetailUser";
import { Icon } from "@iconify/react";
import "./../../../assets/css/custom.css";

const DetailUser = () => {
    const { branchId, userId, positionId } = useParams();
    const navigate = useNavigate();

    const { data, loading, error } = useScoreboardDetailUser(userId, positionId, branchId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!data || data.length === 0) return <p className="text-red-500">Data kosong...</p>;

    const breadcrumbItems = [
        { label: <i className="bi bi-house"></i>, to: "/", active: false },
        { label: "Scoreboards", to: "/scoreboards", active: false },
        { label: "Detail User", to: "", active: true },
    ];

    // Tentukan bulan dari tanggal pertama
    const firstDate = data[0]?.detail[0]?.start_date ?? null;
    const baseDate = new Date(firstDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Ambil score per hari dari API jika ada
    const getScore = (details, day) => {
        const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const found = details.find((d) => d.start_date === date);
        if (!found) return null;
        return found.score !== null ? Number(found.score) : null;
    };

    const handleDetail = (branchId, userId, positionId) => {
        navigate(`/scoreboards/${branchId}/user/${userId}/position/${positionId}`);
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div>
            <title>Scoreboard Detail</title>
            <Breadcrumbs title="Scoreboard Detail" items={breadcrumbItems} />

            <div className="overflow-x-auto" style={{ width: "1200px" }}>
                <div className="row">
                    <table style={{ padding: "10px", backgroundColor: "#e0f7fa", borderRadius: "10px" }} className="w-full border-separate text-sm mt-5">
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
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">Koefisien</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">AVG</th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA]">
                                    Score
                                    <label style={{ fontSize: "10px" }} className="text-danger">
                                        <br />
                                        koefisien x avg
                                    </label>
                                </th>
                                <th className="p-3 text-center font-bold bg-[#26C6DA] rounded-r-lg">Action</th>
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

                                        if (endDate > today) return null; // hari > hari ini -> null

                                        if (detailForDay.score !== null) return Number(detailForDay.score);

                                        // jika status 'Not Started' untuk hari <= hari ini
                                        if (detailForDay.status === "Not Started") return 0;

                                        return null;
                                    })
                                    .filter((s) => s !== null);

                                const total = scores.reduce((acc, val) => acc + val, 0);
                                const avg = scores.length > 0 ? (total / scores.length).toFixed(2) : 0;
                                const finalScore = avg * item.koefisien;

                                return (
                                    <tr key={idx} className="bg-white hover:bg-gray-50 border border-gray-200">
                                        <td className="p-3 align-top font-semibold text-gray-700 text-center">{idx + 1}</td>
                                        <td className="p-3 text-left font-medium text-gray-800">{item.jobdesc}</td>
                                        <td className="p-3 text-left font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: item.description }} />
                                        {days.map((d) => {
                                            const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                                            const detailForDay = item.detail.find((x) => x.start_date === date);
                                            if (!detailForDay) return <td key={d} className="bg-blue-200"></td>;

                                            const endDate = new Date(detailForDay.end_date);
                                            endDate.setHours(0, 0, 0, 0);

                                                let displayScore;
                                                // default background untuk hari > hari ini
                                            let bgClass = "bg-gray-500";

                                            if (endDate > today) {
                                                displayScore = "";
                                            } else if (detailForDay.score !== null) {
                                                displayScore = Number(detailForDay.score);
                                                bgClass = displayScore === 2 ? "bg-green-500 text-white" : displayScore === 0 ? "bg-red-500 text-white" : "";
                                            } else if (detailForDay.status === "Not Started") {
                                                displayScore = 0;
                                                bgClass = "bg-red-500 text-white";
                                            } else {
                                                displayScore = null;
                                            }

                                            return (
                                                <td key={d} className={`border text-center font-bold ${bgClass}`}>
                                                    {displayScore}
                                                </td>
                                            );
                                        })}

                                        <td className="p-3 text-center font-bold">{item.koefisien}</td>
                                        <td className="p-3 text-center font-bold">{avg}</td>
                                        <td className="p-3 text-center font-bold">{finalScore}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                                title="Detail"
                                                onClick={() => handleDetail(branchId, userId, positionId)}
                                            >
                                                <Icon icon="solar:eye-broken" width="20" height="20" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailUser;
