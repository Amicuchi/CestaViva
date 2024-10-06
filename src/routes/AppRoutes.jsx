import { Routes, Route } from 'react-router-dom';

import Busca from "../pages/Busca/Busca";
import CadastroEntidade from "../pages/CadastroEntidade/CadastroEntidade";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import SolicitarRedefinicaoSenha from "../pages/RedefinirSenha/SolicitarRedefinicaoSenha";

import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard/Dashboard';

import DashboardHome from '../pages/Dashboard/views/DashboardHome/DashboardHome';
import DashboardUser from '../pages/Dashboard/views/User';
import Campanhas from '../pages/Dashboard/views/Campanhas/Campanhas';
import DashboardFAQ from '../pages/Dashboard/views/FAQ/FAQ';
import Settings from '../pages/Dashboard/views/Settings/Settings';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/cadastro-entidade" element={<CadastroEntidade />} />
            <Route path="/login" element={<Login />} />

            <Route path="/solicitar-redefinicao-senha" element={<SolicitarRedefinicaoSenha />} />
            <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                <Route path="dashboardhome" element={<DashboardHome />} />
                <Route path="perfil" element={<DashboardUser />} />
                <Route path="campanhas" element={<Campanhas />} />
                <Route path="faq" element={<DashboardFAQ />} />
                <Route path="configuracoes" element={<Settings />} />
            </Route>
            <Route path="*" element={<div>Nenhuma página encontrada.</div>} />
        </Routes>
    );
}