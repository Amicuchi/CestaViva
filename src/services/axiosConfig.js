import axios from 'axios';

// Criação da instância Axios com a baseURL dinâmica vinda das variáveis de ambiente
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Usar uma fallback caso VITE_API_URL não esteja definida
});

// Interceptador para adicionar o token de autorização em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
    }
    return config; // Retorna a configuração modificada
}, (error) => {
    return Promise.reject(error); // Trata possíveis erros
});

export default api;