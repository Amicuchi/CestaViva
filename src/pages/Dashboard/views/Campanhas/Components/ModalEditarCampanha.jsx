import { useState } from "react";
import { Modal, Box, TextField, Typography, Alert } from "@mui/material";
import PropTypes from "prop-types";
import api from "../../../../../services/axiosConfig";
import "./Modal.modules.css";

export default function ModalEditarProduto({
  isOpen,
  onClose,
  onSave,
  campanhaId,
}) {
  const [dadosCampanha, setDadosCampanha] = useState({
    nomeCampanha: "",
    comecaEm: "",
    terminaEm: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Estilos personalizados do modal
  const estiloModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosCampanha(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validação básica dos campos
      if (!dadosCampanha.nomeCampanha || !dadosCampanha.comecaEm || !dadosCampanha.terminaEm) {
        setError("Todos os campos são obrigatórios");
        return;
      }

      // Converte as datas para o formato ISO
      const dadosParaEnviar = {
        ...dadosCampanha,
        idCesta: campanhaId,
        comecaEm: new Date(dadosCampanha.comecaEm).toISOString(),
        terminaEm: new Date(dadosCampanha.terminaEm).toISOString()
      };

      await api.put("/cestas", dadosParaEnviar);
      
      setSuccess(true);
      onSave(); // Notifica o componente pai que a edição foi bem-sucedida
      setTimeout(() => {
        onClose();
        setSuccess(false);
        // Reseta os campos após fechar
        setDadosCampanha({
          nomeCampanha: "",
          comecaEm: "",
          terminaEm: ""
        });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao atualizar campanha");
      console.error("Erro ao atualizar campanha:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={estiloModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          Editar Campanha
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Campanha atualizada com sucesso!</Alert>}
        
        <TextField
          name="nomeCampanha"
          label="Nome da Campanha"
          fullWidth
          margin="normal"
          value={dadosCampanha.nomeCampanha}
          onChange={handleChange}
          disabled={loading}
          required
        />
        
        <TextField
          name="comecaEm"
          label="Data de Início"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dadosCampanha.comecaEm}
          onChange={handleChange}
          disabled={loading}
          required
          inputProps={{
            max: dadosCampanha.terminaEm // Não permite data maior que a de término
          }}
        />
        
        <TextField
          name="terminaEm"
          label="Data de Término"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dadosCampanha.terminaEm}
          onChange={handleChange}
          disabled={loading}
          required
          inputProps={{
            min: dadosCampanha.comecaEm // Não permite data menor que a de início
          }}
        />
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <button 
            onClick={onClose} 
            className="btn-modal"
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            className="btn-modal"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </Box>
      </Box>
    </Modal>
  );
}

ModalEditarProduto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  campanhaId: PropTypes.string.isRequired,
};