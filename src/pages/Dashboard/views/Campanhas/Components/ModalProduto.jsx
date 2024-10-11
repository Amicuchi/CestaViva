import { useCallback, useState } from "react";
import { Modal, Box, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "./Modal.modules.css";
import api from "../../../../../services/axiosConfig";

export default function ModalProduto({ isOpen, onClose, onSave, campanhaId }) {
  // Estados para os dados da campanha
  const [nomeProduto, setNomeProduto] = useState("");
  const [metaProduto, setMetaProduto] = useState("");
  const [quantidadeRecebida, setQuantidadeRecebida] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("");

  const fetchCadastrarProduto = useCallback(async () => {
    try {
      const novoProduto = {
        nomeProduto,
        metaProduto,
        quantidadeRecebida,
        unidadeMedida,
      };
      await api.post(`/cestas/${campanhaId}/cadastrarProduto`, novoProduto); // Usando POST para enviar o produto
      onSave(novoProduto); // Atualiza o estado com o novo produto salvo
      limparFormulario(); // Limpa o formulário após o cadastro
    } catch (error) {
      console.error("Erro ao tentar cadastrar produto:", error.message);
    }
  }, [
    nomeProduto,
    metaProduto,
    quantidadeRecebida,
    unidadeMedida,
    campanhaId,
    onSave,
  ]);

  // Função para submeter o formulário
  const handleSubmit = () => {
    fetchCadastrarProduto();
  };
  // Função para limpar o formulário após salvar
  const limparFormulario = () => {
    setNomeProduto("");
    setMetaProduto("");
    setQuantidadeRecebida("");
    setUnidadeMedida("");
  };

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

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={estiloModal}>
        <Typography variant="h6" component="h2" gutterBottom>
          Novo Produto
        </Typography>
        <TextField
          label="Nome do produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Meta do Produto"
          value={metaProduto}
          onChange={(e) => setMetaProduto(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantidade Recebida"
          value={quantidadeRecebida}
          onChange={(e) => setQuantidadeRecebida(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Unidade de Medida"
          value={unidadeMedida}
          onChange={(e) => setUnidadeMedida(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <button onClick={onClose} className="btn-modal">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-modal">
            Salvar
          </button>
        </Box>
      </Box>
    </Modal>
  );
}

ModalProduto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  campanhaId: PropTypes.func.isRequired,
};
