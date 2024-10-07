// ListaProdutos.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';

export default function ListaProdutos({ campanhaId }) {
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

    const handleDarBaixaProduto = async (produtoId) => {
        try {
            await api.delete(`/produtos/${produtoId}`);  // Simulação de "dar baixa"
            alert("Produto removido com sucesso!");
            setProdutos(produtos.filter((produto) => produto.id !== produtoId));
        } catch (error) {
            console.error("Erro ao dar baixa no produto:", error.response);
            alert("Erro ao dar baixa no produto.");
        }
    };

    return (
        <div className="CEContainer cestas--listaProdutos">
            <h3>Lista de Produtos da Campanha</h3>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.descricao}
                        <button onClick={() => handleDarBaixaProduto(produto.id)}>Dar Baixa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ListaProdutos.propTypes = {
    campanhaId: PropTypes.number.isRequired,
};