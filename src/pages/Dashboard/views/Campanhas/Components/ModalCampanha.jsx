import PropTypes from 'prop-types';
import FormCampanha from './FormCampanha';

export default function ModalCampanha({ isOpen, onClose, campanhaAtual, onSaveCampanha }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{campanhaAtual ? "Editar Campanha" : "Cadastrar Nova Campanha"}</h3>
                <FormCampanha campanha={campanhaAtual} onSaveCampanha={onSaveCampanha} />
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}

ModalCampanha.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    campanhaAtual: PropTypes.object,
    onSaveCampanha: PropTypes.func.isRequired,
};
