import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login';
import CadastroEntidade from '../pages/CadastroEntidade';
// import CadastroDoador from '../pages/CadastroDoador';
import DashboardEntidade from '../pages/DashboardEntidade';
import Busca from '../pages/Busca';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppRoutes() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/busca" element={<Busca />} />
                <Route path="/cadastro-entidade" element={<CadastroEntidade />} />
                {/* <Route path="/cadastro-doador" element={<CadastroDoador />} /> */}
                <Route path="/dashboard-entidade" element={<DashboardEntidade />} />
            </Routes>
            <Footer />
        </Router>
    );
}