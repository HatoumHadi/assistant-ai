import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

export default function SalesChart() {
    const options: ApexOptions = {
        chart: {
            type: "area",
            height: 310,
            toolbar: {
                show: false,
            },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#FF5733"], // Warm tone for furniture sales trend
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
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: "12px",
                    colors: ["#6B7280"],
                },
                formatter: (val: number) => `$${(val / 1000).toFixed(0)}k`,
            },
        },
        tooltip: {
            x: { format: "MMM" },
            y: {
                formatter: (val: number) => `$${val.toLocaleString()} USD`,
            },
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Total Revenue",
            data: [
                95000,   // Jan
                112000,  // Feb
                121000,  // Mar
                135000,  // Apr
                149000,  // May
                160000,  // Jun
                142000,  // Jul
                138000,  // Aug
                151000,  // Sep
                172000,  // Oct
                183000,  // Nov
                195000   // Dec
            ],
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Furniture Sales Overview
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Monthly revenue trends from furniture sales in 2024
                    </p>
                </div>
                <div className="flex items-start w-full gap-3 sm:justify-end">
                    <ChartTab />
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[1000px] xl:min-w-full">
                    <Chart options={options} series={series} type="area" height={310} />
                </div>
            </div>
        </div>
    );
}
