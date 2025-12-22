import React, { useState } from "react";
import Cookies from "js-cookie";
import FilterDashboard from "./FilterDashboard";
import CalendarCard from "./CalendarCard";
import MonthlyStatisticChart from "./MonthlyStatisticChart";
import HighlightList from "./HighlightList";
import ProgressTable from "./ProgressTable";
import BestScoreList from "./BestScoreList";
import ActiveTaskTable from "./ActiveTaskTable";
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

    const labels = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const chartData = {
        labels,
        datasets: [
            {
                label: "Regional 1",
                data: [80, 75, 90, 95, 100, 75, 90, 80, 60, 65, 25, 45],
                borderColor: "#7CB342",
                backgroundColor: "rgba(124, 179, 66, 0.1)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Regional 2",
                data: [90, 70, 95, 75, 90, 80, 95, 75, 70, 60, 20, 40],
                borderColor: "#E57373",
                backgroundColor: "rgba(229, 115, 115, 0.1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                    usePointStyle: true,
                },
            },
            title: {
                display: true,
                text: "Monthly Statistic",
                font: {
                    size: 16,
                    weight: "600",
                },
                color: "#1E40AF",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0,0,0,0.05)",
                },
            },
            x: {
                grid: {
                    color: "rgba(0,0,0,0.05)",
                },
            },
        },
    };

    const highlights = [
        "PT Cobra Dental Bali",
        "PT Cobra Dental Malang",
        "PT Cobra Dental Aceh",
        "PT Cobra Dental Pekanbaru",
        "PT Cobra Dental Balikpapan",
    ];

    const progressData = [
        {
            status: "Safe",
            store: "C006 - PT Cobra Dental Jakarta",
            progress: 85,
        },
        {
            status: "Alert",
            store: "C025 - PT Cobra Dental Bogor",
            progress: 45,
        },
        {
            status: "Safe",
            store: "C006 - PT Cobra Dental Yogyakarta",
            progress: 70,
        },
        {
            status: "Alert",
            store: "C025 - PT Cobra Dental Malang",
            progress: 35,
        },
        {
            status: "Safe",
            store: "C006 - PT Cobra Dental Surakarta",
            progress: 80,
        },
    ];

    const bestScores = [
        "PT Cobra Dental Jakarta",
        "PT Cobra Dental Yogyakarta",
        "PT Cobra Dental Surabaya",
        "PT Cobra Dental Bandung",
        "PT Cobra Dental Semarang",
    ];

    const activeTasks = [
        { job: "Input E-Report", store: "Jakarta", status: "Completed" },
        { job: "Setoran Omset Kasir", store: "Bogor", status: "Incompleted" },
        { job: "Penagihan Piutang", store: "Jakarta", status: "Completed" },
        { job: "Setoran Omset Kasir", store: "Bogor", status: "Completed" },
        { job: "Penagihan piutang", store: "Jakarta", status: "Incompleted" },
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
                    <MonthlyStatisticChart
                        data={chartData}
                        options={chartOptions}
                    />
                    <ProgressTable rows={progressData} />
                    <ActiveTaskTable rows={activeTasks} />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <CalendarCard events={calendar} height={355} />
                    <HighlightList items={highlights} />
                    <BestScoreList items={bestScores} />
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
