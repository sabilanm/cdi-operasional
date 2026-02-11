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
import Bestadminmale from "../../../assets/images/dashboard/Bestadminmale.png";
import Besticon from "../../../assets/images/dashboard/BestIcon.png";
import { useList } from "../hooks/list";

export default function DashboardRole4() {
    const name = Cookies.get("operasional_name");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { resume, bestBOH, feedback, loading, error, handleEditClick } =
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

    const repairNotes = [
        {
            title: "Cash Opname Harian",
            desc: "Proses cash opname tidak konsisten setiap hari, sering terlambat.",
            points: [
                "Checklist harian di awal shift",
                "PIC bergilir tiap minggu",
                "Laporan via grup WA internal",
            ],
            admin: "Admin Barang",
            date: "31 Oktober 2025",
        },
        {
            title: "Pelaporan E-Report",
            desc: "Laporan sering terlambat / tidak lengkap.",
            points: [
                "Reminder otomatis email / WhatsApp",
                "Template standar laporan",
            ],
            admin: "Admin Piutang",
            date: "31 Oktober 2025",
        },
    ];

    return (
        <div className="min-h-screen">
            <title>Operasional Dashboard</title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                <div className="lg:col-span-2 space-y-4">
                    <CongratulationCard name={name} percent={80} />
                    <ResumeSection
                        items={resumeItems}
                        monthLabel="December | 2025"
                    />
                    <RepairNoteSection notes={repairNotes} />
                </div>

                <div className="lg:col-span-1 space-y-4">
                    <CalendarCard events={calendar} height={355} />
                    <BestAdminCard
                        name={bestBOH.name}
                        branch={bestBOH.branch}
                        imageSrc={Bestadminmale}
                        iconSrc={Besticon}
                    />
                </div>
            </div>
        </div>
    );
}
