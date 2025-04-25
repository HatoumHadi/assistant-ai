import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const stocks = [
    {
        symbol: "TSLA",
        name: "Tesla, Inc",
        price: 192.53,
        change: 1.01,
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
        symbol: "AAPL",
        name: "Apple, Inc",
        price: 192.53,
        change: 3.59,
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
        symbol: "SPOT",
        name: "Spotify, Inc",
        price: 130.22,
        change: 2.11,
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    },
    // Add more if needed
];

export default function TrendingStocks() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="p-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Trending Stocks</h2>
                <div className="flex space-x-3">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400 transition"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400 transition"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth"
            >
                {stocks.map((stock) => (
                    <div
                        key={stock.symbol}
                        className="min-w-[250px] bg-gray-100 p-5 dark:bg-white/[0.03] rounded-xl flex flex-col justify-between shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={stock.logo}
                                    alt={stock.symbol}
                                    className="w-10 h-10 rounded-full object-contain bg-white dark:bg-gray-100 p-1"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold dark:text-white">{stock.symbol}</h3>
                                    <p className="text-sm text-gray-500 dark:text-white">{stock.name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold dark:text-white">${stock.price.toFixed(2)}</p>
                                <p
                                    className={`text-sm ${
                                        stock.change > 0 ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {stock.change > 0 ? "↑" : "↓"} {stock.change.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 dark:text-white dark:border-gray-500">
                                Short Stock
                            </button>
                            <button className="flex-1 px-4 py-2 bg-[#12baab] text-white rounded-md text-sm font-medium hover:bg-[#2bcbba] dark:text-white">
                                Buy Stock
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
