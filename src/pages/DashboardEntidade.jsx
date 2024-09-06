import { Routes, Route } from 'react-router-dom';

import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import DashboardCards from "../components/dashboardComponents/DashboardCards";
import DashboardSidebar from "../components/dashboardComponents/DashboardSidebar";
import DashboardTable from "../components/dashboardComponents/DashboardTable";

import DashboardHome from '../components/dashboardComponents/DashboardHome';
import DashboardUser from "../components/dashboardComponents/User";
import Estatisticas from '../components/dashboardComponents/Estatisticas';
import FAQ from "../components/dashboardComponents/FAQ";
import Cestas from "../components/dashboardComponents/Cestas";
import Support from "../components/dashboardComponents/Support";
import Settings from "../components/dashboardComponents/Settings";

export default function DashboardEntidade() {
    return (
        <div className="dashboard-container">
            <DashboardSidebar />
            <div className="dashboard-content">
                <DashboardHeader />
                <DashboardCards />
                <DashboardTable />
                <Routes>
                    <Route path="/dashboard-entidade" element={<DashboardHome />} />
                    <Route path="/perfil" element={<DashboardUser />} />
                    <Route path="/estatisticas" element={<Estatisticas />} />
                    <Route path="/cestas" element={<Cestas />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/suporte" element={<Support />} />
                    <Route path="/configuracoes" element={<Settings />} />
                    <Route path="*" element={<DashboardCards />} />
                </Routes>
            </div>
        </div>
    );
}