import { IMaskInput } from "react-imask";
import '../../styles/contato.css';

export default function Contato() {
    return(
        <div className="ContatoContainer">
            <h2 className='ConhecaAsEntidadesH2'>Deixe sua mensagem:</h2>
            <form action="">
                <input type="text" name="nome" placeholder="Nome"/>
                <input type="email" name="email" placeholder="E-mail"/>
                <IMaskInput
                    name="telefone"
                    mask="(00)00000-0000"
                    placeholder="Telefone com DDD"
                />
                <textarea name="mensagem" placeholder="Sua mensagem"/>

                <button>Entrar em contato</button>

            </form>
        </div>
    )
}