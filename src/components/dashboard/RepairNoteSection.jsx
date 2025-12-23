import React from "react";

const RepairItem = ({ title, desc, points, admin, date }) => (
    <div className="bg-white border border-yellow-200 rounded-2xl p-6 space-y-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:border-yellow-300">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full inline-block text-sm font-semibold shadow-sm">
            {title}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>

        <ul className="list-none pl-0 text-sm space-y-2">
            {points.map((p, i) => (
                <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{p}</span>
                </li>
            ))}
        </ul>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-medium border border-amber-200">
                👤 {admin}
            </span>
            <span className="text-sm text-gray-500 font-medium">{date}</span>
        </div>
    </div>
);

export default function RepairNoteSection({ notes = [] }) {
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-lg p-6 border border-yellow-100">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-yellow-500 text-2xl font-bold">
                        Repair Notes
                    </h2>
                </div>
                <button className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg">
                    +
                </button>
            </div>

            {notes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <p className="text-gray-500 font-medium">No repair notes available</p>
                    <p className="text-gray-400 text-sm mt-1">Click + to add a new note</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {notes.map((n, i) => (
                        <RepairItem key={i} {...n} />
                    ))}
                </div>
            )}
        </div>
    );
}