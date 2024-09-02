import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Dashboard.css';
import avatar from '../../assets/avatar.png'

export default function DashboardHeader() {
    return (
        <>
            <div className="main--content">
                <div className="header--wrapper">
                    <div className="header--title">
                        <span>Primary</span>
                        <h2>Dashboard</h2>
                    </div>
                    <div className="user--info">
                        <div className="search--box">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='search--icon'/>
                            <input type="text" placeholder='Procure' className='input--dashboard'/>
                        </div>
                        <img src={avatar} alt="User Avatar" />
                    </div>
                </div>
            </div>
        </>
    );
}