import { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../services/axiosConfig';

export default function CadastraProduto ({ campanhaId, onUpdateProdutos }) {
    const [novoProduto, setNovoProduto] = useState({
        nome: "",
        descricao: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitProduto = async (e) => {
        e.preventDefault();

        const { nome, descricao } = novoProduto;

        if (!nome || !descricao) {
            alert("Os campos Nome e Descrição são obrigatórios!");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post(`/produtos/cadastrarProduto/${campanhaId}`, {
                nome,
                descricao
            });

            alert("Produto cadastrado com sucesso!");
            setNovoProduto({
                nome: "",
                descricao: ""
            });
            onUpdateProdutos(); // Atualiza a lista de produtos após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error.response);
            alert("Erro ao cadastrar produto.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card--container">
            <form className="form-container" onSubmit={handleSubmitProduto}>
                <h3>Cadastro de Produto</h3>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do produto"
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                />
                <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={novoProduto.descricao}
                    onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Aguarde..." : "Adicionar Produto"}
                </button>
            </form>
        </div>
    );
};

CadastraProduto.propTypes = {
    campanhaId: PropTypes.number.isRequired,
    onUpdateProdutos: PropTypes.func.isRequired,
};