import {
  Modal,
  Box,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import "./ModalEntidade.css";
import fotoAlt from "../../../assets/default-images/default1.jpg";

export default function ModalEntidade({ open, handleClose, entidade }) {
  if (!entidade) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-describedby="modal-description"
      className="modal-container"
    >
      <Box className="modal-box-entidade">
        <div className="modal-header">
          <img
            src={entidade.imagem || fotoAlt}
            alt="Foto da entidade"
            className="modal-image"
          />
          <div>
            <h2 id="modal-title" className="modal-title">
              {entidade.nomeFantasia}
            </h2>
            <p className="modal-tipoEntidade">{entidade.tipoEntidade}</p>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div id="modal-description" className="modal-description">
          <div className="modal-section endereco">
            <h3>Endereço</h3>
            <p>
              {entidade.endereco}, {entidade.numero}
            </p>
            <p>
              {entidade.bairro}, {entidade.cidade} - {entidade.estado}
            </p>
            {entidade.complemento && <p>Complemento: {entidade.complemento}</p>}
          </div>

          {entidade.descricao && (
            <div className="modal-section">
              <h3>Sobre a entidade</h3>
              <p>{entidade.descricao}</p>
            </div>
          )}

          {/* Necessidades da entidade */}
          <div className="modal-section necessidades">
            <h3>Necessidades</h3>
            {entidade.necessidades && entidade.necessidades.length > 0 ? (
              <ul className="necessidades-list">
                {entidade.necessidades.map((produto) => (
                  <li key={produto._id} className="necessidade-item">
                    <span className="necessidade-nome">
                      {produto.nomeProduto}
                    </span>
                    <span className="necessidade-campanha">
                      (Campanha: {produto.cesta?.nomeCampanha || "N/A"})
                    </span>
                    <span className="necessidade-qtd">
                      Recebido {produto.quantidadeRecebida} de{" "}
                      {produto.metaProduto} {produto.unidadeMedida}
                    </span>
                    <progress
                      value={produto.quantidadeRecebida}
                      max={produto.metaProduto}
                    ></progress>
                  </li>
                ))}
              </ul>
            ) : (
                <p>
                  Nenhum item necessário cadastrado para as campanhas ativas desta entidade.
                </p>              
            )}
          </div>
        </div>

        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "var(--bg-terciario)", marginTop: "auto" }}
          className="ButtonTotal"
          variant="contained"
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}


ModalEntidade.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  entidade: PropTypes.object,
  necessidades: PropTypes.array,
};