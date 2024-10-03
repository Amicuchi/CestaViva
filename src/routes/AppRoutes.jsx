import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home/Home'
import Busca from '../pages/Busca/Busca';
import CadastroEntidade from '../pages/CadastroEntidade/CadastroEntidade';
import Login from '../pages/Login/Login';

import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardHome from '../pages/Dashboard/views/DashboardHome/DashboardHome';
import DashboardUser from '../pages/Dashboard/views/User';
import Settings from '../pages/Dashboard/views/Settings/Settings';
import Cestas from '../pages/Dashboard/views/Campanhas/Cestas';
import FAQ from '../pages/Dashboard/views/FAQ/FAQ';

// import RedefinirSenha from '../../components/RedefinirSenha'
import RedefinirSenha from '../pages/RedefinirSenha/RedefinirSenha'
import SolicitarRedefinicaoSenha from '../pages/RedefinirSenha/SolicitarRedefinicaoSenha';

const AppRoutes = () => {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/solicitar-redefinicao-senha" element={<SolicitarRedefinicaoSenha />} />
            <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/cadastro-entidade" element={<CadastroEntidade />} />

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
                <Route path="cestas" element={<Cestas />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="configuracoes" element={<Settings />} />
            </Route>
            <Route path="*" element={<div>Nenhuma página encontrada.</div>} />
        </>
    );
}

export default AppRoutes;
