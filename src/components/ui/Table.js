import React from "react";
import Pagination from "../common/Pagination";
import defaultImage from "../../assets/images/users/user6.png";
import { Icon } from "@iconify/react";

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
    const handleDetail = (value) => {
        window.open(`${process.env.REACT_APP_IMAGE_URL}${value}`, "_blank");
    };
    return (
        <div className="overflow-x-auto">
            <table
                style={{
                    backgroundColor: "rgb(224, 247, 250)",
                    padding: "0px 10px",
                    borderRadius: "10px",
                }}
                className="w-full border-separate border-spacing-y-3"
            >
                <thead>
                    <tr className="text-left text-gray-600 shadow bg-[#26C6DA] text-white transition">
                        {columns.map((col, idx) => (
                            <th
                                style={{ width: col.width || "auto" }}
                                key={col.key || idx}
                                className={`p-3 ${
                                    idx === 0 ? "rounded-l-lg" : ""
                                } ${
                                    idx === columns.length - 1 && !renderActions
                                        ? "rounded-r-lg"
                                        : ""
                                }`}
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
                                className="bg-white transition hover:bg-gray-50"
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
                                                colIndex === 0
                                                    ? "rounded-l-lg"
                                                    : ""
                                            }`}
                                        >
                                            {col.key === "status" ? (
                                                <span
                                                    style={{
                                                        fontSize: "12px",
                                                        padding: "5px",
                                                    }}
                                                    className={`rounded-lg text-sm ${
                                                        value === "active" ||
                                                        value === "Done" ||
                                                        value === "Approved"
                                                            ? "bg-green-300 text-green-900"
                                                            : value ===
                                                              "Need Review"
                                                            ? "bg-blue-200 text-blue-700"
                                                            : value ===
                                                              "Not Started"
                                                            ? "bg-yellow-200 text-yellow-700"
                                                            : value ===
                                                              "Rejected"
                                                            ? "bg-red-300 text-red-900"
                                                            : "bg-red-300 text-red-900"
                                                    }`}
                                                >
                                                    {value}
                                                </span>
                                            ) : col.key === "type" ? (
                                                <span
                                                    style={{
                                                        fontSize: "12px",
                                                        padding: "5px",
                                                    }}
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
                                            ) : col.key === "file" ? (
                                                value ? (
                                                    <button
                                                        className="p-2 w-10 h-10 rounded-full bg-green-50 text-green-600 hover:bg-blue-100 transition"
                                                        title="View File"
                                                        onClick={() =>
                                                            handleDetail(value)
                                                        }
                                                    >
                                                        <Icon
                                                            icon={
                                                                // Cek ekstensi file
                                                                value.endsWith(".xls") || value.endsWith(".xlsx")
                                                                    ? "solar:file-download-broken"
                                                                    : "solar:book-2-broken"
                                                            }
                                                            width="20"
                                                            height="20"
                                                        />
                                                    </button>
                                                ) : (
                                                    ""
                                                )
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
                <tfoot>
                    <tr>
                        <td colSpan={columns.length + 1}>
                            <Pagination
                                page={page}
                                length={length}
                                totalRecords={totalRecords}
                                rowsPerPageOptions={rowsPerPageOptions}
                                handleRowsPerPageChange={
                                    handleRowsPerPageChange
                                }
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
