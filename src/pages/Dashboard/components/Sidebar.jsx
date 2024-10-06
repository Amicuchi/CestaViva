import { Link } from 'react-router-dom';
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

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul className="menu">
                <li className='active'>
                    <Link to="dashboardhome">
                        <FontAwesomeIcon icon={faTachographDigital} className="fas" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="perfil">
                        <FontAwesomeIcon icon={faUser} className="fas" />
                        <span>Perfil</span>
                    </Link>
                </li>
                {/* <li>
                    <Link to="estatisticas">
                        <FontAwesomeIcon icon={faChartBar} className="fas" />
                        <span>Estatísticas</span>
                    </Link>
                </li> */}
                <li>
                    <Link to="campanhas">
                        <FontAwesomeIcon icon={faBriefcase} className="fas" />
                        <span>Campanhas</span>
                    </Link>
                </li>
                <li>
                    <Link to="configuracoes">
                        <FontAwesomeIcon icon={faGear} className="fas" />
                        <span>Configurações</span>
                    </Link>
                </li>
                {/* <li>
                    <Link to="suporte">
                        <FontAwesomeIcon icon={faHeadset} className="fas" />
                        <span>Suporte</span>
                    </Link>
                </li> */}
                <li>
                    <Link to="faq">
                        <FontAwesomeIcon icon={faCircleQuestion} className="fas" />
                        <span>FAQ</span>
                    </Link>
                </li>
                <li className='logout'>
                    <Link to="/">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="fas" />
                        <span>Sair</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
