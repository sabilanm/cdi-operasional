import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ value }) => {
    const options = {
        chart: {
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "70%",
                },
                dataLabels: {
                    name: {
                        show: false,
                        fontSize: "14px",
                        color: "#888",
                        offsetY: -10,
                    },
                    value: {
                        show: true,
                        fontSize: "20px",
                        color: "#111",
                        formatter: function (val) {
                            return Math.round(val);
                        },
                    },
                },
            },
        },
        labels: ["Progress"],
        stroke: {
            lineCap: "round",
        },
    };
    const [series, setSeries] = useState(null);
    useEffect(() => {
        if (typeof value === "number") {
            setSeries([value]);
        }
    }, [value]);
    if (series === null) {
        return <label>Loading ...</label>;
    }
    return (
        <div className="w-full flex justify-center items-center">
            <Chart
                options={options}
                series={series}
                type="radialBar"
                height="180"
                width="180"
            />
        </div>
    );
};

export default DonutChart;
