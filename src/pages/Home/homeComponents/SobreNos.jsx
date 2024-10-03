import '../../../styles/index.css';
import '../Home.css';

import GrupoLogo from '../../../assets/images/grupo.svg';

export default function SobreNos() {
    return (
        <main className='sobreNosContainer'>
            <h2>Sobre Nós</h2>
            <div className="sobreContainer">
                <p>
                    Somos um grupo de estudantes da UNIVESP que acredita que pode fazer a diferença no mundo facilitando o acesso de pessoas necessitadas a instituições de assistência social que fazem doações de cestas de alimentos.
                </p>
                <img className='SobreNosImg' src={GrupoLogo} alt="Cesta Viva Logo" />
            </div>
        </main>
    )
}