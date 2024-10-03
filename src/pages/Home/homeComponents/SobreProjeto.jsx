import '../Home.css';

// import CestaLogo from '../../assets/images/CestaViva-Logo.svg';
import CestaLogo from '../../../assets/images/CestaViva-Logo.svg';

export default function SobreProjeto() {
    return (
        <main className='OProjeto'>
            <h2>Sobre o Projeto</h2>
            <div className="sobreContainer">
                <img className='SobreNosImg' src={CestaLogo} alt="Cesta Viva Logo" />
                <div>
                    <p>
                        O objetivo maior do CestaViva é facilitar a comunicação entre entidades doadoras de alimentos e pessoas dispostas a contribuir com essas entidades. 
                    </p>
                    <p>
                        Assim, os doadores poderão encontrar entidades para onde possam doar os alimentos que queiram, sabendo que esse alimento será realmente entregue para uma pessoa que necessita.
                    </p>
                </div>
            </div>
        </main>
    )
}