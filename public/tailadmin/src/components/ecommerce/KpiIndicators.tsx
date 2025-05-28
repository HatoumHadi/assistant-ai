import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import ChartTab from "../common/ChartTab";

export default function StatisticsChart() {
    const options: ApexOptions = {
        chart: {
            type: "area",
            height: 310,
            toolbar: {
                show: false,
            },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#10B981"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        xaxis: {
            type: "category",
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    colors: ["#6B7280"],
                },
            },
            min: 10000,
            max: 26000,
        },
        annotations: {
            yaxis: [
                {
                    y: 13000,
                    borderColor: "#EF4444", // red
                    label: {
                        borderColor: "#EF4444",
                        style: {
                            color: "#fff",
                            background: "#EF4444",
                        },
                        text: "Alert threshold",
                    },
                },
                {
                    y: 15000,
                    borderColor: "#FBBF24", // yellow
                    label: {
                        borderColor: "#FBBF24",
                        style: {
                            color: "#000",
                            background: "#FBBF24",
                        },
                        text: "Warning threshold",
                    },
                },
            ],
        },
        tooltip: {
            x: {
                format: "MMM",
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Cashflow",
            data: [12000, 15000, 13000, 14000, 18000, 20000, 17000, 16000, 19000, 21000, 22000, 25000],
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
                        Cashflow overview
                        <span className="flex gap-2 ml-4 text-sm">
                            <span className="flex items-center gap-1 text-red-500">
                                <span className="w-2 h-2 rounded-full bg-red-500" /> Alert
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500">
                                <span className="w-2 h-2 rounded-full bg-yellow-500" /> Warning
                            </span>
                        </span>
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Monthly cash inflow and outflow trends
                    </p>
                </div>
                {/*<div className="flex items-start w-full gap-3 sm:justify-end">*/}
                {/*    <ChartTab />*/}
                {/*</div>*/}
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[1000px] xl:min-w-full">
                    <Chart options={options} series={series} type="area" height={310} />
                </div>
            </div>
        </div>
    );
}
