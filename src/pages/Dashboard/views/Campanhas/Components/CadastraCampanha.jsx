import { useState } from 'react';
import PropTypes from 'prop-types'; // Importando PropTypes para validação de props
import api from '../../../../../services/axiosConfig';

const CadastraCampanha = ({ onUpdateCampanhas }) => {
    // Estado para os campos do formulário de campanha
    const [novaCampanha, setNovaCampanha] = useState({
        nomeCampanha: "",
        descricao: "",
        dataInicio: "",
        dataFim: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função para limpar o formulário após o envio bem-sucedido
    const resetForm = () => {
        setNovaCampanha({
            nomeCampanha: "",
            descricao: "",
            dataInicio: "",
            dataFim: ""
        });
    };

    // Função para cadastrar nova campanha
    const handleSubmitCampanha = async (e) => {
        e.preventDefault();
        const { nomeCampanha, descricao, dataInicio, dataFim } = novaCampanha;

        if (!nomeCampanha || !descricao || !dataInicio || !dataFim) {
            alert("Todos os campos da campanha são obrigatórios!");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post("/cestas/cadastrarCesta", {
                nomeCampanha,
                descricao,
                dataInicio,
                dataFim,
            });
            
            // Exibir mensagem de sucesso ou limpar os campos após cadastro
            alert("Campanha cadastrada com sucesso!");
            resetForm();
            onUpdateCampanhas(); // Atualiza a lista de campanhas após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar campanha:", error.response);
            alert("Erro ao cadastrar campanha.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="cestas--cadastroProduto">
            <form className="form-container" onSubmit={handleSubmitCampanha}>
                <h3>Cadastro da Campanha</h3>
                <input
                    type="text"
                    name="nomeCampanha"
                    placeholder="Nome da campanha"
                    value={novaCampanha.nomeCampanha}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, nomeCampanha: e.target.value })}
                />
                <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={novaCampanha.descricao}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, descricao: e.target.value })}
                />
                <input
                    type="date"
                    name="dataInicio"
                    placeholder="Data de Início"
                    value={novaCampanha.dataInicio}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, dataInicio: e.target.value })}
                />
                <input
                    type="date"
                    name="dataFim"
                    placeholder="Data de Término"
                    value={novaCampanha.dataFim}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, dataFim: e.target.value })}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Aguarde..." : "Adicionar Campanha"}
                </button>
            </form>
        </div>
    );
};

// Definindo PropTypes para garantir a validação das props
CadastraCampanha.propTypes = {
    onUpdateCampanhas: PropTypes.func.isRequired,
};

export default CadastraCampanha;
