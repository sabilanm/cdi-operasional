import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

export default function RadioGroup({
    label,
    name,
    value,
    onChange,
    options,
    border = "border-1",
}) {
    return (
        <div className={`${border} border-gray-400 rounded-lg mb-3`}>
            <div className="m-3">
                {label && <label className="block mb-2">{label}</label>}
                <div className="flex flex-col gap-3">
                    {options.map((option) => (
                        <React.Fragment key={option.value}>
                            <input
                                type="radio"
                                id={`${name}-${option.value}`}
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={onChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={`${name}-${option.value}`}
                                className={`flex items-start gap-3 p-2 rounded-lg rounded-lg cursor-pointer border transition
                                    ${
                                        value === option.value
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-300 bg-white hover:bg-gray-50"
                                    }
                                `}
                            >
                                {/* Lingkaran nomor */}
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold flex-shrink-0
                                        ${
                                            value === option.value
                                                ? "bg-green-500 text-white border-green-500"
                                                : "bg-white text-gray-600 border-gray-400"
                                        }
                                    `}
                                >
                                    {option.label.split(" - ")[0]}
                                </div>

                                {/* Text */}
                                <div className="text-gray-700 text-sm leading-relaxed">
                                    {option.label.split(" - ")[1]}
                                </div>
                            </label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
