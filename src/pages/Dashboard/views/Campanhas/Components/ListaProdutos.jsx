import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';

export default function ListaProdutos ({ campanhaId }) {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get(`/produtos/${campanhaId}`);
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error.response);
                alert("Erro ao buscar produtos.");
            }
        };

        fetchProdutos();
    }, [campanhaId]);

    return (
        <div className="cestas--listaProdutos">
            <h3>Lista de Produtos</h3>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.descricao}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ListaProdutos.propTypes = {
    campanhaId: PropTypes.number.isRequired,
};