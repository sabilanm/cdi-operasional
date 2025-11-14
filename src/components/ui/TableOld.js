import React from "react";
import Pagination from "../common/Pagination";
import defaultImage from "../../assets/images/users/user6.png";

export default function Input({
    columns,
    data,
    renderActions,
    page,
    length,
    totalRecords,
    rowsPerPageOptions,
    handleRowsPerPageChange,
    handlePreviousPage,
    handleNextPage,
}) {
    return (
        <table className="w-full border-separate border-spacing-y-3">
            <thead>
                <tr className="text-left text-gray-600 shadow bg-[#26C6DA] text-white transition shadow-lg">
                    {columns.map((col, idx) => (
                        <th
                            key={col.key || idx}
                            className={`p-3 ${idx === 0 ? "rounded-l-lg" : ""}
                            `}
                        >
                            {col.label}
                        </th>
                    ))}
                    {renderActions && (
                        <th className="p-3 rounded-r-lg">Action</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr
                            key={item.id || rowIndex}
                            className="bg-white shadow transition hover:bg-gray-50"
                        >
                            {columns.map((col, colIndex) => {
                                const value = item[col.key];
                                return (
                                    <td
                                        key={col.key || colIndex}
                                        className={`p-3 font-medium ${
                                            col.key === "status"
                                                ? "capitalize"
                                                : ""
                                        } ${
                                            colIndex === 0 ? "rounded-l-lg" : ""
                                        }`}
                                    >
                                        {col.key === "status" ? (
                                            <span
                                                className={`px-3 py-1 rounded-lg text-sm ${
                                                    value === "active"
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                }`}
                                            >
                                                {value}
                                            </span>
                                        ) : col.key === "type" ? (
                                            <span
                                                style={{ fontSize: '12px', padding: '5px' }}
                                                className={`capitalize px-3 py-1 rounded-lg text-sm ${
                                                    value === "monthly"
                                                        ? "bg-green-200 text-green-800"
                                                        : value === "weekly"
                                                        ? "bg-blue-200 text-blue-800"
                                                        : value === "daily"
                                                        ? "bg-red-200 text-red-800"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                            >
                                                {value}
                                            </span>
                                        ) : col.key === "image" ? (
                                            <img
                                                src={
                                                    value
                                                        ? `${process.env.REACT_APP_IMAGE_URL}${value}`
                                                        : defaultImage
                                                }
                                                alt={item.name || "Image"}
                                                className="rounded-lg w-[45px] h-[45px] object-cover"
                                            />
                                        ) : (
                                            value
                                        )}
                                    </td>
                                );
                            })}

                            {renderActions && (
                                <td className="p-3 rounded-r-lg">
                                    {renderActions(item)}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length + 1}
                            className="text-center p-4 text-gray-500"
                        >
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
