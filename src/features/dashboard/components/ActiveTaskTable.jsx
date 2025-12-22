import React from "react";

export default function ActiveTaskTable({ rows = [] }) {
    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-center font-bold text-xl text-gray-800 mb-6">Active Task</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Job Description</th>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Store</th>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((p, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 font-medium text-gray-800">{p.job}</td>
                                <td className="py-4 px-4 font-medium text-gray-800">{p.store}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-4 py-1.5 rounded-full text-white font-medium ${p.status === "Completed" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900"}`}>
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

