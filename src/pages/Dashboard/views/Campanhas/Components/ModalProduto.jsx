import { useState } from 'react';
import { Modal, Box, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './Modal.modules.css';

export default function ModalProduto({ isOpen, onClose, onSave }) {
  // Estados para os dados da campanha
  const [nomeProduto, setNomeProduto] = useState('');
  const [qtdNecessaria, setQtdNecessaria] = useState('');
  const [tipo, setTipo] = useState('');

  // Função para submeter o formulário
  const handleSubmit = () => {
    const novoProduto = { nomeProduto, qtdNecessaria, tipo };
    onSave(novoProduto);  // Chama a função onSave passada por props para salvar a nova campanha
    limparFormulario();    // Limpa o formulário após o salvamento
  };

  // Função para limpar o formulário após salvar
  const limparFormulario = () => {
    setNomeProduto('');
    setQtdNecessaria('');
    setTipo('');
  };

  // Estilos personalizados do modal
  const estiloModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={estiloModal}>
        <Typography variant="h6" component="h2" gutterBottom>Novo Produto</Typography>
        <TextField
          label="Nome do produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          fullWidth
          margin="normal"
          type="text"
        />
        <TextField
          label="Qtd Necessária"
          value={qtdNecessaria}
          onChange={(e) => setQtdNecessaria(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <button onClick={onClose} className='btn-modal'>Cancelar</button>
          <button onClick={handleSubmit} className='btn-modal'>Salvar</button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalProduto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};