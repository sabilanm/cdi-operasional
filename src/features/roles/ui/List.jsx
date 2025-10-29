// import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";

const Login = () => {
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Roles", to: "/roles", active: true },
    ];
    const data = [
        {
            id: 1,
            name: "Superadmin",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-12 03:43:38",
            deleted_at: null,
        },
        {
            id: 2,
            name: "Admin",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:24:51",
            deleted_at: null,
        },
        {
            id: 3,
            name: "BOD",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:24:03",
            deleted_at: null,
        },
        {
            id: 4,
            name: "Manager Departemen",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:25:02",
            deleted_at: null,
        },
        {
            id: 5,
            name: "Branch Manager",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-09-22 10:25:21",
            deleted_at: null,
        },
        {
            id: 6,
            name: "Staff",
            status: "active",
            created_at: "2025-09-12 03:43:38",
            updated_at: "2025-10-13 13:47:36",
            deleted_at: null,
        },
        {
            id: 17,
            name: "Supervisor",
            status: "active",
            created_at: "2025-10-27 11:33:44",
            updated_at: "2025-10-27 11:33:44",
            deleted_at: null,
        },
        {
            id: 18,
            name: "Asisten Manager",
            status: "active",
            created_at: "2025-10-28 08:27:52",
            updated_at: "2025-10-28 08:27:52",
            deleted_at: null,
        },
    ];
    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Roles List" items={breadcrumbItems} />
            <table className="w-full border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-left text-gray-600 shadow bg-[#26C6DA] text-white transition shadow-lg">
                        <th className="p-3 rounded-l-lg">No</th>
                        <th className="p-3">Nama</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 rounded-r-lg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr
                            key={item.id}
                            className="bg-white shadow transition"
                        >
                            <td
                                className={`p-3 rounded-l-lg border-l-4 ${
                                    item.status === "active"
                                        ? "border-l-green-300"
                                        : "border-l-red-300"
                                }`}
                            >
                                {/* {startRecord + i} */}
                            </td>
                            <td className="p-3 font-medium">{item.name}</td>
                            <td className="p-3 font-medium capitalize">
                                <span
                                    className={`px-3 py-1 rounded-lg text-sm  ${
                                        item.status === "active"
                                            ? "bg-green-300"
                                            : "bg-red-300"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-3 rounded-r-lg gap-3">
                                <button
                                    className="p-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                    title="Edit"
                                    // onClick={() =>
                                    //     handleEditClick(item.id)
                                    // }
                                >
                                    {/* <Icon
                                                icon="solar:clapperboard-edit-broken"
                                                    width="20"
                                                    height="20"
                                            /> */}
                                </button>
                                <button
                                    className="p-2 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                                    title="Delete"
                                    // onClick={() =>
                                    //     handleDeleteClick(item.id)
                                    // }
                                >
                                    {/* <Icon
                                                icon="solar:trash-bin-minimalistic-broken"
                                                    width="20"
                                                    height="20"
                                            /> */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={8}>
                            {/* <Pagination
                                        page={page}
                                        length={length}
                                        totalRecords={totalRecords}
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        handleRowsPerPageChange={
                                            handleRowsPerPageChange
                                        }
                                        handlePreviousPage={handlePreviousPage}
                                        handleNextPage={handleNextPage}
                                    /> */}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Login;
