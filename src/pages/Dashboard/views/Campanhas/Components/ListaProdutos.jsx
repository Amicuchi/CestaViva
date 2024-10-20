import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import api from "../../../../../services/axiosConfig";
import BarraDeProgresso from "./BarraProgresso";

export default function ListaProdutos({ campanhaId }) {
  // Estado local para armazenar a quantidade de baixa para cada produto
  const [baixaQuantidades, setBaixaQuantidades] = useState({});
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos da campanha
  const fetchProdutos = useCallback(async () => {
    try {
      const response = await api.get(`/cestas/${campanhaId}/produtos`);
      setProdutos(response.data); // Atualiza o estado com os dados do produto
    } catch (error) {
      console.error("Erro ao tentar buscar produtos:", error.message);
    }
  }, [campanhaId]);

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

  const handleReceberProdutos = async (id) => {
    const quantidadeBaixa = baixaQuantidades[id] || 0;

    try {
      const response = await api.post(
        `/cestas/${campanhaId}/produtos/${id}/baixa`,
        {
          quantidadeBaixa: Number(quantidadeBaixa),
        }
      );
      console.log(response.data.msg); // Exibe a mensagem de sucesso
      
      fetchProdutos();  // Atualiza a lista de produtos após registrar a baixa

      // Limpa o input de baixa para o produto
      setBaixaQuantidades((prevQuantidades) => ({
        ...prevQuantidades,
        [id]: '' // Reseta o valor do input para esse produto
    }));

    } catch (error) {
      console.error("Erro ao registrar a baixa do produto:", error.message);
    }
  };

  console.log(baixaQuantidades); // Verifique os valores de baixaQuantidades

  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Nome do Produto</th>
          <th>Qtd Necessária</th>
          <th>Qtd Recebida</th>
          <th>Qtd Baixa</th>
          <th>META</th>
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
                {` ${produto.unidadeMedida}`}
              </td>
              <td>
                <BarraDeProgresso
                  quantidadeRecebida={produto.quantidadeRecebida}
                  metaProduto={produto.metaProduto}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleReceberProdutos(produto._id || produto.id)
                  }
                >
                  Dar Baixa
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
