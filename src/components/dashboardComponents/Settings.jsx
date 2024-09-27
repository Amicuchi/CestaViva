import { useState, useEffect } from "react";
import api from "../../services/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

//Pagina funcional, porem ainda falta alguns detalhes pra acessar as campanhas e cadastrar os produtos dentro da campanha

export default function Settings() {
  // Estados para armazenar os dados da campanha
  const [nomeCampanha, setNomeCampanha] = useState("");
  const [comecaEm, setComecaEm] = useState("");
  const [terminaEm, setTerminaEm] = useState("");

  // Estado para armazenar a lista de campanhas cadastradas
  const [campanhas, setCampanhas] = useState([]);

  // Função para cadastrar uma nova campanha
  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // Atualiza a lista de campanhas após o cadastro
      fetchCampanhas();
    } catch (error) {
      console.error("Erro ao cadastrar campanha:", error.response);
      alert("Ocorreu um erro ao cadastrar a campanha.");
    }
  };

  // Função para buscar campanhas cadastradas no backend
  const fetchCampanhas = async () => {
    try {
      const response = await api.get("/cestas"); // Rota para retornar as cestas (campanhas) da instituição logada
      setCampanhas(response.data); // Armazenando as campanhas no estado
    } catch (error) {
      console.error("Erro ao buscar campanhas:", error);
    }
  };

  // useEffect para buscar campanhas ao carregar a página
  useEffect(() => {
    fetchCampanhas();
  }, []);

  return (
    <div className="card--container">
      <h2>Administre suas campanhas</h2>

      {/* Seção de cadastro de campanhas */}
      <div className="cestas--cadastroProduto">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Cadastro da Campanha</h3>
          <input
            type="text"
            name="nome"
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
      <div className="table--container">
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
  );
}
