import { IMaskInput } from "react-imask";
import '../../styles/Home.css';

export default function Contato() {
    return(
        <main className="ContatoContainer">
            <h2>Deixe sua mensagem:</h2>
            <form className="ContatoForm" action="">
                <input className="ContatoInput" type="text" name="nome" placeholder="Nome"/>
                <input className="ContatoInput" type="email" name="email" placeholder="E-mail"/>
                <IMaskInput
                    className="ContatoInput" 
                    name="telefone"
                    mask="(00)00000-0000"
                    placeholder="Telefone com DDD"
                />
                <textarea className="ContatoInput ContatoTextArea" name="mensagem" placeholder="Sua mensagem"/>

                <button className="ButtonTotal">Entrar em contato</button>

            </form>
        </main>
    )
}