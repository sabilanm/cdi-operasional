import React from "react";

export default function BestScoreList({ items }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
                <span className="w-2 h-5 bg-green-500 rounded"></span>
                The Best Score
            </h3>
            <div className="space-y-4">
                {items?.map((val, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-bold">
                                    #{i + 1}
                                </span>
                            </div>
                            <span className="font-medium text-gray-700">
                                {val.branch_name}
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                            {val.score}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
