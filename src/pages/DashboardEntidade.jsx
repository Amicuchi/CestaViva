import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import DashboardCards from "../components/dashboardComponents/DashboardCards";
import DashboardSidebar from "../components/dashboardComponents/DashboardSidebar";
import DashboardTable from "../components/dashboardComponents/DashboardTable";

function DashboardEntidade() {
    return (
        <div className="dashboard-container">
            <DashboardSidebar />
            <div className="dashboard-content">
                <DashboardHeader />
                <DashboardCards />
                <DashboardTable />
            </div>
        </div>
    );
}

export default DashboardEntidade;
