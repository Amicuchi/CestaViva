// Essa é a tela inicial do Dashboard.
// Quando o usuário entra no Dashboard, essa é a primeira tela que ele deve ver.

import DashboardCards from "./DashboardCards";
import DashboardTable from "./DashboardTable";

export default function DashboardHome() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <DashboardCards />
                <DashboardTable />
            </div>
        </div>
    );
}