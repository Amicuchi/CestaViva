import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTachographDigital, 
    faUser, 
    faChartBar, 
    faBriefcase, 
    faCircleQuestion, 
    faGear, 
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/Dashboard.css';

export default function DashboardSidebar() {
    return (
        <aside className="sidebar">
            <div className="logo"></div>
            <ul className="menu">
                <li className='active'>
                    <a href="#">
                        <FontAwesomeIcon icon={faTachographDigital}  className="fas" />
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon={faUser} className="fas" />
                        <span>Perfil</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon={faChartBar} className="fas" />
                        <span>Estatísticas</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon={faBriefcase} className="fas" />
                        <span>Cestas</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon={faCircleQuestion} className="fas" />
                        <span>FAQ</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <FontAwesomeIcon icon={faGear} className="fas" />
                        <span>Configurações</span>
                    </a>
                </li>
                <li className='logout'>
                    <a href="#">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="fas" />
                        <span>Sair</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}