import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardTitle } from "reactstrap";

const LineChart = ({ chartData }) => {
    // Konfigurasi chart
    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        stroke: {
            curve: "straight",
            width: 2,
        },
        markers: {
            size: 4,
            colors: ["#caf3e8", "#ffc4c4"],
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        xaxis: {
            categories: chartData.map((item) => item.month_name),
        },
        colors: ["#caf3e8", "#ffc4c4", "#27bdf3"],
        legend: {
            position: "bottom",
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                    value: 0.15,
                },
            },
        },
    };

    const series = [
        {
            name: "Total Done",
            data: chartData.map((item) => item.total_done),
        },
        {
            name: "Total Progress",
            data: chartData.map((item) => item.total_progress),
        },
        {
            name: "Total Pending",
            data: chartData.map((item) => item.total_pending),
        },
    ];

    return (
        <Card style={{ backgroundColor: "#fff" }}>
            <CardBody>
                <CardTitle tag="h5" className="text-left mb-4">
                    Grafik
                </CardTitle>
                <Chart
                    type="bar"
                    width="99%"
                    height="350"
                    options={options}
                    series={series}
                />
            </CardBody>
        </Card>
    );
};

export default LineChart;
