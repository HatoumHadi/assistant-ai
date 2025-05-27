import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// No need to import React if not using JSX transformations like React.createElement
// Remove import React if you're using React 17+ with the new JSX transform and no ESLint rule requires it

export default function DeliveryTimeHistogram() {
    const deliveryDays = Array.from({ length: 100 }, () =>
        Math.floor(Math.random() * 10) + 1
    );

    const bins = Array(10).fill(0);
    deliveryDays.forEach((day) => {
        bins[day - 1]++;
    });

    const options: ApexOptions = {
        chart: {
            type: "bar" as const, // FIX: assert the literal string
            height: 350,
            fontFamily: "Outfit, sans-serif",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "60%",
            },
        },
        dataLabels: {
            enabled: true,
        },
        xaxis: {
            categories: ["1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d"],
            title: {
                text: "Delivery Duration (Days)",
                style: {
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            title: {
                text: "Number of Deliveries",
                style: {
                    fontSize: "14px",
                },
            },
        },
        colors: ["#12baab"],
        tooltip: {
            y: {
                formatter: (val: number) => `${val} deliveries`,
            },
        },
        grid: {
            borderColor: "#e0e0e0",
        },
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                Delivery Time Histogram
            </h3>
            <p className="text-gray-500 text-sm dark:text-gray-400 mb-4">
                This chart shows how many deliveries fall into each delivery duration category (in days).
            </p>
            <Chart
                options={options}
                series={[{ name: "Deliveries", data: bins }]}
                type="bar"
                height={350}
            />
        </div>
    );
}
