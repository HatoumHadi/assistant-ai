import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
// import InventoryStatus from "../../components/ecommerce/InventoryStatus";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import CashflowOverview from "../../components/ecommerce/CashflowOverview";
import BestSellingItems from "../../components/ecommerce/BestSellingItems";
import KpiIndicators from "../../components/ecommerce/KpiIndicators";
import InventoryBreakdownChart from "../../components/ecommerce/InventoryBreakDownChart.tsx";
import SeasonalDemandChart from "../../components/ecommerce/SeasonalDemondChart.tsx";
import CustomerSatisfactionChart from "../../components/ecommerce/CustomerSatisfactionChart.tsx";
import ReturnReasonChart from "../../components/ecommerce/ReturnReasonChart.tsx";
import DeliveryTimeHistogram from "../../components/ecommerce/DelivaryTimeHistogram.tsx";
import RevenueByCategory from "../../components/ecommerce/RevenueByCategory.tsx";

export default function Home() {
    return (
        <>
            <PageMeta
                title="Dashboard Template"
                description="React.js Ecommerce Dashboard page"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">

                <div className="col-span-12">
                    <InventoryBreakdownChart/>
                </div>

                <div className="col-span-12">
                    <SeasonalDemandChart/>
                </div>

                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics/>

                    <MonthlySalesChart/>
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <MonthlyTarget/>
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <DemographicCard/>
                </div>

                <div className="col-span-12 xl:col-span-7">
                    <RecentOrders/>
                </div>

                <div className="col-span-12">
                    <StatisticsChart/>
                </div>

                {/*<div className="col-span-12">*/}
                {/*    <InventoryStatus/>*/}
                {/*</div>*/}
                <div className="col-span-12">
                    <CashflowOverview/>
                </div>
                <div className="col-span-12">
                    <BestSellingItems/>
                </div>
                <div className="col-span-12">
                    <KpiIndicators/>
                </div>
                <div className="col-span-12">
                    <CustomerSatisfactionChart/>
                </div>

                <div className="col-span-12">
                    <ReturnReasonChart/>
                </div>

                <div className="col-span-12">
                    <DeliveryTimeHistogram/>
                </div>

                <div className="col-span-12">
                    <RevenueByCategory/>
                </div>
            </div>
        </>
    );
}
