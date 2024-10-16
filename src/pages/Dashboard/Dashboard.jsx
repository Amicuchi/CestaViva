// Dashboard
import { Outlet, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from 'react';
import Campanhas from './views/Campanhas/Campanhas';

export default function Dashboard() {
    const location = useLocation(); // Hook para pegar a rota atual

    // Função para definir o título com base na rota atual
    const getTitle = () => {
        switch (location.pathname) {
            case '/dashboard/dashboardhome':
                return 'Dashboard';
            case '/dashboard/perfil':
                return 'Perfil da Entidade';
            case '/dashboard/campanhas':
                return 'Gerenciamento de Campanhas';
            case '/dashboard/faq':
                return 'Perguntas Frequentes';
            case '/dashboard/configuracoes':
                return 'Configurações';
            default:
                return 'Painel de Controle';
        }
    };

    // Estado para controlar a abertura do modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função que será passada para o Header
    const abrirModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <Header title={getTitle()} abrirModal={abrirModal} />
                {/* Passando a função abrirModal como prop para Campanhas */}
                <Campanhas
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <Outlet />
            </div>
        </div>
    );
}
