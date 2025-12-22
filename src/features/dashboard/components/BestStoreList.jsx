import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="w-48 sm:w-56 h-6 bg-white border border-yellow-400 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-400 flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all"
        style={{ width: `${value}%` }}
      >
        {value}%
      </div>
    </div>
  );
};

export default function BestStoreList({ items }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-center text-lg font-semibold mb-6">
        The Best Store
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-gray-800">
              {item.name}
            </span>
            <ProgressBar value={item.percent} />
          </div>
        ))}
      </div>
    </div>
  );
}
