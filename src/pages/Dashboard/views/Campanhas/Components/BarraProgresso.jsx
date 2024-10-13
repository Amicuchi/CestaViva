import PropTypes from "prop-types";
import "./barraprogresso.css";

const BarraDeProgresso = ({ quantidadeRecebida, metaProduto }) => {
  // Calcula a porcentagem, sem limitar visualmente a barra
  const progressoVisual = Math.min(
    (quantidadeRecebida / metaProduto) * 100,
    100
  );

  // Calcula a porcentagem real, que pode ultrapassar 100%
  const progressoReal = (quantidadeRecebida / metaProduto) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progressoVisual}%` }}
      >
        {progressoReal.toFixed(2)}%
      </div>
    </div>
  );
};

BarraDeProgresso.propTypes = {
  quantidadeRecebida: PropTypes.number.isRequired,
  metaProduto: PropTypes.number.isRequired,
};
export default BarraDeProgresso;
