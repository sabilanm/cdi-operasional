import React, { useState } from "react";
import Cookies from "js-cookie";
import FilterDashboard from "./FilterDashboard";
import TotalScoreCard from "../../../components/dashboard/TotalScoreCard";
import CalendarCard from "../../../components/dashboard/CalendarCard";
import MonthlyStatisticChart from "../../../components/dashboard/MonthlyStatisticChart";
import HighlightList from "../../../components/dashboard/HighlightList";
import ProgressTable from "../../../components/dashboard/ProgressTable";
import BestScoreList from "../../../components/dashboard/BestScoreList";
import BestAdminCard from "../../../components/dashboard/BestAdminCard";
import Bestadminmale from "../../../assets/images/dashboard/male.png";
import BestadminFemale from "../../../assets/images/dashboard/female.png";
import Besticon from "../../../assets/images/dashboard/BestIcon.png";
import { useList } from "../hooks/list";

export default function DashboardRefactored() {
    const name = Cookies.get("operasional_name");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const {
        resume,
        bestRegional,
        bestNasional,
        feedback,
        loading,
        error,
        month,
        year,
        regional,
        topFive,
        setMonth,
        setYear,
        handleEditClick,
    } = useList();

    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];
    const monthName = monthOptions.find((m) => m.value === month)?.label || "";

    const totalScore = {
        month: `${monthName} | ${year}`,
        regional1: `${regional?.[1]?.nilai ?? 0}`,
        regional2: `${regional?.[2]?.nilai ?? 0}`,
    };
    const calendarEvents = [
        {
            topic: "Meeting Regional",
            start_date: "2025-12-10",
            end_date: "2025-12-12",
            class_link: "https://example.com",
        },
        {
            topic: "Audit Cabang",
            start_date: "2025-12-21",
            end_date: "2025-12-23",
            class_link: "https://example.com",
        },
    ];
    const calendar = calendarEvents.map((event) => ({
        title: event.topic,
        start: event.start_date,
        end: event.end_date,
        url: event.class_link,
    }));

    return (
        <div className="min-h-screen">
            <title>Operasional Dashboard</title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                <FilterDashboard
                    startDate={startDate}
                    endDate={endDate}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    onSearch={() => {}}
                />
                <TotalScoreCard
                    monthLabel={totalScore.month}
                    scores={[totalScore.regional1, totalScore.regional2]}
                />
                <CalendarCard events={calendar} height={360} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3 items-start">
                <BestScoreList items={topFive} />
                <BestAdminCard
                    name="Rizkiyah (Admin Piutang)"
                    imageSrc={Bestadminmale}
                    iconSrc={Besticon}
                    label="BOH"
                />
                <BestAdminCard
                    // name="Rizkiyah (Admin Piutang)"
                    // imageSrc={Bestadminmale}
                    // iconSrc={Besticon}
                    // label="Karyawan"

                    name={bestRegional.name}
                    branch={bestRegional.branch}
                    imageSrc={
                        bestRegional.gender === "female"
                            ? BestadminFemale
                            : Bestadminmale
                    }
                    iconSrc={Besticon}
                    label="Karyawan"
                    score={bestRegional.skor}
                />
            </div>
        </div>
    );
}
