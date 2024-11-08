import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/images/avatar.png';
import { useAuth } from '../services/AuthContext';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav>
            <ul>
                {isAuthenticated ? (
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
                )}
            </ul>
        </nav>
    );
}