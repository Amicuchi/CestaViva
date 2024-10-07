import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';

export default function ListaProdutos({ campanhaId }) {
    const [produtos, setProdutos] = useState([]);

    // Função para buscar os produtos da campanha
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

    // Função para dar baixa no produto
    const handleDarBaixaProduto = async (produtoId, quantidadeRecebida) => {
        if (quantidadeRecebida <= 0) return alert("Insira uma quantidade válida!");

        try {
            const produto = produtos.find((p) => p.id === produtoId);
            const quantidadeRestante = produto.quantidadeNecessaria - produto.quantidadeRecebida;

            if (quantidadeRecebida > quantidadeRestante) {
                alert("Quantidade recebida excede a quantidade necessária.");
                return;
            }

            const novaQuantidade = produto.quantidadeRecebida + quantidadeRecebida;
            await api.put(`/produtos/${produtoId}`, { quantidadeRecebida: novaQuantidade });

            // Atualizar a lista de produtos
            setProdutos((prevProdutos) =>
                prevProdutos.map((p) =>
                    p.id === produtoId
                        ? { ...p, quantidadeRecebida: novaQuantidade }
                        : p
                )
            );
        } catch (error) {
            console.error("Erro ao dar baixa no produto:", error.response);
            alert("Erro ao dar baixa no produto.");
        }
    };

    return (
        <div className="CEContainer cestas--listaProdutos">
            <h3>Produtos da Campanha</h3>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.quantidadeNecessaria} unidades
                        {produto.quantidadeRecebida < produto.quantidadeNecessaria ? (
                            <>
                                <span>
                                    {produto.quantidadeRecebida} recebidos -{" "}
                                    {produto.quantidadeNecessaria - produto.quantidadeRecebida} restantes
                                </span>
                                <input
                                    type="number"
                                    placeholder="Receber"
                                    onChange={(e) => handleDarBaixaProduto(produto.id, Number(e.target.value))}
                                />
                            </>
                        ) : (
                            <span>Todos os produtos foram recebidos</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ListaProdutos.propTypes = {
    campanhaId: PropTypes.number.isRequired,
};