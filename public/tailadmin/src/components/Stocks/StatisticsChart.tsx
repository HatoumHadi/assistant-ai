import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

type RangeKey = "Monthly" | "Quarterly" | "Annually";

const chartData: Record<RangeKey, { x: string; y: number }[]> = {
    Monthly: [
        { x: "Jan '25", y: 10133 },
        { x: "Feb '25", y: 10000 },
        { x: "Mar '25", y: 8267 },
        { x: "Apr '25", y: 6400 },
        { x: "May '25", y: 4533 },
        { x: "Jun '25", y: 2667 },
        { x: "Jul '25", y: 800 },
        { x: "Aug '25", y: 4000 },
        { x: "Sep '25", y: 3000 },
    ],
    Quarterly: [
        { x: "Q1 '25", y: 3300 },
        { x: "Q2 '25", y: 2880 },
        { x: "Q3 '25", y: 2760 },
    ],
    Annually: [
        { x: "2022", y: 10400 },
        { x: "2023", y: 10950 },
        { x: "2024", y: 10120 },
        { x: "2025", y: 8940 },
    ],
};

export const StockPerformance = () => {
    const [selectedRange, setSelectedRange] = useState<RangeKey>("Monthly");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const options: ApexOptions = {
        chart: {
            type: "area",
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: ["#12baab"],
        },
        markers: {
            size: 5,
            colors: ["#12baab"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 7,
            },
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
            labels: { style: { fontSize: "12px" } },
        },
        yaxis: {
            min: 800,
            max: 12000,
            tickAmount: 6,
            labels: {
                formatter: (val) => `${Math.round(val).toLocaleString()} units`,
            },
        },
        tooltip: {
            marker: {
                fillColors: ["#12baab"],
            },
            y: {
                formatter: (val) => `${Math.round(val).toLocaleString()} units`,
            },
        },
    };

    const series = [
        {
            name: "Stock Units",
            data: chartData[selectedRange],
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow p-6 dark:border-gray-800 dark:bg-white/[0.03] w-full max-w-full overflow-hidden">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                <div>
                    <h2 className="text-xl font-semibold dark:text-white">Stock Performance</h2>
                    <p className="text-sm text-gray-500 dark:text-white">
                        Track inventory units across your furniture business
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative w-[120px] z-40">
                        <button
                            onClick={toggleDropdown}
                            className="px-3 py-1 rounded-md text-sm text-white w-full"
                            style={{ backgroundColor: "#12baab" }}
                        >
                            {selectedRange}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute left-0 top-full mt-1 w-36 rounded-md bg-white shadow-lg border border-gray-200 z-50 dark:bg-gray-800 dark:border-gray-700">
                                {(["Monthly", "Quarterly", "Annually"] as RangeKey[]).map((range) => (
                                    <DropdownItem
                                        key={range}
                                        onClick={() => {
                                            setSelectedRange(range);
                                            closeDropdown();
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                                    >
                                        {range}
                                    </DropdownItem>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <MoreDotIcon />
                    </button>
                </div>
            </div>

            <Chart
                options={options}
                series={series}
                type="area"
                height={300}
                width="100%"
            />
        </div>
    );
};
