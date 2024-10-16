import PropTypes from 'prop-types';
import '../Dashboard.css';

export default function Header({ title, abrirModal }) {
    return (
            <div className="header--wrapper">
                <h2>{title}</h2>

                {/* Exibe o botão apenas se o título for "Gerenciamento de Campanhas" */}
                {title === "Gerenciamento de Campanhas" && (
                    <button onClick={abrirModal}>Nova Campanha</button>
                )}
            </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    abrirModal: PropTypes.func,
  };
  