// Função utilitária para verificar se o token está presente
export default function isLogged() {
    const token = localStorage.getItem('token');
    !token ? false : true
}
