import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalProduto from "./ModalProduto";
import ListaProdutos from "./ListaProdutos";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../../services/axiosConfig";

export default function ListaCampanhas({ campanhas, fetchCampanhas }) {
  const [isModalOpenProduto, setModalOpenProduto] = useState(false); // Controla se o modal está aberto
  const [selectedCampanha, setSelectedCampanha] = useState(null); // Controla a campanha para cadastro de produto
  const [produtos, setProdutos] = useState([]); // Estado para produtos como array vazio

  const fecharModal = () => {
    setModalOpenProduto(false); // Fecha o modal
    setSelectedCampanha(null); // Reseta a campanha selecionada
  };

  const [expanded, setExpanded] = useState(null); // Controla qual linha da tabela está expandida

  // Função para alternar entre expandir e recolher uma linha
  const toggleExpand = (id) => {
    // console.log("Expanding row for ID:", id);  // Log do ID da linha expandida
    setExpanded(expanded === id ? null : id); // Alterna a linha expandida
  };

  const abrirModal = (e, campanhaId) => {
    e.stopPropagation(); // Impede que o clique no botão afete a linha
    setSelectedCampanha(campanhaId); // Define a campanha selecionada para cadastro de produto
    setModalOpenProduto(true); // Abre o modal
  };

  const salvarProduto = (novoProduto, index) => {
    setProdutos([...produtos, { ...novoProduto, id: index }]); // Adiciona o novo produto à lista de produtos

    fecharModal(); // Fecha o modal após salvar
  };

  const formatarData = (data) => {
    const date = new Date(data); // Cria um novo objeto Date a partir da string de data recebida
    return date.toLocaleDateString("pt-BR"); // Formata a data para o formato 'dd/mm/aaaa'
  };

  const deletarCesta = async (idCesta) => {
    try {
      const response = await api.delete("/cestas", {
        data: { idCesta }, // O body em requisições DELETE deve ser enviado dentro de `data`
      });
      fetchCampanhas();
      console.log("Cesta deletada:", response.data);
    } catch (error) {
      console.error(
        "Erro ao deletar cesta:",
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <div className="card--container lastOne">
      <table className="tabela-campanhas">
        <thead>
          <tr>
            <td>Campanha</td>
            <td>Início</td>
            <td>Término</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {campanhas.map((campanha) => (
            <React.Fragment key={campanha._id}>
              <tr onClick={() => toggleExpand(campanha._id)}>
                <td>{campanha.nomeCampanha}</td>
                <td>{formatarData(campanha.comecaEm)}</td>
                <td>{formatarData(campanha.terminaEm)}</td>
                <td className="btn--container">
                  <button
                    className="btn--icon"
                    onClick={(e) => abrirModal(e, campanha._id)}
                  >
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </button>
                  <button
                    className="btn--icon"
                    onClick={() => deletarCesta(campanha._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
              {expanded === campanha._id && (
                <tr>
                  <td colSpan="4">
                    {/* Renderiza a lista de produtos quando a linha é expandida */}
                    <div>
                      <ListaProdutos campanhaId={campanha._id} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Modal para cadastrar novo produto */}
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

ListaCampanhas.propTypes = {
  campanhas: PropTypes.array.isRequired,
  fetchCampanhas: PropTypes.func,
};
