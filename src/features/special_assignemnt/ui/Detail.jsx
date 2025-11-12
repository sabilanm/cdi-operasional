import { CardBody, CardTitle, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import Input from "../../../components/ui/Input";
import Circle from "../../../components/ui/circleChart";
import Button from "../../../components/ui/Button";
import DonutChart from "../../../components/ui/donutChart";
import { useState } from "react";
import defaultImage from "../../../assets/images/users/user6.png";

const Create = () => {
    const { id } = useParams();
    const breadcrumbItems = [
        {
            label: <i className="bi bi-house"></i>,
            to: "/",
            active: false,
            style: { textDecoration: "none" },
        },
        { label: "Roles", to: "/roles", active: true },
    ];
    const bobot = 5;
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
    const data = "";
    return (
        <div>
            <title>Performa</title>
            <Breadcrumbs title="Create Roles" items={breadcrumbItems} />
            <CardTitle
                tag="h6"
                className="text-center text-3xl font-weight-bold mb-5"
            >
                Edit Users
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
                                type="date"
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
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-1">
                                <div className="bg-blue-100 border-2 border-blue-400 rounded-lg">
                                    <label className="flex m-3 text-[#004D40] justify-center font-semibold">
                                        Bobot
                                    </label>
                                    <Circle value={bobot} color={"#2f84f3ff"} />
                                </div>
                                <div className="bg-red-100 border-2 border-red-400 rounded-lg">
                                    <label className="flex m-3 text-[#004D40] justify-center font-semibold">
                                        Average Score
                                    </label>
                                    <Circle value={bobot} color={"#FF0000"} />
                                </div>
                                <div className="bg-green-100 border-2 border-green-400 rounded-lg">
                                    <label className="flex m-3 text-[#004D40] justify-center font-semibold">
                                        Total Score
                                    </label>
                                    <Circle value={bobot} color={"#0cf15cff"} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg">
                                <label className="flex m-3 text-[#004D40] justify-center font-semibold">
                                    Performa
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-1">
                                    <div>
                                        <span class="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg mb-3">
                                            Fastes
                                        </span>
                                        <img
                                            src={
                                                data
                                                    ? `${process.env.REACT_APP_IMAGE_URL}${data}`
                                                    : defaultImage
                                            }
                                            alt="gambar"
                                            className="mb-3 rounded-lg w-[45px] h-[45px] object-cover mt-2"
                                        />
                                        <span class="bg-white text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg mb-3">
                                            Galileo Galilei
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg">
                                <label className="flex m-3 text-[#004D40] justify-center font-semibold">
                                    Progress
                                </label>
                                <DonutChart value={status_percentage} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </div>
    );
};

export default Create;
