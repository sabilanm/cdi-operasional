import React from "react";

const ResumeCard = ({ value, label, bg, text, btnBg }) => (
    <div className={`rounded-3xl shadow-md p-6 text-center ${bg}`}>
        <h3 className={`text-5xl font-bold ${text}`}>{value}</h3>
        <button
            className={`mt-4 px-6 py-1 rounded-full text-white text-sm ${btnBg}`}
        >
            {label}
        </button>
    </div>
);

export default function ResumeSection({ items = [], monthLabel }) {
    return (
        <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-blue-600 text-lg mb-4">
                Resume{" "}
                {monthLabel ? (
                    <span className="text-gray-400 text-sm">{monthLabel}</span>
                ) : null}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, i) => (
                    <ResumeCard key={i} {...item} />
                ))}
            </div>
        </div>
    );
}
