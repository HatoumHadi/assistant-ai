import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function CustomerSatisfactionChart() {
    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 310,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                horizontal: false,
                columnWidth: "45%",
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => `${val}%`,
            style: {
                fontSize: '12px',
                colors: ["#fff"]
            },
        },
        colors: ["#00C49F", "#FFBB28", "#FF4C4C"], // Promoters, Passives, Detractors
        xaxis: {
            categories: ["Promoters", "Passives", "Detractors"],
            labels: {
                style: {
                    fontSize: "14px",
                    colors: ["#00C49F", "#FFBB28", "#FF4C4C"],
                },
            },
        },
        yaxis: {
            max: 100,
            labels: {
                formatter: (val) => `${val}%`,
                style: {
                    fontSize: "12px",
                    colors: ["#6B7280"],
                },
            },
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val}% of respondents`,
            },
        },
        grid: {
            yaxis: {
                lines: { show: true },
            },
            xaxis: {
                lines: { show: false },
            },
        },
        legend: { show: false },
    };

    const series = [
        {
            name: "Customer Feedback",
            data: [68, 20, 12], // Random sample percentages
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Customer Satisfaction (NPS)
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Measures the percentage of promoters, passives, and detractors based on recent survey results.
                    </p>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[300px] xl:min-w-full">
                    <Chart options={options} series={series} type="bar" height={310} />
                </div>
            </div>
        </div>
    );
}
