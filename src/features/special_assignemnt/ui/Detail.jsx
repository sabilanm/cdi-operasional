import { CardBody, CardTitle, Form } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Circle from "../../../components/ui/circleChart";
import Button from "../../../components/ui/Button";
import DonutChart from "../../../components/ui/donutChart";
import { useState } from "react";
import defaultImage from "../../../assets/images/users/user6.png";
import { useDetailList } from "../hooks/useDetail";
import Tables from "../../../components/ui/Table";

const Detail = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        {
            label: "Assignment",
            to: "/master-kpi/special-assignment",
            active: false,
        },
        { label: "Detail", active: true },
    ];
    const {
        data,
        list,
        page,
        length,
        totalRecords,
        searchQuery,
        rowsPerPageOptions,
        loading,
        error,
        startRecord,
        handleRowsPerPageChange,
        handleNextPage,
        handlePreviousPage,
        setSearchQuery,
    } = useDetailList(id);
    const status_percentage = [
        {
            status: "done",
            total: 513,
            percentage: "74.67",
        },
        {
            status: "inprogress",
            total: 25,
            percentage: "3.64",
        },
        {
            status: "todo",
            total: 149,
            percentage: "21.69",
        },
    ];

    const columns = [
        { key: "no", label: "No" },
        { key: "cabang", label: "Cabang" },
        { key: "nama", label: "Nama" },
        { key: "nilai", label: "Nilai" },
        { key: "status", label: "Status" },
    ];

    const datas = list.map((val, i) => ({
        no: startRecord + i,
        id: val.id,
        cabang: val.branch_name,
        nama: val.name,
        nilai: val.score,
        status: val.status,
    }));

    const handleNilai = (specialAssigmentDetailId) => {
        navigate(`${specialAssigmentDetailId}/assignment_detail`);
    };

    return (
        <div>
            <title>Operasional</title>
            <Breadcrumbs title="Detail Assignment" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Detail Assignment
            </CardTitle>
            <CardBody className="border-1 bg-white rounded-lg">
                <div className="m-3">
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-3">
                        <div className="col-span-1">
                            <Input
                                label="Start Date"
                                name="startDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="Start Date"
                                type="date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="End Date"
                                name="endDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="End Date"
                                type="date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="End Date"
                                name="endDate"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="End Date"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Name"
                                name="name"
                                // value={data?.startDate}
                                // onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-1">
                        {/* Kolom Bobot, Average, Total */}
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-full">
                                {[
                                    {
                                        label: "Bobot",
                                        color: "blue",
                                        value: data.score?.bobot,
                                    },
                                    {
                                        label: "Average Score",
                                        color: "red",
                                        value: data.score?.avg,
                                    },
                                    {
                                        label: "Total Score",
                                        color: "green",
                                        value: data.score?.total,
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`bg-${item.color}-100 border-2 border-${item.color}-400 rounded-lg flex flex-col items-center justify-center p-4 h-full`}
                                    >
                                        <label className="text-[#004D40] font-semibold mb-2">
                                            {item.label}
                                        </label>
                                        <Circle
                                            value={item.value}
                                            color={item.color}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kolom Performa */}
                        <div className="col-span-2">
                            <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg p-4 h-full flex flex-col">
                                <label className="text-[#004D40] font-semibold text-center mb-3">
                                    Performa
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
                                    {[
                                        {
                                            label: "Fastest",
                                            name: data.peforma?.fastest.name,
                                            value: data.peforma?.fastest.date,
                                            image: data.peforma?.fastest.image,
                                        },
                                        {
                                            label: "Top Score",
                                            name: data.peforma?.top_score.name,
                                            value: data.peforma?.top_score
                                                .score,
                                            image: data.peforma?.top_score
                                                .image,
                                        },
                                        {
                                            label: "Lowest Score",
                                            name: data.peforma?.lowest.name,
                                            value: data.peforma?.lowest.score,
                                            image: data.peforma?.lowest.image,
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-300 bg-white shadow-sm h-full"
                                        >
                                            {/* Label */}
                                            <span className="text-gray-700 text-sm font-semibold bg-gray-50 px-3 py-1 rounded-full mb-3 shadow-sm">
                                                {item.label}
                                            </span>

                                            {/* Image */}
                                            <img
                                                src={
                                                    item.image
                                                        ? `${process.env.REACT_APP_IMAGE_URL}${item.image}`
                                                        : defaultImage
                                                }
                                                alt="gambar"
                                                className="rounded-xl w-[80px] h-[80px] object-cover mb-3 ring-1 ring-gray-200"
                                            />

                                            {/* Name */}
                                            <span className="text-gray-700 text-sm font-semibold bg-gray-50 px-3 py-1 rounded-full shadow-sm">
                                                {item.name}
                                            </span>

                                            {/* Value di bawah nama */}
                                            {item.value !== undefined && (
                                                <span className="text-xs text-gray-500 mt-1">
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Kolom Progress */}
                        <div className="col-span-1">
                            <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg p-4 h-full flex flex-col items-center justify-center">
                                <label className="text-[#004D40] font-semibold mb-3">
                                    Progress
                                </label>
                                <DonutChart value={status_percentage} />
                                {/* <div className="w-full h-[250px] flex items-center justify-center">
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <Tables
                        columns={columns}
                        data={datas}
                        renderActions={(datas) => (
                            <>
                                {datas.status !== "Done" && (
                                    <button
                                        className="p-2 w-20 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                        title="Edit"
                                        onClick={() => handleNilai(datas.id)}
                                        // onClick={() => handleEdit(datas.userid)}
                                    >
                                        Review
                                    </button>
                                )}
                            </>
                        )}
                        page={page}
                        length={length}
                        totalRecords={totalRecords}
                        rowsPerPageOptions={rowsPerPageOptions}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </CardBody>
        </div>
    );
};

export default Detail;
