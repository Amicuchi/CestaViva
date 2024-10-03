import Suporte from './components/Support';
import Questions from './components/Questions';
import '../../Dashboard.css';

export default function DashboardFAQ() {

    return (
        <>
            <div className="card--container lastOne">
                <div className="perguntas">
                    <h2>Perguntas Frequentes</h2>
                    <Questions />
                    <hr />
                </div>
                <Suporte />
            </div>
        </>
    );
}
