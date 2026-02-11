import React, { useState } from "react";
import Cookies from "js-cookie";
import FilterDashboard from "./FilterDashboard";
import CalendarCard from "../../../components/dashboard/CalendarCard";
import ResumeSection from "../../../components/dashboard/ResumeSection";
import RepairNoteSection from "../../../components/dashboard/RepairNoteSection";
import CircleProgressCard from "../../../components/dashboard/CircleProgressCard";
import ReminderSection from "../../../components/dashboard/ReminderSection";
import BestStoreList from "../../../components/dashboard/BestStoreList";
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

    const bestStoreData = [
        { name: "PT Cobra Dental Bali", percent: 95 },
        { name: "PT Cobra Dental Malang", percent: 85 },
        { name: "PT Cobra Dental Bali", percent: 80 },
        { name: "PT Cobra Dental Malang", percent: 60 },
        { name: "PT Cobra Dental Malang", percent: 40 },
    ];
    // console.log(bestBOH);

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
                "Menentukan PIC yang berbeda tiap minggu untuk memastikan rotasi tanggung jawab",
                "Laporan opname difoto & dikirim via grup WA internal   ",
            ],
            admin: "Admin Barang",
            date: "31 Oktober 2025",
        },
        {
            title: "Pelaporan E-Report",
            desc: "Laporan sering terlambat / tidak lengkap.",
            points: [
                "Menyusun reminder otomatis via email/Whatsapp sehari sebelum deadline.",
                "Membuat template standar lapooran untuk mengurangi keselahan input",
            ],
            admin: "Admin Piutang",
            date: "31 Oktober 2025",
        },
    ];

    const reminderItems = [
        {
            messages: [
                "Penyetoran omset kasir ke bank",
                "Pelaporan Cash Opname ke Audit tgl 3 dan tgl 19 setiap bulan",
            ],
            role: "Admin Keuangan",
        },
        {
            messages: [
                "Melakukan proses tukar faktur sesuai jadwal dari Adm Piutang",
                "Melakukan penagihan ke customer",
            ],
            role: "Admin Piutang",
        },
    ];

    return (
        <div className="min-h-screen">
            <title>Operasional Dashboard</title>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                <div className="lg:col-span-2 space-y-4">
                    <FilterDashboard
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        onSearch={() => {}}
                        layout="horizontal"
                    />
                    <ResumeSection
                        items={resumeItems}
                        monthLabel="December | 2025"
                    />
                    <RepairNoteSection notes={repairNotes} />
                    {/* <ReminderSection reminders={reminderItems} /> */}
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <CalendarCard events={calendar} height={355} />
                    {/* <CircleProgressCard value={53} color="green" /> */}
                    {/* <BestStoreList items={bestStoreData} /> */}
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
