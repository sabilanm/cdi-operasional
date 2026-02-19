import React, { useState } from "react";
import InputCustom from "../../../components/ui/Input";

export default function FilterDashboard({
    startDate,
    endDate,
    setMonth,
    setYear,
    onSearch,
    month,
    year,
    layout = "vertical",
}) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [localMonth, setLocalMonth] = useState(currentMonth);
    const [localYear, setLocalYear] = useState(currentYear);

    const monthOptions = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];
    const startYear = 2025;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => ({
            value: startYear + i,
            label: (startYear + i).toString(),
        }),
    );
    const handleSearch = () => {
        setYear(localYear);
        setMonth(localMonth);
    };
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-blue-700 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-5 bg-blue-600 rounded"></span>
                Filter Dashboard
            </h2>
            {layout === "horizontal" ? (
                <div className="grid grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bulan
                        </label>
                        <select
                            name="bulan"
                            id="bulan"
                            value={localMonth}
                            onChange={(e) =>
                                setLocalMonth(Number(e.target.value))
                            }
                            className={`peer block py-3 px-3 w-full text-sm text-gray-800 bg-transparent border-1 border-gray-400 rounded-md focus:outline-none focus:border-blue-500`}
                        >
                            {monthOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tahun
                        </label>
                        <select
                            name="tahun"
                            id="tahun"
                            value={localYear}
                            onChange={(e) =>
                                setLocalYear(Number(e.target.value))
                            }
                            className={`peer block py-3 px-3 w-full text-sm text-gray-800 bg-transparent border-1 border-gray-400 rounded-md focus:outline-none focus:border-blue-500`}
                        >
                            {yearOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                            onClick={handleSearch}
                        >
                            Cari Data
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bulan
                        </label>
                        <select
                            name="bulan"
                            id="bulan"
                            value={localMonth}
                            onChange={(e) =>
                                setLocalMonth(Number(e.target.value))
                            }
                            className={`peer block py-3 px-3 w-full text-sm text-gray-800 bg-transparent border-1 border-gray-400 rounded-md focus:outline-none focus:border-blue-500`}
                        >
                            {monthOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tahun
                        </label>
                        <select
                            name="tahun"
                            id="tahun"
                            value={localYear}
                            onChange={(e) =>
                                setLocalYear(Number(e.target.value))
                            }
                            className={`peer block py-3 px-3 w-full text-sm text-gray-800 bg-transparent border-1 border-gray-400 rounded-md focus:outline-none focus:border-blue-500`}
                        >
                            {yearOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={handleSearch}
                    >
                        Cari Data
                    </button>
                </div>
            )}
        </div>
    );
}
