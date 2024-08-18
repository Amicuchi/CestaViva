import ConhecaAsEntidades from "../components/homeComponents/ConhecasAsEntidades";
import Contato from "../components/homeComponents/Contato";

function Home() {
    return (
        <>
            <h1>Bem-vindo ao CestaViva</h1>
            <p>Facilitando a doação de alimentos para quem mais precisa.</p>
            <ConhecaAsEntidades />
            <Contato />
        </>
    );
}

export default Home;
