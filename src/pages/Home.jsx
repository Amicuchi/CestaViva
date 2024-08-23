import BusqueEntidade from "../components/homeComponents/BusqueEntidade";
import ConhecaAsEntidades from "../components/homeComponents/ConhecasAsEntidades";
import Contato from "../components/homeComponents/Contato";
import SobreNos from "../components/homeComponents/SobreNos";
import SobreProjeto from "../components/homeComponents/SobreProjeto";

function Home() {
    return (
        <>
            <h1>Bem-vindo ao CestaViva</h1>
            <p>Facilitando a doação de alimentos para quem mais precisa.</p>
            <BusqueEntidade />
            <SobreProjeto />
            <SobreNos />
            <ConhecaAsEntidades />
            <Contato />
        </>
    );
}

export default Home;
