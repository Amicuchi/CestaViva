import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalEditarCampanha from "./ModalEditarCampanha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import formatarData from "../../../../../utils/formatarData";

export default function ListaCampanhas({ campanhas, fetchCampanhas }) {
  const [isModalOpenCampanha, setModalOpenCampanha] = useState(false); // Controla se o modal está aberto
  const [selectedCampanha, setSelectedCampanha] = useState(null);

  const fecharModal = () => {
    setModalOpenCampanha(false); // Fecha o modal
    setSelectedCampanha(null); // Reseta a campanha selecionada
  };

  const abrirModal = (e, campanhaId) => {
    e.stopPropagation(); // Impede que o clique no botão afete a linha
    setSelectedCampanha(campanhaId); // Define a campanha selecionada para cadastro de produto
    setModalOpenCampanha(true); // Abre o modal
  };

  const salvarCampanha = () => {
    fetchCampanhas();
    fecharModal();
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

  const navigate = useNavigate(); // Hook do React Router para navegação

  const navegarParaCampanha = (campanha) => {
    navigate(`/dashboard/campanhas/${campanha._id}`, {
      state: { nomeCampanha: campanha.nomeCampanha },
    }); // Navega para a rota da campanha específica
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
              <tr onClick={() => navegarParaCampanha(campanha)}>
                <td>{campanha.nomeCampanha}</td>
                <td>{formatarData(campanha.comecaEm)}</td>
                <td>{formatarData(campanha.terminaEm)}</td>
                <td className="btn--container">
                  <button
                    className="btn--icon"
                    onClick={(e) => abrirModal(e, campanha._id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="btn--icon"
                    onClick={() => deletarCesta(campanha._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isModalOpenCampanha && (
        <ModalEditarCampanha
          isOpen={isModalOpenCampanha}
          onClose={fecharModal}
          onSave={salvarCampanha}
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
