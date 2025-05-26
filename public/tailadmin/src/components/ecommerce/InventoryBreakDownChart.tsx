import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Dummy ChartTab to switch branches
function BranchTab({ selectedBranch, onChange }: { selectedBranch: number; onChange: (id: number) => void }) {
    const branches = [1, 2, 3, 4];
    return (
        <div className="flex space-x-2">
            {branches.map((branch) => (
                <button
                    key={branch}
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                        selectedBranch === branch
                            ? "bg-[#12baab] text-white"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white"
                    }`}
                    onClick={() => onChange(branch)}
                >
                    Branch {branch}
                </button>
            ))}
        </div>
    );
}

// Generate random data
const generateRandomQuantities = () =>
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 50); // Random quantity between 50 and 149

export default function InventoryBreakdownChart() {
    const [selectedBranch, setSelectedBranch] = useState(1);

    const inventoryData: Record<number, number[]> = {
        1: generateRandomQuantities(),
        2: generateRandomQuantities(),
        3: generateRandomQuantities(),
        4: generateRandomQuantities(),
    };

    const categories = ["Sofas", "Beds", "Chairs", "Tables", "Cabinets"];

    const options: ApexOptions = {
        chart: {
            type: "pie",
            height: 310,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
        },
        labels: categories,
        colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        legend: {
            position: "bottom",
            labels: {
                colors: "#6B7280",
                useSeriesColors: false,
            },
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
                const label = w.globals.labels[seriesIndex];
                const value = series[seriesIndex];
                return `<div style="padding: 8px;">
                          <strong>${label}</strong>: ${value} items
                        </div>`;
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: { width: "100%" },
                    legend: { position: "bottom" },
                },
            },
        ],
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Inventory Breakdown
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Items in stock per category (Branch {selectedBranch})
                    </p>
                </div>
                <div className="flex items-start w-full gap-3 sm:justify-end">
                    <BranchTab selectedBranch={selectedBranch} onChange={setSelectedBranch} />
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[300px] xl:min-w-full">
                    <Chart
                        options={options}
                        series={inventoryData[selectedBranch]}
                        type="pie"
                        height={310}
                    />
                </div>
            </div>
        </div>
    );
}
