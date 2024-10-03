import BusqueEntidade from "../Home/homeComponents/BusqueEntidade";
import ConhecaAsEntidades from "../Home/homeComponents/ConhecasAsEntidades";
import Contato from "../Home/homeComponents/Contato";
import SobreNos from "../Home/homeComponents/SobreNos";
import SobreProjeto from "../Home/homeComponents/SobreProjeto";

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