import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function Navbar() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <></>
            ) : (
                <nav>
                    <ul>
                        <li><Link to="/">Página Inicial</Link></li>
                        <li><Link to="/busca">Busca</Link></li>
                        <li><Link to="/cadastro-entidade">Cadastrar Entidade</Link></li>
                        <li><Link to="/login">Entrar</Link></li>
                    </ul>
                </nav>
            )}
        </>
    );
}