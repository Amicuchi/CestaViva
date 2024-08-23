import '../../styles/SobreNos.css'
import GrupoLogo from '../../assets/grupo.jpg';

export default function SobreNos() {
    return (
        <div className='SobreNosContainer'>
            <h2 className="TitleH2">Sobre Nós</h2>
            <div className="sobreContainer">
                <p>
                    Somos um grupo de estudantes da UNIVESP que acredita que pode fazer a diferença no mundo facilitando o acesso de pessoas necessitadas a instituições de assistência social que fazem doações de cestas de alimentos.
                </p>
                <img className='SobreNosImg' src={GrupoLogo} alt="Cesta Viva Logo" />
            </div>
        </div>
    )
}