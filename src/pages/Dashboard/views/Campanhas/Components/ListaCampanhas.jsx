import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faBoxOpen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';
import ModalCampanha from './ModalCampanha';
import './ListaCampanhas.modules.css';

export default function ListaCampanhas({ onEditCampanha, onIncluirProdutos, onDeleteCampanha, onClickNovaCampanha }) {
    const [campanhas, setCampanhas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [campanhaAtual, setCampanhaAtual] = useState(null);

    // Função para buscar as campanhas via API
    const fetchCampanhas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/cestas');
            setCampanhas(response.data);
        } catch (error) {
            console.error('Erro ao buscar campanhas:', error.response);
            alert('Erro ao buscar campanhas.');
        } finally {
            setLoading(false);
        }
    };

    // Chamada inicial e para recarregar a lista de campanhas
     useEffect(() => {
        fetchCampanhas(); // Buscar as campanhas quando o componente for montado
    }, []);

    // Função para salvar (criar ou editar) uma campanha e atualizar a lista
    const handleSaveCampanha = async (novaCampanha) => {
        try {
            if (campanhaAtual) {
                // Editar campanha existente
                await api.put(`/campanhas/${campanhaAtual.id}`, novaCampanha);
                alert('Campanha atualizada com sucesso!');
            } else {
                // Criar nova campanha
                await api.post(`/campanhas`, novaCampanha);
                alert('Campanha cadastrada com sucesso!');
            }
            fetchCampanhas(); // Atualiza a lista de campanhas após salvar
            setIsModalOpen(false); // Fecha o modal após salvar
            setCampanhaAtual(null); // Limpa o estado da campanha atual
        } catch (error) {
            console.error('Erro ao salvar campanha:', error.response);
            alert('Erro ao salvar campanha.');
        }
    };

    // Função para abrir o modal para criar uma nova campanha
    const handleNovaCampanha = () => {
        setCampanhaAtual(null); // Limpa o estado da campanha atual
        setIsModalOpen(true); // Abre o modal
    };

    return (
        <div className="card--container lista-produtos">
            <div className="table-header">
                <h3>Campanhas Cadastradas</h3>
                <button onClick={handleNovaCampanha}>Nova Campanha</button>
            </div>
            
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

            {/* Modal para criar ou editar campanha */}
            <ModalCampanha
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSaveCampanha={handleSaveCampanha}
                campanhaAtual={campanhaAtual}
            />
        </div>
    );
}

ListaCampanhas.propTypes = {
    onEditCampanha: PropTypes.func.isRequired,
    onIncluirProdutos: PropTypes.func.isRequired,
    onDeleteCampanha: PropTypes.func.isRequired,
    onClickNovaCampanha: PropTypes.func.isRequired,
};