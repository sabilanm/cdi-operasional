import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarCard({ events = [], height = 360 }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {/* <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} height={height} /> */}
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={height}
            />
        </div>
    );
}
