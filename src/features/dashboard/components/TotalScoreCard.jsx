import React from "react";

export default function TotalScoreCard({ monthLabel, scores = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-700 font-bold text-lg">Total Score</h2>
                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                    {monthLabel}
                </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
                {scores.map((v, i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 w-full md:w-48 text-center border border-blue-100 hover:shadow-md transition-shadow"
                    >
                        <div className="text-5xl font-bold text-blue-600 mb-2">{v}</div>
                        <div className="text-sm text-gray-600 mb-4">Total Score</div>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-6 py-2.5 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                            Regional {i + 1}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

