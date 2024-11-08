import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

// Componente de contexto para autenticação
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
    // Verifica se o token existe no localStorage ao montar o componente
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Atualiza o estado com base na presença do token
    }, []);

  // Função para realizar o login e salvar o token no localStorage
    const login = (token) => {
        localStorage.setItem('token', token); // Armazena o token
        setIsAuthenticated(true);             // Atualiza o estado para autenticado
    };

  // Função para realizar o logout e remover o token do localStorage
    const logout = () => {
        localStorage.removeItem('token'); // Remove o token
        setIsAuthenticated(false);        // Atualiza o estado para não autenticado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};