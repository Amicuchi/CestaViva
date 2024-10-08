import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function ModalCampanha ({ isOpen, onClose, onSave }) {
  // Estado local para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    const novaCampanha = { nome, dataInicio, dataFim, descricao };
    onSave(novaCampanha); // Salvar a nova campanha
    limparFormulario();    // Limpar o formulário após o envio
  };

  // Função para limpar o formulário após salvar
  const limparFormulario = () => {
    setNome('');
    setDataInicio('');
    setDataFim('');
    setDescricao('');
  };

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
          Cadastrar Nova Campanha
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Data de Início"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Data de Fim"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descrição"
          multiline
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalCampanha.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.object,
};