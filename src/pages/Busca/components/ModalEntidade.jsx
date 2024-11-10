import PropTypes from 'prop-types';
import { Modal, Box, Button } from '@mui/material';
import '../../CadastroEntidade/components/ModalTermo'
export default function ModalEntidade({ open, handleClose, entidade }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="modal-box-container"
        >
            <Box className="modal-box">
                <h2 id="modal-title" className="modal-title">
                    {entidade.nomeFantasia}
                </h2>
                <div id="modal-description" className="modal-description">
                    <p><strong>Endereço:</strong> {entidade.endereco}, {entidade.numero} - {entidade.bairro}, {entidade.cidade} - {entidade.estado}</p>
                    <p><strong>Complemento:</strong> {entidade.complemento || 'N/A'}</p>
                    <p><strong>Necessidades:</strong></p>
                    <ul>
                        {entidade.necessidades && entidade.necessidades.length > 0 ? (
                            entidade.necessidades.map(necessidade => (
                                <li key={necessidade._id}>
                                    {necessidade.nomeProduto} ({necessidade.tipo}) - Quantidade: {necessidade.qtdNecessaria}
                                </li>
                            ))
                        ) : (
                            <li>Nenhuma necessidade registrada.</li>
                        )}
                    </ul>
                    <hr />
                </div>
                
                <Button 
                    onClick={handleClose} 
                    sx={{ backgroundColor: 'var(--bg-terciario)' }} 
                    className="ButtonTotal" 
                    variant="contained">
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
