import React from "react";

export default function FilterDashboard({ startDate, endDate, onStartDateChange, onEndDateChange, onSearch, layout = "vertical" }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-blue-700 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-5 bg-blue-600 rounded"></span>
                Filter Dashboard
            </h2>
            {layout === "horizontal" ? (
                <div className="grid grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={startDate}
                            onChange={(e) => onStartDateChange && onStartDateChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={endDate}
                            onChange={(e) => onEndDateChange && onEndDateChange(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                            onClick={() => onSearch && onSearch({ startDate, endDate })}
                        >
                            Cari Data
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={startDate}
                            onChange={(e) => onStartDateChange && onStartDateChange(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={endDate}
                            onChange={(e) => onEndDateChange && onEndDateChange(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={() => onSearch && onSearch({ startDate, endDate })}
                    >
                        Cari Data
                    </button>
                </div>
            )}
        </div>
    );
}
