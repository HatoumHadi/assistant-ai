import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function BranchTab({ selectedBranch, onChange }: { selectedBranch: number; onChange: (id: number) => void }) {
    const branches = [1, 2, 3, 4];
    return (
        <div className="flex space-x-2">
            {branches.map((branch) => (
                <button
                    key={branch}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedBranch === branch
                            ? "bg-[#12baab] text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    }`}
                    onClick={() => onChange(branch)}
                >
                    Branch {branch}
                </button>
            ))}
        </div>
    );
}

// Fixed revenue data per branch (in dollars)
const REVENUE_DATA: Record<number, number[]> = {
    1: [12500, 9800, 14500, 12000, 13000],
    2: [11500, 10500, 13800, 11000, 12500],
    3: [13500, 9900, 12800, 10000, 14000],
    4: [12000, 10200, 13400, 11500, 12700],
};

const CATEGORIES = ["Sofas", "Beds", "Chairs", "Tables", "Cabinets"];

export default function RevenueByCategoryChart() {
    const [selectedBranch, setSelectedBranch] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [selectedBranch]);

    const options: ApexOptions = {
        chart: {
            type: "pie",
            height: 310,
            toolbar: { show: false },
            fontFamily: "Outfit, sans-serif",
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            sparkline: {
                enabled: loading
            }
        },
        labels: CATEGORIES,
        colors: ["#34d399", "#60a5fa", "#fbbf24", "#f472b6", "#a78bfa"],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#34d399', '#60a5fa', '#fbbf24', '#f472b6', '#a78bfa'],
                inverseColors: true,
                opacityFrom: 0.8,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            width: 2,
            colors: ['#fff']
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                colors: ['#fff']
            },
            dropShadow: {
                enabled: false
            }
        },
        legend: {
            position: "bottom",
            labels: {
                colors: "#6B7280",
                useSeriesColors: false,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5
            }
        },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, w }) {
                const label = w.globals.labels[seriesIndex];
                const value = series[seriesIndex];
                return `<div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                          <strong class="text-gray-800 dark:text-white">${label}</strong>: <span class="font-semibold text-[#12baab]">$${value.toLocaleString()}</span>
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
        <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] dark:hover:shadow-lg sm:px-6 sm:pt-6">
            <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Revenue by Category
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Revenue breakdown by furniture type (Branch {selectedBranch})
                    </p>
                </div>
                <div className="flex items-start w-full gap-3 sm:justify-end">
                    <BranchTab selectedBranch={selectedBranch} onChange={setSelectedBranch} />
                </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[300px] xl:min-w-full">
                    {loading ? (
                        <div className="flex justify-center items-center h-[310px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#12baab]"></div>
                        </div>
                    ) : (
                        <Chart
                            key={selectedBranch}
                            options={options}
                            series={REVENUE_DATA[selectedBranch]}
                            type="pie"
                            height={310}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
