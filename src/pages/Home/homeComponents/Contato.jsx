import { IMaskInput } from "react-imask";
import '../Home.css'


export default function Contato() {
    return(
        <main className="contato--container lastOne">
            <h2>Deixe sua mensagem:</h2>
            <form className="ContatoForm" action="">
                <input type="text" name="nome" placeholder="Nome"/>
                <input type="email" name="email" placeholder="E-mail"/>
                <IMaskInput
                    name="telefone"
                    mask="(00)00000-0000"
                    placeholder="Telefone com DDD"
                />
                <textarea className=" ContatoTextArea" name="mensagem" placeholder="Sua mensagem"/>

                <button className="ButtonTotal" name="contatoBtn">Entrar em contato</button>
            </form>
        </main>
    )
}