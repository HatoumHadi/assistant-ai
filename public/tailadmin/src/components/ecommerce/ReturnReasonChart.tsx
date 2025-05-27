import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ReturnReasonsChart = () => {
    const returnReasons = ["Wrong Size", "Damaged Item", "Late Delivery", "Changed Mind", "Wrong Item Sent"];
    const values = [120, 90, 60, 40, 30];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6,
                barHeight: "60%",
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} returns`,
            style: {
                fontSize: "14px",
                colors: ["#fff"],
            },
        },
        xaxis: {
            categories: returnReasons,
            labels: {
                style: {
                    fontSize: "13px",
                    colors: "#6B7280",
                },
            },
        },
        colors: ["#FF6384", "#FFA726", "#36A2EB", "#4BC0C0", "#9966FF"],
        tooltip: {
            y: {
                formatter: (val: number) => `${val} items returned`,
            },
        },
        grid: {
            borderColor: "#e0e0e0",
            strokeDashArray: 5,
        },
    };

    return (
        <div className="bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Return Reasons Overview
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Analysis of why items are returned based on customer feedback.
            </p>
            <Chart options={options} series={[{ data: values }]} type="bar" height={350} />
        </div>
    );
};

export default ReturnReasonsChart;
