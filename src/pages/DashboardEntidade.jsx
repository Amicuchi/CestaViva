import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import DashboardMain from "../components/dashboardComponents/DashboardMain";
import DashboardSidebar from "../components/dashboardComponents/DashboardSidebar";

function DashboardEntidade() {
    return (
        <>
            <DashboardHeader />
            <DashboardSidebar />
            <DashboardMain />
        </>
    );
}

export default DashboardEntidade;
