// Essa é a tela inicial do Dashboard.
// Quando o usuário entra no Dashboard, essa é a primeira tela que ele deve ver.

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../services/axiosConfig";
import { useAuth } from "../../../../services/AuthContext";
import "./DashboardHome.css";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [entidade, setEntidade] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      try {
        const response = await api.get("/entidade");
        setEntidade(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboardHome-container">
      <div className="dashboardHomeCard-content">
        {entidade ? (
          <>
            <h2>Olá, {entidade.nomeFantasia}!</h2>
            <p>Bem-vindo ao seu painel de controle.</p>

            {/* <div className="dashboardHome-stats">
              
              <div className="dashboardHomeStat-card">
                <h3>12</h3>
                <span className="title">Produtos Cadastrados</span>
              </div>

              <div className="dashboardHomeStat-card">
                <h3>27</h3>
                <span className="title">Produtos Recebidos</span>
              </div>
            </div> */}

            <section className="dashboardHome-actions">
              <Link to="/dashboard/perfil" className="button">Atualizar Perfil</Link>
              <Link to="/dashboard/campanhas" className="button">Visualizar Doações</Link>
            </section>
          </>
        ) : (
          <p>Carregando informações...</p>
        )}
      </div>
    </div>
  );
}
