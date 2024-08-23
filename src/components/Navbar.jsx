import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Página Inicial</Link></li>
                <li><Link to="/busca">Busca</Link></li>
                <li><Link to="/cadastro-entidade">Cadastrar Entidade</Link></li>
                <li><Link to="/cadastro-doador">Cadastrar Doador</Link></li>
                <li><Link to="/login">Entrar</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
