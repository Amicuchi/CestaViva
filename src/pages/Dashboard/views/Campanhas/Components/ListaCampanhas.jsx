import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBoxOpen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';
import './ListaCampanhas.modules.css';

export default function ListaCampanhas({ onEditCampanha, onIncluirProdutos, onDeleteCampanha, onClickNovaCampanha }) {
    const [campanhas, setCampanhas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCampanhas();
    }, []);

    const fetchCampanhas = async () => {
        setLoading(true);
        try {
            const response = await api.get("/cestas");
            setCampanhas(response.data);
        } catch (error) {
            console.error("Erro ao buscar campanhas:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card--container lista-produtos">
            <span className="table-header">
                <h3>Campanhas Cadastradas</h3>
                <button onClick={onClickNovaCampanha}>Nova Campanha</button>
            </span>
            
            {loading ? (
                <p>Carregando campanhas...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome da Campanha</th>
                            <th>Data de Início</th>
                            <th>Data de Término</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campanhas.length === 0 ? (
                            <tr>
                                <td colSpan="4">Nenhuma campanha cadastrada.</td>
                            </tr>
                        ) : (
                            campanhas.map((campanha, index) => (
                                // <tr key={campanha.id}>
                                <tr key={index}>
                                    <td>{campanha.nomeCampanha}</td>
                                    <td>{campanha.comecaEm}</td>
                                    <td>{campanha.terminaEm}</td>
                                    <td className="iconEditTrash">
                                        <FontAwesomeIcon icon={faPen} onClick={() => onEditCampanha(campanha.id)} />
                                        <FontAwesomeIcon icon={faBoxOpen} onClick={() => onIncluirProdutos(campanha.id)} />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => onDeleteCampanha(campanha.id)} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

ListaCampanhas.propTypes = {
    onEditCampanha: PropTypes.func.isRequired,
    onIncluirProdutos: PropTypes.func.isRequired,
    onDeleteCampanha: PropTypes.func.isRequired,
    onClickNovaCampanha: PropTypes.func.isRequired,
};