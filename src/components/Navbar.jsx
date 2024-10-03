import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import isLogged from '../utils/isLogged';
import avatar from '../assets/images/avatar.png';

export default function Navbar() {

    const [userLogged, setUserLogged] = useState(isLogged());
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica o estado do login na montagem
        setUserLogged(isLogged());
    }, []);

    // Função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem('token');   // Remove o token do localStorage
        setUserLogged(false);               // Atualiza o estado para refletir que o usuário não está mais logado
        navigate('/');                      // Redireciona para a página inicial
    };

    return (
        <nav>
            <ul>
                {
                    userLogged ? (
                        <>
                            <li>
                                <img
                                    src={avatar}
                                    alt="Avatar do Usuário"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </li>
                            <li><Link to="/" onClick={handleLogout}>Sair</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/">Página Inicial</Link></li>
                            <li><Link to="/busca">Busca</Link></li>
                            <li><Link to="/cadastro-entidade">Cadastrar Entidade</Link></li>
                            <li><Link to="/login">Entrar</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
}
