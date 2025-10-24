import { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";

const BarChart = () => {
  const chartRef = useRef(null);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "Inter, sans-serif",
      stacked: true,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ["#8DA7BE", "#A7BE8D", "#F2B8A2"], // Tetap mempertahankan warna original
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: '12px'
      },
      y: {
        formatter: function(value) {
          return value + " activities";
        }
      },
      marker: {
        show: true
      }
    },
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.15,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      padding: {
        top: 20,
        bottom: 0,
        left: 20,
        right: 20,
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val > 0 ? val : '';
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ["#64748b"],
        fontFamily: "Inter, sans-serif"
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontFamily: "Inter, sans-serif",
      markers: {
        width: 12,
        height: 12,
        radius: 6,
        offsetY: 1
      },
      itemMargin: {
        horizontal: 12,
        vertical: 8
      }
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal text-slate-500",
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal text-slate-500",
        },
      },
      title: {
        text: "Activities Count",
        style: {
          color: '#64748b',
          fontSize: '12px',
          fontFamily: "Inter, sans-serif",
        }
      }
    },
    fill: {
      opacity: 1,
    },
  });

  const [chartSeries] = useState([
    {
      name: "To Do",
      data: [231, 122, 63, 421, 122, 323, 111]
    },
    {
      name: "In Progress",
      data: [232, 113, 341, 224, 522, 411, 243]
    },
    {
      name: "Completed",
      data: [132, 213, 241, 324, 222, 311, 143]
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.chart.updateOptions({
          chart: {
            width: chartRef.current.el.clientWidth
          }
        }, false, true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-800 text-center">
          Learning Activities
        </h3>
      </div>
      <Chart
        ref={chartRef}
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
        width="100%"
      />
    </div>
  );
};

export default BarChart;
