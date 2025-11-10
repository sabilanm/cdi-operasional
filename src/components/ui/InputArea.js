// src/components/ui/InputArea.js
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill.css";

export default function InputArea({ label, name, value, onChange, placeholder = "", required = true }) {
    return (
        <div className="relative z-0 w-full mb-4 group mt-4">
            {label && (
                <label htmlFor={name} className="block text-sm text-gray-500 mb-1 font-medium">
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
