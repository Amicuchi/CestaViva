import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home'
import Busca from './pages/Busca';
import CadastroEntidade from './pages/CadastroEntidade';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import DashboardHome from './components/dashboardComponents/DashboardHome'
import DashboardUser from './components/dashboardComponents/DashboardUser'
import Estatisticas from './components/dashboardComponents/Estatisticas'
import Cestas from './components/dashboardComponents/Cestas'
import FAQ from './components/dashboardComponents/FAQ'
import Support from './components/dashboardComponents/Support'
import Settings from './components/dashboardComponents/Settings'
import RedefinirSenha from './components/RedefinirSenha'
import SolicitarRedefinicaoSenha from './components/SolicitarRedefinicaoSenha';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
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
                }>

                    <Route path="dashboardhome" element={<DashboardHome />} />
                    <Route path="perfil" element={<DashboardUser />} />
                    <Route path="estatisticas" element={<Estatisticas />} />
                    <Route path="cestas" element={<Cestas />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="suporte" element={<Support />} />
                    <Route path="configuracoes" element={<Settings />} />
                </Route>

                <Route path="*" element={<div>Nenhuma página encontrada.</div>} />
            </Routes>
            <Footer />
        </Router>
    );
}
