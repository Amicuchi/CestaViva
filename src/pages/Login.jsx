import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de autenticação
        const isEntidade = true; // Simulação, verificar a partir da API
        
        if (isEntidade) {
            navigate('/dashboard');
        } else {
            navigate('/busca');
        }
    };

    return (
        <main>
            <h1>Login</h1>
            <form className='LoginForm' onSubmit={handleSubmit}>
                <input className='LoginInput' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='LoginInput' type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button className="ButtonTotal" type="submit">Entrar</button>
            </form>
        </main>
    );
}