import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function SeasonalDemandChart() {
    const seasons = ["Spring", "Summer", "Fall", "Winter"];

    // Randomly generated data for 2023 and 2024
    const series = [
        {
            name: "2023",
            data: [320, 450, 370, 590], // e.g., Spring to Winter for 2023
        },
        {
            name: "2024",
            data: [380, 420, 390, 640], // e.g., Spring to Winter for 2024
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            stacked: false,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#008FFB", "#FF4560"],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "45%",
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: seasons,
            title: {
                text: "Season",
            },
            labels: {
                style: { colors: "#6B7280" },
            },
        },
        yaxis: {
            title: {
                text: "Units Sold",
            },
            labels: {
                formatter: (val: number) => `${val} units`,
                style: { colors: "#6B7280" },
            },
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val} units`,
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            labels: {
                colors: "#6B7280",
            },
        },
        grid: {
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } },
        },
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Seasonal Demand Comparison
                </h3>
                <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                    A year-over-year comparison of seasonal product demand. Sofas typically peak in winter.
                </p>
            </div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
}
