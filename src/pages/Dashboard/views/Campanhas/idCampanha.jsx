import { useLocation, useParams } from "react-router-dom";
import ListaProdutos from "./Components/ListaProdutos";
import "./idCampanha.css";
import { useState } from "react";
import ModalProduto from "./Components/ModalProduto";

export default function IdCampanha() {
  const { idCampanha } = useParams();
  const location = useLocation();
  const nomeCampanha = location.state?.nomeCampanha || "Campanha";

  const [isModalOpenProduto, setModalOpenProduto] = useState(false);

  const [produtos, setProdutos] = useState([]);

  const abrirModal = () => {
    setModalOpenProduto(true);
  };

  const salvarProduto = (novoProduto, index) => {
    setProdutos([...produtos, { ...novoProduto, id: index }]);
    setModalOpenProduto(false);
    window.location.reload();
  };

  return (
    <div className="container-produto">
      <div className="container-buttons">
        <button onClick={() => window.history.back()}>Voltar</button>
        <h2>{nomeCampanha}</h2>
        <button onClick={(e) => abrirModal(e, idCampanha)}>Novo produto</button>
      </div>
      <ListaProdutos campanhaId={idCampanha} />

      {isModalOpenProduto && (
        <ModalProduto
          isOpen={isModalOpenProduto}
          onClose={() => setModalOpenProduto(false)}
          onSave={salvarProduto}
          campanhaId={idCampanha}
        />
      )}
    </div>
  );
}
