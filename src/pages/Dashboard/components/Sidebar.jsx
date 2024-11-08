import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachographDigital, 
    faUser, 
    faBriefcase, 
    faGear, 
    faCircleQuestion, 
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import '../Dashboard.css';
import { useAuth } from '../../../services/AuthContext';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <ul className="menu">
                <li className='active'>
                    <Link to="dashboardhome">
                        <FontAwesomeIcon icon={faTachographDigital} className="fas" />
                        <span className="menu-text">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="perfil">
                        <FontAwesomeIcon icon={faUser} className="fas" />
                        <span className="menu-text">Perfil</span>
                    </Link>
                </li>
                <li>
                    <Link to="campanhas">
                        <FontAwesomeIcon icon={faBriefcase} className="fas" />
                        <span className="menu-text">Campanhas</span>
                    </Link>
                </li>
                <li>
                    <Link to="configuracoes">
                        <FontAwesomeIcon icon={faGear} className="fas" />
                        <span className="menu-text">Configurações</span>
                    </Link>
                </li>
                <li>
                    <Link to="faq">
                        <FontAwesomeIcon icon={faCircleQuestion} className="fas" />
                        <span className="menu-text">Ajuda</span>
                    </Link>
                </li>
                <li className='logout'>
                    <Link to="/" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="fas" />
                        <span className="menu-text">Sair</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
