import { Outlet } from 'react-router-dom';

import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import DashboardSidebar from "../components/dashboardComponents/DashboardSidebar";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <DashboardSidebar />
            <div className="dashboard-content">
                <DashboardHeader />
                <Outlet />
            </div>
        </div>
    );
}