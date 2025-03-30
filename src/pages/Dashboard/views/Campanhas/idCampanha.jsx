import { useParams } from "react-router-dom";
import ListaProdutos from "./Components/ListaProdutos";
import "./idCampanha.css";
import { useEffect, useState } from "react";
import ModalProduto from "./Components/ModalProduto";

export default function IdCampanha() {
  const { idCampanha } = useParams();

  const [isModalOpenProduto, setModalOpenProduto] = useState(false);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [campanha, setCampanha] = useState(null);

  const abrirModal = (e, campanhaId) => {
    setSelectedCampanha(campanhaId);
    setModalOpenProduto(true);
  };

  const fetchCampanha = async () => {

  const fecharModal = () => {
    setModalOpenProduto(false);
    setSelectedCampanha(null);
  };

  const salvarProduto = (novoProduto, index) => {
    setProdutos([...produtos, { ...novoProduto, id: index }]);

    fecharModal();
  };

  return (
    <div className="container-produto">
      <div className="container-buttons">
        <button onClick={() => window.history.back()}>Voltar</button>
        <h2>Teste</h2>
        <button onClick={(e) => abrirModal(e, idCampanha)}>Novo produto</button>
      </div>
      <ListaProdutos campanhaId={idCampanha} />

      {isModalOpenProduto && (
        <ModalProduto
          isOpen={isModalOpenProduto}
          onClose={fecharModal}
          onSave={salvarProduto}
          campanhaId={selectedCampanha}
        />
      )}
    </div>
  );
}
