import React from "react";

export default function Button({
    type,
    label,
    onClick,
    disabled,
    color = "#00ACC1",
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-44 h-10 rounded-lg mt-3 mb-3 text-white border-2 transition 
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
