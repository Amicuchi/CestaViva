import { Outlet } from 'react-router-dom';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}