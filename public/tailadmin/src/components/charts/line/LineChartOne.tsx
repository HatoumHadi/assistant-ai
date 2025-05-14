import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartPNL() {
    const profitData = [456789, 380000, 412000, 395000, 440000, 470000, 460000, 480000, 500000, 490000, 510000, 530000];
    const lossData = [12000, 10000, 8000, 9500, 11000, 7000, 6000, 8500, 9000, 7500, 6500, 5000];

    const options: ApexOptions = {
        chart: {
            type: "line",
            height: 310,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        colors: ["#0f9d58", "#d93025"], // Green for profit, Red for loss
        stroke: {
            curve: "smooth",
            width: 4,
        },
        markers: {
            size: 5,
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7,
            },
        },
        dataLabels: { enabled: false },
        tooltip: {
            shared: true,
            y: {
                formatter: (val) => `$${val.toLocaleString()}`,
            },
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
        },
        xaxis: {
            type: "category",
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false },
        },
        yaxis: [
            {
                seriesName: "Profit",
                title: {
                    text: "Profit",
                },
                labels: {
                    formatter: (val) => `$${val.toLocaleString()}`,
                    style: { colors: "#0f9d58" },
                },
            },
            {
                opposite: true,
                seriesName: "Loss",
                title: {
                    text: "Loss",
                },
                labels: {
                    formatter: (val) => `$${val.toLocaleString()}`,
                    style: { colors: "#d93025" },
                },
            },
        ],
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
        },
    };

    const series = [
        {
            name: "Profit",
            type: "line",
            data: profitData,
        },
        {
            name: "Loss",
            type: "line",
            data: lossData,
        },
    ];

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div id="chartPNL" className="min-w-[1000px]">
                <Chart options={options} series={series} type="line" height={310} />
            </div>
        </div>
    );
}
