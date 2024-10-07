import { useState } from 'react';
import api from '../../../../../services/axiosConfig';
import PropTypes from 'prop-types';

export default function CadastraCampanha ({ onUpdateCampanhas }) {
    // Estado para os campos do formulário de campanha
    const [novaCampanha, setNovaCampanha] = useState({
        nomeCampanha: "",
        descricao: "",
        comecaEm: "",
        terminaEm: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Função para limpar o formulário após o envio bem-sucedido
    const resetForm = () => {
        setNovaCampanha({
            nomeCampanha: "",
            descricao: "",
            comecaEm: "",
            terminaEm: ""
        });
    };

    // Função para cadastrar nova campanha
    const handleSubmitCampanha = async (e) => {
        e.preventDefault();
        const { 
            nomeCampanha, 
            descricao, 
            comecaEm, 
            terminaEm 
        } = novaCampanha;

        if (!nomeCampanha || !descricao || !comecaEm || !terminaEm) {
            alert("Todos os campos da campanha são obrigatórios!");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post("/cestas/cadastrarCesta", {
                nomeCampanha,
                descricao,
                comecaEm,
                terminaEm,
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
        <div className="card--container">
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
                    name="comecaEm"
                    placeholder="Data de Início"
                    value={novaCampanha.comecaEm}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, comecaEm: e.target.value })}
                />
                <input
                    type="date"
                    name="terminaEm"
                    placeholder="Data de Término"
                    value={novaCampanha.terminaEm}
                    onChange={(e) => setNovaCampanha({ ...novaCampanha, terminaEm: e.target.value })}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Aguarde..." : "Adicionar Campanha"}
                </button>
            </form>
        </div>
    );
};

CadastraCampanha.propTypes = {
    onUpdateCampanhas: PropTypes.func.isRequired,
};