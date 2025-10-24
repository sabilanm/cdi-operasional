import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const DonutChart = (prop) => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "donut",
                width: "100%",
                height: 350,
            },

            labels: ["To Do", "In Progress", "Completed"],
            colors: ["#8DA7BE", "#F2B8A2", "#A7BE8D"],
            legend: {
                show: false,
                position: "bottom",
                horizontalAlign: "left",
            },
            title: {
                text: "Progress",
                align: "center",
                style: { fontSize: "16px", fontWeight: 600 },
            },
            plotOptions: {
                pie: {
                    offsetY: 30,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#333",
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#000",
                                offsetY: 3,
                                formatter: (val) => `${val}%`, // Tambahkan '%' di setiap nilai
                            },
                            total: {
                                show: true,
                                label: "Total",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#000",
                                formatter: (w) =>
                                    w.globals.seriesTotals.reduce(
                                        (a, b) => a + b,
                                        0
                                    ), // Total semua nilai
                            },
                        },
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 1440, // desktop besar
                    options: {
                        chart: {
                            height: 450,
                        },
                    },
                },
                {
                    breakpoint: 1024,
                    options: {
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        value: {
                                            fontSize: "14px", // ukuran font value lebih kecil
                                        },
                                        total: {
                                            fontSize: "14px",
                                        },
                                    },
                                },
                            },
                        },
                        chart: {
                            height: 380,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 280,
                        },
                    },
                },
            ],
        },
    });
    useEffect(() => {
        if (Array.isArray(prop.value)) {
            const colorMap = {
                todo: "#8DA7BE",
                inprogress: "#F2B8A2",
                done: "#A7BE8D",
            };

            const nameMap = {
                todo: "To Do",
                inprogress: "In Progress",
                done: "Completed",
            };

            let valueArray = prop.value.map((item) =>
                parseFloat(item.percentage)
            );
            let labelArray = prop.value.map(
                (item) => nameMap[item.status] || item.status
            );
            let colorArray = prop.value.map(
                (item) => colorMap[item.status] || "#E5E7EB"
            );

            // Deteksi jika hanya satu item yang bernilai > 0
            const activeIndexes = valueArray
                .map((v, i) => (v > 0 ? i : -1))
                .filter((i) => i !== -1);

            if (activeIndexes.length === 1) {
                const onlyIndex = activeIndexes[0];
                const total = valueArray[onlyIndex];

                valueArray = [total, 100 - total];
                labelArray = [labelArray[onlyIndex], "Remaining"];
                colorArray = [colorArray[onlyIndex], "#E5E7EB"];
            }

            const totalCount = prop.value.reduce(
                (acc, cur) => acc + cur.total,
                0
            );

            setChartData((prev) => ({
                ...prev,
                series: valueArray,
                options: {
                    ...prev.options,
                    labels: labelArray,
                    colors: colorArray,
                    plotOptions: {
                        pie: {
                            ...prev.options.plotOptions.pie,
                            donut: {
                                ...prev.options.plotOptions.pie.donut,
                                labels: {
                                    ...prev.options.plotOptions.pie.donut
                                        .labels,
                                    total: {
                                        ...prev.options.plotOptions.pie.donut
                                            .labels.total,
                                        formatter: () => totalCount,
                                    },
                                },
                            },
                        },
                    },
                },
            }));

            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 100);
        }
    }, [prop]);

    const customLegend = ["To Do", "In Progress", "Completed"];
    const colors = ["#8DA7BE", "#F2B8A2", "#A7BE8D"];

    return (
        <>
            <div className="w-full overflow-hidden p-2">
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    width="100%"
                />
            </div>
            <div className="flex flex-col 2xl:flex-row 2xl:justify-center 2xl:gap-4 items-center mt-8">
                {customLegend.map((item, index) => (
                    <div key={index} className="flex items-center mb-1 md:mb-0">
                        <span
                            className="inline-block w-3 h-3 mr-2"
                            style={{ backgroundColor: colors[index] }}
                        ></span>
                        <span className="text-xs font-normal text-gray-500">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DonutChart;
