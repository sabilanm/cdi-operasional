import React, { useState } from "react";
import Cookies from "js-cookie";
import FilterDashboard from "./FilterDashboard";
import CalendarCard from "../../../components/dashboard/CalendarCard";
import MonthlyStatisticChart from "../../../components/dashboard/MonthlyStatisticChart";
import HighlightList from "../../../components/dashboard/HighlightList";
import ProgressTable from "../../../components/dashboard/ProgressTable";
import BestScoreList from "../../../components/dashboard/BestScoreList";
import ActiveTaskTable from "../../../components/dashboard/ActiveTaskTable";
import BestAdminCard from "../../../components/dashboard/BestAdminCard";
import Bestadminmale from "../../../assets/images/dashboard/male.png";
import BestadminFemale from "../../../assets/images/dashboard/female.png";
import Besticon from "../../../assets/images/dashboard/BestIcon.png";
import { useList } from "../hooks/list";
import { useTopList } from "../hooks/topList";

export default function DashboardRole4() {
    const name = Cookies.get("operasional_name");
    const user = Cookies.get("operasional_user");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const { resume, bestRegional, bestNasional, feedback, error, loading } =
        useList(month, year);
    const { topFive } = useTopList(month, year);
    let regional = null;
    if (user === "37") {
        regional = "Regional 2";
    } else if (user === "36") {
        regional = "Regional 1";
    }

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                <div className="lg:col-span-2 space-y-4">
                    <FilterDashboard
                        startDate={startDate}
                        endDate={endDate}
                        month={month}
                        setMonth={setMonth}
                        year={year}
                        setYear={setYear}
                        onSearch={() => {}}
                        layout="horizontal"
                    />
                    <BestScoreList items={topFive} />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <CalendarCard events={calendar} height={355} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
                        <BestAdminCard
                            name={bestNasional.name}
                            branch={bestNasional.branch}
                            imageSrc={
                                bestNasional.gender === "female"
                                    ? BestadminFemale
                                    : Bestadminmale
                            }
                            iconSrc={Besticon}
                            label="Nasional"
                            score={bestNasional.skor}
                        />
                        <BestAdminCard
                            name={bestRegional.name}
                            branch={bestRegional.branch}
                            imageSrc={
                                bestRegional.gender === "female"
                                    ? BestadminFemale
                                    : Bestadminmale
                            }
                            iconSrc={Besticon}
                            label={regional}
                            score={bestRegional.skor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
