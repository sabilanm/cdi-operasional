import React from "react";

const Circle = ({ value, color }) => {
    const stroke = 10;
    const radius = 60;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="#E5E7EB"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke={color === "green" ? "#EAB308" : "#22C55E"}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(-90 ${radius} ${radius})`}
            />
            <text
                x="50%"
                y="50%"
                dy="0.3em"
                textAnchor="middle"
                className="text-xl font-bold fill-yellow-500"
            >
                {value}%
            </text>
        </svg>
    );
};

export default function CircleProgressCard({
    value = 0,
    color = "green",
    label = "Ketepatan Waktu",
}) {
    return (
        <div className="col-span-1 h-full">
            <div className="w-full bg-white rounded-3xl p-6 flex flex-col items-center border-2 border-yellow-400">
                <label className="text-gray-700 mb-4 text-lg">{label}</label>
                <Circle value={value} color={color} />
            </div>
        </div>
    );
}
