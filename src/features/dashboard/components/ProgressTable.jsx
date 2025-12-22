import React from "react";

export default function ProgressTable({ rows = [] }) {
    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-center font-bold text-xl text-gray-800 mb-6">Progress</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Status</th>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Store</th>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Progress</th>
                            <th className="py-4 px-4 text-left text-gray-700 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((p, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4">
                                    <span className={`px-4 py-1.5 rounded-full text-white font-medium ${p.status === "Safe" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}>{p.status}</span>
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-800">{p.store}</td>
                                <td className="py-4 px-4 w-64">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-3 rounded-full ${p.status === "Safe" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gradient-to-r from-orange-500 to-amber-500"}`}
                                                style={{ width: `${p.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 w-10">{p.progress}%</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <button className="w-10 h-10 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <span className="text-lg">✏️</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

