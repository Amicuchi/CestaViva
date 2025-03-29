import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import api from "../services/axiosConfig";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [fotoPerfil, setFotoPerfil] = useState("");
  const navigate = useNavigate();

  // Busca a foto de perfil do usuário caso ele esteja logado
  useEffect(() => {
    if (isAuthenticated) {
      api.get("/entidade")
        .then((response) => {
          setFotoPerfil(response.data.imagem || "default-avatar.png"); // Define uma imagem padrão caso não haja foto
        })
        .catch((error) => console.error("Erro ao carregar foto de perfil:", error));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/">Página Inicial</Link>
        </li>

        {isAuthenticated ? (
          <>
            <li className="menu-dropdown">
              <img
                src={fotoPerfil}
                alt="Perfil"
                className="perfil-foto"
              />
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li onClick={handleLogout}>
                  Sair
                </li>
              </ul>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/busca">Busca</Link>
            </li>
            <li>
              <Link to="/cadastro-entidade">Cadastrar Entidade</Link>
            </li>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
