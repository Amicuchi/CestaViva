// Essa é a tela inicial do Dashboard.
// Quando o usuário entra no Dashboard, essa é a primeira tela que ele deve ver.

import DashboardCards from "./DashboardCards";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTable from "./DashboardTable";
import DashboardHeader from "./DashboardHeader";

export default function DashboardHome() {
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