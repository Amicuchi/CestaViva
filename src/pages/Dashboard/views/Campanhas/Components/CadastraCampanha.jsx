import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../services/axiosConfig";

export default function CadastraCampanha() {
    // Estados para a campanha
    const [campanhas, setCampanhas] = useState([]); // Estado para armazenar a lista de campanhas cadastradas
    const [nomeCampanha, setNomeCampanha] = useState("");
    const [comecaEm, setComecaEm] = useState("");
    const [terminaEm, setTerminaEm] = useState("");

    // Função para buscar campanhas cadastradas no backend
    // Faz a requisição para buscar as campanhas existentes e as armazena no estado campanhas
    const fetchCampanhas = async () => {
        try {
            const response = await api.get("/cestas"); // Rota para retornar as cestas (campanhas) da instituição logada
            setCampanhas(response.data); // Armazenando as campanhas no estado
        } catch (error) {
            console.error("Erro ao buscar campanhas:", error);
        }
    };

    // Carregar campanhas quando a página for carregada
    useEffect(() => {
        fetchCampanhas();
    }, []);

    // Função para cadastrar nova campanha
    // Submete os dados do formulário para cadastrar uma nova campanha.
    const handleSubmitCampanha = async (e) => {
        e.preventDefault();
        if (!nomeCampanha || !comecaEm || !terminaEm) {
            alert("Todos os campos da campanha são obrigatórios!");
            return;
        }
        try {
            await api.post("/cestas/cadastrarCesta", {
                nomeCampanha,
                comecaEm,
                terminaEm,
            });

            // Exibir mensagem de sucesso ou limpar os campos após cadastro
            alert("Campanha cadastrada com sucesso!");
            setNomeCampanha("");
            setComecaEm("");
            setTerminaEm("");

            fetchCampanhas();// Atualiza a lista de campanhas após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar campanha:", error.response);
            alert("Erro ao cadastrar campanha.");
        }
    };

    

    return (
        <>
            {/* Seção de cadastro de campanhas */}
            <div className="card--container">
                <h2>Administre suas campanhas</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={handleSubmitCampanha}>
                            <h3>Cadastro da Campanha</h3>
                            <input
                                type="text"
                                name="nomeCampanha"
                                placeholder="Nome da campanha"
                                value={nomeCampanha}
                                onChange={(e) => setNomeCampanha(e.target.value)}
                            />
                            <input
                                type="date"
                                name="inicio"
                                placeholder="Data de Início"
                                value={comecaEm}
                                onChange={(e) => setComecaEm(e.target.value)}
                            />
                            <input
                                type="date"
                                name="termino"
                                placeholder="Data de Término"
                                value={terminaEm}
                                onChange={(e) => setTerminaEm(e.target.value)}
                            />
                            <button type="submit">Adicionar Campanha</button>
                        </form>
                    </div>

                    {/* Seção de listagem das campanhas */}
                    <div className="table--container lista-produtos">
                        <h3>Campanhas Cadastradas</h3>
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
                                                <FontAwesomeIcon icon={faPen} />
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};


