import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

export default function RadioGroup({ label, name, value, onChange, options }) {
    return (
        <div className="border-2 border-gray-400 rounded-lg mb-3">
            <div className="m-3">
                {label && <label className="block mb-2">{label}</label>}
                <div className="flex gap-3">
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
                                className={`px-4 py-2 rounded-full cursor-pointer border-2 transition
                                 ${
                                     value === option.value
                                         ? option.activeClass
                                         : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                 }`}
                            >
                                {option.label}
                            </label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
