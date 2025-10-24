import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, CardTitle } from "reactstrap";

import "./grafik.css";

const LineChart = () => {
    const options = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "straight", // Ubah dari 'smooth' menjadi 'straight'
            width: 1,
        },
        markers: {
            size: 4,
            colors: ["#007BFF", "#CCCCCC"],
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        colors: ["#007BFF", "#CCCCCC"],
        legend: {
            position: "top",
        },
    };

    const series = [
        { name: "Site A", data: [3, 6, 3, 8, 14, 8, 10] },
        { name: "Site B", data: [0, 4, 5, 6, 7, 5, 4] },
    ];

    return (
        <Card
            style={{
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <CardBody>
                <CardTitle tag="h5" className="text-left mb-4">
                    Grafik
                </CardTitle>
                {/* <Chart options={options} series={series} type="line" height={350} /> */}
                <Chart
                    type="line" //line, bar, area, pie, donut, radialBar, scatter, bubble, heatmap, candlestick, boxPlot, treemap
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
