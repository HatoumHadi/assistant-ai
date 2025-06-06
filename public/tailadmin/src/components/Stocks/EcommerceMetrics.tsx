import { ArrowDownIcon, ArrowUpIcon } from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
    return (
        <div className="w-full px-4">

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Business Stocks Overview</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Showcasing all the stocks related to this business</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                            <img alt="Apple, Inc" src="\storage\logoBrand\f1.svg" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">Elite Furniture Co.</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Exquisite Craftsmanship for the Modern Home</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">$1,232.00</h4>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Badge color="success">
                                <ArrowUpIcon className="w-4 h-4" />
                                11.01%
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                            <img alt="Paypal, Inc" src="\storage\logoBrand\f2.svg" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">TimberCraft Interiors</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bringing Nature Inside with Handcrafted Pieces</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">$965.00</h4>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Badge color="error">
                                <ArrowDownIcon className="w-4 h-4" />
                                9.05%
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                            <img alt="Tesla" src="\storage\logoBrand\f3.svg" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">Woodcraft Industries</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Crafting Timeless Furniture with Precision and Passion</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">$1,232.00</h4>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Badge color="success">
                                <ArrowUpIcon className="w-4 h-4" />
                                11.01%
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10">
                            <img alt="Amazon" src="\storage\logoBrand\f4.svg" />
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white">Modern Living Designs</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Fresh, Functional, and Stylish Designs for Every Home</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">$2,567.00</h4>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Badge color="success">
                                <ArrowUpIcon className="w-4 h-4" />
                                11.01%
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
