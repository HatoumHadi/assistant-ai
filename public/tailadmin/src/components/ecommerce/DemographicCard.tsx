import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { MoreDotIcon } from "../../icons";
import CountryMap from "./CountryMap";

export default function DemographicCard() {
    const [isOpen, setIsOpen] = useState(false);

    // function toggleDropdown() {
    //     setIsOpen(!isOpen);
    // }

    function closeDropdown() {
        setIsOpen(false);
    }

    const countries = [
        {
            name: "USA",
            flag: "/storage/images/country/country-01.svg",
            customers: 3200,
            percentage: 42,
        },
        {
            name: "France",
            flag: "/storage/images/country/country-02.svg",
            customers: 1800,
            percentage: 24,
        },
        {
            name: "UK",
            flag: "/storage/images/country/country-04.svg",
            customers: 1300,
            percentage: 17,
        },
        {
            name: "Finland",
            flag: "/storage/images/country/country-06.svg",
            customers: 700,
            percentage: 9,
        },
        {
            name: "Belgium",
            flag: "/storage/images/country/country-07.svg",
            customers: 550,
            percentage: 8,
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Customers Demographic
                    </h3>
                    <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
                        Number of customers by country (Furniture Sales)
                    </p>
                </div>
                <div className="relative inline-block">
                    {/*<button className="dropdown-toggle" onClick={toggleDropdown}>*/}
                    {/*    <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />*/}
                    {/*</button>*/}
                    <Dropdown
                        isOpen={isOpen}
                        onClose={closeDropdown}
                        className="w-40 p-2"
                    >
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            View More
                        </DropdownItem>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            Delete
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className="px-4 py-6 my-6 overflow-hidden border border-gray-200 rounded-2xl dark:border-gray-800 sm:px-6">
                <div
                    id="mapOne"
                    className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[800px] xl:w-[425px] 2xl:w-[554px]"
                >
                    <CountryMap />
                </div>
            </div>

            <div className="space-y-5">
                {countries.map((country) => (
                    <div className="flex items-center justify-between" key={country.name}>
                        <div className="flex items-center gap-3">
                            <div className="items-center w-full rounded-full max-w-8">
                                <img src={country.flag} alt={country.name} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                                    {country.name}
                                </p>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {country.customers.toLocaleString()} Customers
                </span>
                            </div>
                        </div>

                        <div className="flex w-full max-w-[140px] items-center gap-3">
                            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                                <div
                                    className="absolute left-0 top-0 h-full rounded-sm bg-brand-500 text-xs font-medium text-white"
                                    style={{ width: `${country.percentage}%` }}
                                ></div>
                            </div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {country.percentage}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
