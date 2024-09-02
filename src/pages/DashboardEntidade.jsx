import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import DashboardMain from "../components/dashboardComponents/DashboardMain";
import DashboardSidebar from "../components/dashboardComponents/DashboardSidebar";

function DashboardEntidade() {
    return (
        <div className="dashboard-container">
            <DashboardSidebar />
            <div className="dashboard-content">
                <DashboardHeader />
                <DashboardMain />
            </div>
        </div>
    );
}

export default DashboardEntidade;
