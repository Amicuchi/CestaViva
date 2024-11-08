// Função utilitária para verificar se o token está presente
export default function isLogged() {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true se o token existir, e false caso contrário
};