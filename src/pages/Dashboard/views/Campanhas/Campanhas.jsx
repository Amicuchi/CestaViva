import { useState } from 'react';
import ListaCampanhas from './components/ListaCampanhas';
import ModalCampanha from './components/ModalCampanha';
import { Button } from '@mui/material';

const Campanhas = () => {
  const [campanhas, setCampanhas] = useState([
    { id: 1, nome: 'Campanha de Verão', produtos: [{ id: 1, nome: 'Produto A' }, { id: 2, nome: 'Produto B' }] },
    { id: 2, nome: 'Campanha de Inverno', produtos: [{ id: 3, nome: 'Produto C' }, { id: 4, nome: 'Produto D' }] }
  ]);

  const [isModalOpen, setModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => setModalOpen(true);

  // Função para fechar o modal
  const fecharModal = () => setModalOpen(false);

  // Função para salvar uma nova campanha
  const salvarCampanha = (novaCampanha) => {
    setCampanhas([...campanhas, { ...novaCampanha, id: campanhas.length + 1 }]);
    fecharModal();
  };

  return (
    <div>
      <h1>Gerenciador de Campanhas</h1>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Lista de Campanhas</th>
            <th>
              <Button variant="contained" color="primary" onClick={abrirModal}>
                Nova Campanha
              </Button>
            </th>
          </tr>
        </thead>
      </table>

      {/* Lista de campanhas com acordeon */}
      <ListaCampanhas campanhas={campanhas} />

      {/* Modal para cadastrar nova campanha */}
      <ModalCampanha isOpen={isModalOpen} onClose={fecharModal} onSave={salvarCampanha} />
    </div>
  );
};

export default Campanhas;
