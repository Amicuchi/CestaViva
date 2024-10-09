import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import api from "../../../../../services/axiosConfig";

export default function ListaProdutos({ campanhaId }) {
  // Estado local para armazenar a quantidade de baixa para cada produto
  const [baixaQuantidades, setBaixaQuantidades] = useState({});
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = useCallback(async () => {
    try {
      const response = await api.get(`/cestas/${campanhaId}/produtos`);
      setProdutos(response.data); // Atualiza o estado com os dados das campanhas
    } catch (error) {
      console.error("Erro ao tentar buscar produtos:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchProdutos(); // Carrega as campanhas ao montar o componente
  }, [fetchProdutos]);

  // Função para lidar com mudanças no input de baixa
  const handleBaixaChange = (id, value) => {
    setBaixaQuantidades({
      ...baixaQuantidades,
      [id]: value,
    });
  };

  // Função para lidar com o clique no botão "Receber Produtos"
  const handleReceberProdutos = (id) => {
    const quantidadeBaixa = baixaQuantidades[id] || 0;
    console.log(
      `Recebendo produtos para o produto com id ${id}. Quantidade de baixa: ${quantidadeBaixa}`
    );
  };

  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Nome do Produto</th>
          <th>Kg/L</th>
          <th>Qtd Necessária</th>
          <th>Qtd Recebida</th>
          <th>Baixa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nomeProduto}</td>
              <td>{produto.unidadeMedida}</td>
              <td>{produto.metaProduto}</td>
              <td>{produto.quantidadeRecebida}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={baixaQuantidades[produto.id] || ""}
                  onChange={(e) =>
                    handleBaixaChange(produto.id, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleReceberProdutos(produto.id)}>
                  Receber Produtos
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
