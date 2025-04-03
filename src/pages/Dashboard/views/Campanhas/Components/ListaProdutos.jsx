import { useCallback, useEffect, useState } from "react";
import BarraDeProgresso from "./BarraProgresso";
import api from "../../../../../services/axiosConfig";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ListaProdutos({ campanhaId }) {
  // Estado local para armazenar a quantidade de baixa para cada produto
  const [baixaQuantidades, setBaixaQuantidades] = useState({});
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos da campanha
  const fetchProdutos = useCallback(async () => {
    try {
      const response = await api.get(`/cestas/${campanhaId}`);
      setProdutos(response.data); // Atualiza o estado com os dados do produto
    } catch (error) {
      console.error("Erro ao tentar buscar produtos:", error.message);
    }
  }, [campanhaId]);

  const deletarProduto = async (campanhaId, produtoId) => {
    try {
      await api.delete(`/cestas/${campanhaId}/produtos/${produtoId}/delete`);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Carrega os produtos ao montar o componente
  }, [fetchProdutos]);

  // Função para lidar com mudanças no input de baixa
  const handleBaixaChange = (id, value) => {
    setBaixaQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [id]: value, // Atualiza a quantidade para o produto correspondente
    }));
  };

  const handleAtualizarProdutos = async (id, operacao = "adicionar") => {
    const quantidade = Number(baixaQuantidades[id] || 0);

    if (quantidade <= 0) {
      console.warn("Quantidade inválida.");
      return;
    }

    const quantidadeBaixa = operacao === "retirar" ? -quantidade : quantidade;

    try {
      const response = await api.post(
        `/cestas/${campanhaId}/produtos/${id}/baixa`,
        { quantidadeBaixa }
      );

      console.log(response.data.msg); // Exibe a mensagem de sucesso
      fetchProdutos(); // Atualiza a lista de produtos

      // Limpa o input de baixa para o produto
      setBaixaQuantidades((prevQuantidades) => ({
        ...prevQuantidades,
        [id]: "",
      }));
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error.message);
    }
  };

  return (
    <table className="tabela-produtos">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Necessário</th>
          <th>Recebido</th>
          <th>Qtd Baixa</th>
          <th>Meta</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <tr key={produto._id || produto.id}>
              <td>{produto.nomeProduto}</td>
              <td>
                {produto.metaProduto} {produto.unidadeMedida}
              </td>
              <td>
                {produto.quantidadeRecebida} {produto.unidadeMedida}
              </td>
              <td>
                <input
                  className="baixainput"
                  type="number"
                  min="0"
                  value={baixaQuantidades[produto._id || produto.id] || ""}
                  onChange={(e) =>
                    handleBaixaChange(produto._id || produto.id, e.target.value)
                  }
                />
                <span className="baixaInput--unidade">{` ${produto.unidadeMedida}`}</span>
              </td>
              <td>
                <BarraDeProgresso
                  quantidadeRecebida={produto.quantidadeRecebida}
                  metaProduto={produto.metaProduto}
                />
              </td>
              <td className="btn--container">
                <button
                  title="Receber Produto"
                  onClick={() =>
                    handleAtualizarProdutos(
                      produto._id || produto.id,
                      "adicionar"
                    )
                  }
                >
                  Receber
                </button>

                <button
                  title="Retirar Produto"
                  onClick={() =>
                    handleAtualizarProdutos(
                      produto._id || produto.id,
                      "retirar"
                    )
                  }
                >
                  Retirar
                </button>
                <button
                  className="btn--icon"
                  title="Excluir Produto"
                  onClick={() =>
                    deletarProduto(campanhaId, produto._id || produto.id)
                  }
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Não há produtos disponíveis.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

ListaProdutos.propTypes = {
  campanhaId: PropTypes.string,
};
