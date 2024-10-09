import { useState } from 'react';
import { Modal, Box, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './Modal.modules.css';

export default function ModalCampanha({ isOpen, onClose, onSave }) {
  // Estados para os dados da campanha
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [comecaEm, setComecaEm] = useState('');
  const [terminaEm, setTerminaEm] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para submeter o formulário
  const handleSubmit = () => {
    const novaCampanha = { nomeCampanha, comecaEm, terminaEm, descricao };
    onSave(novaCampanha);  // Chama a função onSave passada por props para salvar a nova campanha
    limparFormulario();    // Limpa o formulário após o salvamento
  };

  // Função para limpar o formulário após salvar
  const limparFormulario = () => {
    setNomeCampanha('');
    setComecaEm('');
    setTerminaEm('');
    setDescricao('');
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
        <Typography variant="h6" component="h2" gutterBottom>
          Nova Campanha
        </Typography>
        <TextField
          label="Nome"
          value={nomeCampanha}
          onChange={(e) => setNomeCampanha(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Início"
          value={comecaEm}
          onChange={(e) => setComecaEm(e.target.value)}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data de Fim"
          value={terminaEm}
          onChange={(e) => setTerminaEm(e.target.value)}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <button onClick={onClose} className='btn-modal'>Cancelar</button>
        <button onClick={handleSubmit} className='btn-modal'>Salvar</button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalCampanha.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};