import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Dashboard.css';

export default function DashboardHeader() {
    return (
        <>
            <div className="main--content">
                <div className="header--wrapper">
                    <div className="header--title">
                        <h2>Painel de controle</h2>
                    </div>
                    <div className="search--box">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='search--icon' />
                        <input type="text" placeholder='Procure' className='input--dashboard' />
                    </div>
                </div>
            </div>
        </>
    );
}