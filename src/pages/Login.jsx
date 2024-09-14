import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importação do axios para fazer a requisição ao backend - Para requisições HTTP

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);   // Estado para armazenar erros, se houver
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Requisição para o backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                senha
            });

            // Se a autenticação for bem-sucedida, armazenar o token no localStorage
            localStorage.setItem('token', response.data.token);

            // Redirecionar o usuário autenticado
            navigate('/dashboard/dashboardHome');
        } catch (error) {
            // Exibir mensagem de erro vinda do backend (se disponível)
            // Se ocorrer um erro (como credenciais inválidas)
            const errorMessage = error.response?.data?.message || "Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.";
            setError(errorMessage);
        }
    };

    return (
        <main>
            <h1>Login</h1>
            <form className='LoginForm' onSubmit={handleSubmit}>
                <input 
                    className='LoginInput' 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    className='LoginInput' 
                    type="password" 
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    required 
                />
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibir erro, se houver */}
                <button className="ButtonTotal" type="submit">Entrar</button>
            </form>
        </main>
    );
}