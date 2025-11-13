import React from "react";

export default function Button({
    type,
    label,
    onClick,
    disabled,
    color = "#00ACC1",
    className = "",
    marginBot = "mb-3",
    marginTop = "mt-3",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-44 h-10 rounded-lg ${marginTop} ${marginBot} text-white border-2 transition
                ${
                    disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                }
                ${className}`}
            style={{
                backgroundColor: color,
                borderColor: color,
            }}
        >
            {label}
        </button>
    );
}
