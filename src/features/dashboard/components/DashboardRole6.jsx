import React, { useState } from "react";
import Cookies from "js-cookie";
import CongratulationCard from "./CongratulationCard";
import FilterDashboard from "./FilterDashboard";
import CalendarCard from "./CalendarCard";
import ResumeSection from "./ResumeSection";
import RepairNoteSection from "./RepairNoteSection";
import CircleProgressCard from "./CircleProgressCard";
import ReminderSection from "./ReminderSection";
import BestScoreList from "./BestScoreList";
import BestAdminCard from "./BestAdminCard";
import Bestadminmale from "../../../assets/images/dashboard/Bestadminmale.png";
import Besticon from "../../../assets/images/dashboard/BestIcon.png";

export default function DashboardRole4() {
    const name = Cookies.get("operasional_name");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    const resumeItems = [
        {
            value: 80,
            label: "All Task",
            bg: "bg-sky-100",
            text: "text-sky-600",
            btnBg: "bg-sky-600",
        },
        {
            value: 80,
            label: "Completed",
            bg: "bg-green-100",
            text: "text-green-600",
            btnBg: "bg-green-600",
        },
        {
            value: 80,
            label: "To Do",
            bg: "bg-yellow-100",
            text: "text-yellow-500",
            btnBg: "bg-yellow-500",
        },
        {
            value: 80,
            label: "Late",
            bg: "bg-red-100",
            text: "text-red-400",
            btnBg: "bg-red-400",
        },
    ];

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
                        name="Rizkiyah (Admin Piutang)"
                        imageSrc={Bestadminmale}
                        iconSrc={Besticon}
                    />
                </div>
            </div>
        </div>
    );
}
