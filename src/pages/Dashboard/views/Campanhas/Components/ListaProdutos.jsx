import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ListaProdutos({ produtos = [] }) {
  // Estado local para armazenar a quantidade de baixa para cada produto
  const [baixaQuantidades, setBaixaQuantidades] = useState({});

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
    console.log(`Recebendo produtos para o produto com id ${id}. Quantidade de baixa: ${quantidadeBaixa}`);
  };

  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Nome do Produto</th>
          <th>Tipo</th>
          <th>Qtd Necessária</th>
          <th>Qtd Faltante</th>
          <th>Baixa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.tipo}</td>
              <td>{produto.qtdNecessaria}</td>
              <td>{produto.qtdFaltante}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={baixaQuantidades[produto.id] || ''}
                  onChange={(e) => handleBaixaChange(produto.id, e.target.value)}
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
};

ListaProdutos.propTypes = {
  produtos: PropTypes.array,
};