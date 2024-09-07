import BusqueEntidade from "../components/homeComponents/BusqueEntidade";
import ConhecaAsEntidades from "../components/homeComponents/ConhecasAsEntidades";
import Contato from "../components/homeComponents/Contato";
import SobreNos from "../components/homeComponents/SobreNos";
import SobreProjeto from "../components/homeComponents/SobreProjeto";

export default function Home() {
    return (
        <>
            <BusqueEntidade />
            <SobreProjeto />
            <SobreNos />
            <ConhecaAsEntidades />
            <Contato />
        </>
    );
}