import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

export default function StatisticsChart() {
    const [selected, setSelected] = useState<"optionOne" | "optionTwo" | "optionThree">("optionOne");

    // Dynamically update chart data based on selection
    const getSeriesData = () => {
        switch (selected) {
            case "optionTwo": // Quarterly
                return [850, 630, 500, 320, 250];
            case "optionThree": // Annually
                return [3200, 2650, 1940, 1450, 1100];
            default: // Monthly
                return [320, 250, 180, 120, 90];
        }
    };

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 310,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#12baab"],
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "40%",
                distributed: true,
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ["Sofa Set", "Dining Table", "Office Chair", "Bookshelf", "TV Stand"],
            labels: {
                style: { fontSize: "12px", colors: ["#6B7280"] },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: { fontSize: "12px", colors: ["#6B7280"] },
            },
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} units`,
            },
        },
        legend: { show: false },
    };

    const series = [{ name: "Units Sold", data: getSeriesData() }];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Best-Selling Furniture
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Furniture items ranked by total units sold
                    </p>
                </div>
                <div className="flex items-start w-full gap-3 sm:justify-end">
                    <ChartTab selected={selected} onChange={setSelected} />
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[1000px] xl:min-w-full">
                    <Chart options={options} series={series} type="bar" height={310} />
                </div>
            </div>
        </div>
    );
}
