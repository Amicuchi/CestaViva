// Função utilitária para verificar se o token está presente e válido
export default function isLogged() {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    // Verifica a validade do token
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // Verifica se o token expirou
        if (payload.exp && payload.exp < currentTime) {
            localStorage.removeItem('token'); // Remove token expirado
            return false;
        }

        return true;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        // Se ocorrer um erro ao decodificar o token, consideramos inválido
        return false;
    }
}
