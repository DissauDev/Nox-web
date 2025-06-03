import CategoriesChart from "@/components/admin/CategoriesChart";
import SalesChart from "@/components/admin/SalesChart";
import StatsCards from "@/components/admin/StatsCards";
import TopSelling from "@/components/admin/TopSelling";

export default function Dashboard() {
  return (
    <div className="flex  text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Stats Cards Mejoradas */}
        <StatsCards />
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <CategoriesChart />
        </div>
        <TopSelling />
      </div>
    </div>
  );
}
