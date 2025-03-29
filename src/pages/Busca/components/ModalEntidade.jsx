import { Modal, Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import "./ModalEntidade.css";
import fotoAlt from "../../../assets/default-images/default1.jpg";

export default function ModalEntidade({ open, handleClose, entidade }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-describedby="modal-description"
      className="modal-container"
    >
      <Box className="modal-box-entidade">
        {/* Cabeçalho: Foto + Nome da Entidade */}
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

          {/* Endereço da entidade */}
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

          {/* Bio da entidade */}
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
                {entidade.necessidades.map((necessidade) => (
                  <li key={necessidade._id} className="necessidade-item">
                    <span className="necessidade-nome">
                      {necessidade.nomeProduto}
                    </span>
                    <span className="necessidade-tipo">
                      ({necessidade.tipo})
                    </span>
                    <span className="necessidade-qtd">
                      {" "}
                      - {necessidade.qtdNecessaria} unidades
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma necessidade cadastrada.</p>
            )}
          </div>
        </div>

        {/* Botão de Fechar */}
        <Button
          onClick={handleClose}
          sx={{ backgroundColor: "var(--bg-terciario)" }}
          className="ButtonTotal"
          variant="contained"
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}

// Adicionando a validação de prop-types
ModalEntidade.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  entidade: PropTypes.shape({
    nomeFantasia: PropTypes.string,
    endereco: PropTypes.string,
    numero: PropTypes.string,
    bairro: PropTypes.string,
    cidade: PropTypes.string,
    estado: PropTypes.string,
    complemento: PropTypes.string,
    descricao: PropTypes.string,
    imagem: PropTypes.string,
    bio: PropTypes.string,
    foto: PropTypes.string,
    tipoEntidade: PropTypes.string,
    necessidades: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        nomeProduto: PropTypes.string,
        tipo: PropTypes.string,
        qtdNecessaria: PropTypes.number,
      })
    ),
  }),
};
