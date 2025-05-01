import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

type RangeKey = "Monthly" | "Quarterly" | "Annually";

const chartData: Record<RangeKey, { x: string; y: number }[]> = {
    Monthly: [
        { x: "Jan '25", y: 1200 },
        { x: "Feb '25", y: 1120 },
        { x: "Mar '25", y: 980 },
        { x: "Apr '25", y: 890 },
        { x: "May '25", y: 1020 },
        { x: "Jun '25", y: 970 },
        { x: "Jul '25", y: 930 },
        { x: "Aug '25", y: 880 },
        { x: "Sep '25", y: 950 },
    ],
    Quarterly: [
        { x: "Q1 '25", y: 3300 }, // Jan+Feb+Mar
        { x: "Q2 '25", y: 2880 }, // Apr+May+Jun
        { x: "Q3 '25", y: 2760 }, // Jul+Aug+Sep
    ],
    Annually: [
        { x: "2022", y: 10400 },
        { x: "2023", y: 10950 },
        { x: "2024", y: 10120 },
        { x: "2025", y: 8940 }, // Projection
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
                formatter: (val) => `${val.toFixed(0)} units`,
            },
        },
        tooltip: {
            marker: {
                fillColors: ["#12baab"],
            },
            y: {
                formatter: (val) => `${val.toFixed(0)} units`,
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
                    <div className="relative w-[120px]">
                        <button
                            onClick={toggleDropdown}
                            className="px-3 py-1 rounded-md text-sm text-white w-full"
                            style={{ backgroundColor: "#12baab" }}
                        >
                            {selectedRange}
                        </button>

                        <Dropdown isOpen={dropdownOpen} onClose={closeDropdown}>
                            <div className="absolute mt-2 w-36 rounded-md bg-white shadow-lg z-10">
                                {(["Monthly", "Quarterly", "Annually"] as RangeKey[]).map((range) => (
                                    <DropdownItem
                                        key={range}
                                        onClick={() => {
                                            setSelectedRange(range);
                                            closeDropdown();
                                        }}
                                    >
                                        {range}
                                    </DropdownItem>
                                ))}
                            </div>
                        </Dropdown>
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-md">
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
