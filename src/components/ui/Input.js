import React from "react";

export default function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
}) {
    return (
        <div class="relative z-0 w-full mb-4 group mt-4">
            <input
                type={type}
                name={name}
                id={name}
                class="peer block py-2.5 px-3 w-full text-sm text-gray-800 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 placeholder-transparent"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
            {label && (
                <label
                    for={name}
                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                    {label}
                </label>
            )}
        </div>
    );
}
