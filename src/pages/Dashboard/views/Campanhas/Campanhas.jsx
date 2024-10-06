import CadastraCampanha from "./Components/CadastraCampanha";
import CadastraProduto from "./Components/CadastraProduto";
import CestaCompleta from "./Components/CestaCompleta";
import ListaCampanha from "./Components/ListaCampanha";
import ListaProdutos from "./Components/ListaProdutos";

export default function CampanhasPage () {

    return (
        <div className="campanhas-page">
            <div className="section">
                <CadastraCampanha />
                <ListaCampanha />
            </div>
            <div className="section">
                <CadastraProduto />
                <ListaProdutos />
            </div>
            <div className="section">
                <CestaCompleta />
            </div>
        </div>
    );
};