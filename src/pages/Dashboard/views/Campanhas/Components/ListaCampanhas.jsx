import React, { useState } from 'react';
import ListaProdutos from './ListaProdutos';
import ModalProduto from './ModalProduto';
import PropTypes from 'prop-types';

export default function ListaCampanhas({ campanhas }) {
  const [isModalOpenProduto, setModalOpenProduto] = useState(false); // Controla se o modal está aberto
  const abrirModal = () => setModalOpenProduto(true);   // Abre o modal
  const fecharModal = () => setModalOpenProduto(false); // Fecha o modal

  const [expanded, setExpanded] = useState(null);  // Controla qual linha está expandida
  // Função para alternar entre expandir e recolher uma linha
  const toggleExpand = (id) => {
    console.log("Expanding row for ID:", id);  // Log do ID da linha expandida
    setExpanded(expanded === id ? null : id);  // Alterna a linha expandida
    // setExpanded((prevExpanded) => (prevExpanded === id ? null : id));
  };

  const [produtos, setProdutos] = useState(''); // Estado para produtos
  // Função para salvar um novo produto
  const salvarProduto = (novoProduto, index) => {
    setProdutos([...produtos, { ...novoProduto, id: index }]);
    fecharModal();
  };

  const formatarData = (data) => {
    const date = new Date(data);              // Cria um novo objeto Date a partir da string de data recebida
    return date.toLocaleDateString('pt-BR');  // Formata a data para o formato 'dd/mm/aaaa'
  };

  return (
    <>
      <table border="1" width="100%">
        <thead>
          <tr>
            <td>Nome da campanha</td>
            <td>Data de Início</td>
            <td>Data de Término</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {campanhas.map((campanha, index) => (
            <React.Fragment key={campanha._id || index}>
              <tr onClick={() => toggleExpand(campanha._id)} style={{ cursor: 'pointer' }}>
                <td>{campanha.nomeCampanha}</td>
                <td>{formatarData(campanha.comecaEm)}</td>
                <td>{formatarData(campanha.terminaEm)}</td>
                <td>
                  <button onClick={abrirModal}>Novo Produto</button>
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
     {expanded ? <ModalProduto isOpen={isModalOpenProduto} onClose={fecharModal} onSave={salvarProduto} campanhaId={expanded} /> : null} 
    </>
  );
};

ListaCampanhas.propTypes = {
  campanhas: PropTypes.array.isRequired,
};