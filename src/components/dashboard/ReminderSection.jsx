import React from "react";

const ReminderItem = ({ messages, role }) => {
    return (
        <div className="bg-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
            {/* Text */}
            <div className="space-y-1 text-gray-800">
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>

            {/* Role Badge */}
            <div className="flex justify-end">
                <span className="bg-yellow-400 text-white px-6 py-2 rounded-full text-sm font-medium">
                    {role}
                </span>
            </div>
        </div>
    );
};

export default function ReminderSection({ reminders = [] }) {
    return (
        <div className="bg-yellow-50 rounded-3xl shadow p-6 md:p-8">
            <h2 className="text-yellow-500 text-xl font-semibold text-center mb-6">
                Reminder
            </h2>

            <div className="space-y-6">
                {reminders.map((item, idx) => (
                    <ReminderItem
                        key={idx}
                        messages={item.messages}
                        role={item.role}
                    />
                ))}
            </div>
        </div>
    );
}
