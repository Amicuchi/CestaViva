import React, { useState } from 'react';
import { Button } from '@mui/material';
import ListaProdutos from './ListaProdutos';
import ModalProduto from './ModalProduto';
import PropTypes from 'prop-types';

export default function ListaCampanhas({ campanhas }) {
  const [expanded, setExpanded] = useState(null); // Estado para controlar qual linha está expandida
  const [produtos, setProdutos] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => setModalOpen(true);

  // Função para fechar o modal
  const fecharModal = () => setModalOpen(false);

  // Função para alternar entre expandir e recolher uma linha
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Função para salvar uma nova campanha
  const salvarProduto = (novoProduto) => {
    setProdutos([...produtos, { ...novoProduto, id: produtos.length + 1 }]);
    fecharModal();
  };

  return (
    <>
      <table border="1" width="100%">
        <tbody>
          {campanhas.map((campanha) => (
            <React.Fragment key={campanha.id}>
              <tr onClick={() => toggleExpand(campanha.id)} style={{ cursor: 'pointer' }}>
                <td>{campanha.nome}</td>
                <td>{campanha.comecaEm}</td>
                <td>{campanha.terminaEm}</td>
                <td>
                  <Button variant="contained" color="primary" onClick={abrirModal}>
                    Novo Produto
                  </Button>
                </td>

              </tr>
              {expanded === campanha.id && (
                <tr>
                  <td colSpan="4">
                    {/* Renderiza a lista de produtos quando a linha é expandida */}
                    <ListaProdutos produtos={campanha.produtos} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Modal para cadastrar nova campanha */}
      <ModalProduto isOpen={isModalOpen} onClose={fecharModal} onSave={salvarProduto} />
    </>

  );
};

ListaCampanhas.propTypes = {
  campanhas: PropTypes.array.isRequired,
};