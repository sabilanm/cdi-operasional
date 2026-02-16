import React, { useState } from "react";
import Cookies from "js-cookie";
import CongratulationCard from "../../../components/dashboard/CongratulationCard";
import FilterDashboard from "./FilterDashboard";
import CalendarCard from "../../../components/dashboard/CalendarCard";
import ResumeSection from "../../../components/dashboard/ResumeSection";
import RepairNoteSection from "../../../components/dashboard/RepairNoteSection";
import CircleProgressCard from "../../../components/dashboard/CircleProgressCard";
import ReminderSection from "../../../components/dashboard/ReminderSection";
import BestScoreList from "../../../components/dashboard/BestScoreList";
import BestAdminCard from "../../../components/dashboard/BestAdminCard";
import Bestadminmale from "../../../assets/images/dashboard/male.png";
import BestadminFemale from "../../../assets/images/dashboard/female.png";
import Besticon from "../../../assets/images/dashboard/BestIcon.png";
import { useList } from "../hooks/list";

export default function DashboardRole4() {
    const name = Cookies.get("operasional_name");
    const gender = Cookies.get("operasional_gender");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { resume, bestRegional, bestNasional, feedback, loading, error, handleEditClick } =
        useList();

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

    const bestScores = [
        "PT Cobra Dental Jakarta",
        "PT Cobra Dental Yogyakarta",
        "PT Cobra Dental Surabaya",
        "PT Cobra Dental Bandung",
        "PT Cobra Dental Semarang",
    ];

    const statusColor = {
        approved: {
            bg: "bg-green-100",
            text: "text-green-600",
            btnBg: "bg-green-600",
        },
        rejected: {
            bg: "bg-red-100",
            text: "text-red-600",
            btnBg: "bg-red-600",
        },
        revision: {
            bg: "bg-yellow-100",
            text: "text-yellow-600",
            btnBg: "bg-yellow-600",
        },
        notstarted: {
            bg: "bg-gray-100",
            text: "text-gray-600",
            btnBg: "bg-gray-600",
        },
    };
    const resumeItems = Object.entries(resume).map(([key, value]) => ({
        value: value,
        label: key,
        ...statusColor[key],
    }));

    const repairNotes = feedback.map((item) => ({
        title: `${item.jobdesc}`, // Atau gunakan nama jobdesc jika ada relation
        desc: item.feedback,
        points: [], // API tidak return points, kosongkan atau sesuaikan
        admin: `${item.name}`, // Gunakan data user relation jika ada
        date: new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }),
    }));

    return (
        <div className="min-h-screen">
            <title>Operasional Dashboard</title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                <div className="lg:col-span-2 space-y-4">
                    <CongratulationCard name={name} percent={80} image={gender === 'female' ? BestadminFemale : Bestadminmale} />
                    <ResumeSection
                        items={resumeItems}
                        monthLabel="December | 2025"
                    />
                    <RepairNoteSection notes={repairNotes} />
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <CalendarCard events={calendar} height={355} />
                    <BestAdminCard
                        name={bestRegional.name}
                        branch={bestRegional.branch}
                        imageSrc={bestRegional.gender === 'female' ? BestadminFemale : Bestadminmale}
                        iconSrc={Besticon}
                        label="Karyawan"
                        score={bestRegional.skor}
                    />
                </div>
            </div>
        </div>
    );
}
