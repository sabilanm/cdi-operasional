// src/components/ui/InputArea.js
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

export default function InputArea({ label, name, value, onChange, placeholder = "", required = true }) {
    return (
        <div className="relative z-0 w-full mb-4 group mt-4">
            {label && (
                <label
                    htmlFor={name}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-3 bg-white px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:left-3 peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
                >
                    {label}
                </label>
            )}
            <ReactQuill
                theme="snow"
                value={value}
                onChange={(val) => onChange({ target: { name, value: val } })}
                placeholder={placeholder}
                modules={{
                    toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], ["link", "clean"]],
                }}
                formats={["header", "bold", "italic", "underline", "strike", "list", "bullet", "link"]}
                style={{
                    border: "1px solid #CBD5E1",
                    borderRadius: "0.375rem",
                }}
            />
        </div>
    );
}
