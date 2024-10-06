import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'; // Importando PropTypes para validação de props
import api from '../../../../../services/axiosConfig';

export default function ListaCampanha ({ onUpdateCampanhas }) {
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

    const handleDeleteCampanha = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta campanha?")) {
            try {
                await api.delete(`/cestas/${id}`);
                onUpdateCampanhas(); // Atualiza a lista após a exclusão
                alert("Campanha excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir campanha:", error);
                alert("Erro ao excluir campanha.");
            }
        }
    };

    const handleEditCampanha = (id) => {
        // Implemente a lógica para edição da campanha com base no ID

        console.log(`Editar campanha com ID ${id}`);
        // Exemplo: redirecionar para página de edição ou abrir modal de edição
    };

    return (
        <div className="table--container lista-produtos">
            <h3>Campanhas Cadastradas</h3>
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
                                        <FontAwesomeIcon icon={faPen} onClick={() => handleEditCampanha(campanha.id)} />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteCampanha(campanha.id)} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Definindo PropTypes para garantir a validação das props
ListaCampanha.propTypes = {
    onUpdateCampanhas: PropTypes.func.isRequired,
};