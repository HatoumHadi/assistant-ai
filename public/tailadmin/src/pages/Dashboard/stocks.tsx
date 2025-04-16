import EcommerceMetrics from "../../components/Stocks/EcommerceMetrics";
import DemographicCard from "../../components/Stocks/DemographicCard";
import TrendingStocks from "../../components/Stocks/MonthlySalesChart";
import PageMeta from "../../components/common/PageMeta";
import { PortfolioPerformance } from "../../components/Stocks/StatisticsChart";

export default function Stocks() {
    return (
        <>
            <PageMeta
                title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
                description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <EcommerceMetrics />
                </div>

                <div className="col-span-12">
                    <DemographicCard />
                </div>
                <div className="col-span-12">
                    <PortfolioPerformance />
                </div>

                <div className="col-span-12">
                    <TrendingStocks />
                </div>
            </div>
        </>
    );
}


