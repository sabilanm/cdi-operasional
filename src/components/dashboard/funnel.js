import { options } from "dropzone";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const FunnelChart = (prop) => {
    const [state, setState] = React.useState({
        series: [
            {
                name: "Average",
                data: [],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
                dropShadow: {
                    enabled: true,
                },
            },
            // colors: [],
            colors: [
                "#D5BDAF", // dusty rose
            ],
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: "80%",
                    isFunnel: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return (
                        opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    );
                },
                dropShadow: {
                    enabled: true,
                },
            },
            title: {
                text: "Top 10 Learner",
                align: "middle",
            },
            xaxis: {
                categories: [],
            },
            legend: {
                show: false,
            },
        },
    });
    useEffect(() => {
        if (Array.isArray(prop.avg, prop.name)) {
            setState((prev) => ({
                ...prev,
                series: [{ data: prop.avg }],
                options: {
                    xaxis: { categories: prop.name },
                },
            }));
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 100);
        }
    }, [prop]);

    return (
        <div>
            <div id="chart">
                <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default FunnelChart;
