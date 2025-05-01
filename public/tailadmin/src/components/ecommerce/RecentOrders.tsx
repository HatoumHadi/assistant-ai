import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Product {
    id: number;
    name: string;
    variants: string;
    category: string;
    price: string;
    image: string;
    status: "Delivered" | "Pending" | "Canceled";
}

const tableData: Product[] = [
    {
        id: 1,
        name: "Modern Sofa Set",
        variants: "3 Variants",
        category: "Living Room",
        price: "$1,499.00",
        status: "Delivered",
        image: "https://m.media-amazon.com/images/I/612JFna4YFL._SX679_.jpg",
    },
    {
        id: 2,
        name: "Wooden Dining Table",
        variants: "2 Variants",
        category: "Dining Room",
        price: "$999.00",
        status: "Pending",
        image: "https://mywakeup.in/cdn/shop/files/hall.png?v=1726134058&width=1500",
    },
    {
        id: 3,
        name: "Office Desk",
        variants: "1 Variant",
        category: "Office",
        price: "$689.00",
        status: "Delivered",
        image: "https://i0.wp.com/sleepcomfort.com/wp-content/uploads/2024/04/Stripe-Desk.webp?fit=400%2C400&ssl=1",
    },
    {
        id: 4,
        name: "Queen Bed Frame",
        variants: "2 Variants",
        category: "Bedroom",
        price: "$1,199.00",
        status: "Canceled",
        image: "https://bestier.net/cdn/shop/files/queen-bed-frame-with-headboard-d.jpg?v=1728548699&width=1000",
    },
    {
        id: 5,
        name: "Recliner Armchair",
        variants: "1 Variant",
        category: "Living Room",
        price: "$549.00",
        status: "Delivered",
        image: "https://m.media-amazon.com/images/I/81tueDzYwKL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    },
];

export default function RecentOrders() {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Recent Orders
                </h3>

                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                        Filter
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                        See all
                    </button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Products
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Category
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Price
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {tableData.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                                            <img
                                                src={product.image}
                                                className="h-[50px] w-[50px] object-contain"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.name}
                                            </p>
                                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    {product.category}
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    {product.price}
                                </TableCell>
                                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    <Badge
                                        size="sm"
                                        color={
                                            product.status === "Delivered"
                                                ? "success"
                                                : product.status === "Pending"
                                                    ? "warning"
                                                    : "error"
                                        }
                                    >
                                        {product.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
