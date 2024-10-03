import { useState, useEffect } from "react";
import api from "../../../services/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  // Estados para a campanha
  const [nomeCampanha, setNomeCampanha] = useState("");
  const [comecaEm, setComecaEm] = useState("");
  const [terminaEm, setTerminaEm] = useState("");
  const [campanhas, setCampanhas] = useState([]); // Estado para armazenar a lista de campanhas cadastradas

  // Estados para a cesta completa
  const [cestaCompleta, setCestaCompleta] = useState([]); // Lista de itens que compõem a cesta completa
  const [novoItemCesta, setNovoItemCesta] = useState({ nome: '', quantidade: '', campanha: '' }); // Dados do novo item a ser adicionado à cesta completa

  // Estado para troca de senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Função para cadastrar nova campanha
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

  // Função para buscar campanhas cadastradas no backend
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

  // Função para adicionar um novo item à cesta completa
  const adicionarItemCesta = (e) => {
    e.preventDefault();
    const { nome, quantidade, campanha } = novoItemCesta;
    if (!nome || !quantidade || !campanha || quantidade <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
    // Apenas adiciona o item se todos os campos estiverem preenchidos e a quantidade for maior que 0
    setCestaCompleta([...cestaCompleta, novoItemCesta]); // Adiciona o novo item à lista de cesta completa
    setNovoItemCesta({ nome: '', quantidade: '', campanha: '' }); // Reseta o formulário
  };

  // Função para editar item da cesta completa
  const editarItem = (index) => {
    const item = cestaCompleta[index];
    const nome = prompt('Editar nome do produto:', item.nome);        // Prompt para editar o nome
    const quantidade = prompt('Editar quantidade:', item.quantidade); // Prompt para editar a quantidade
    const campanha = prompt('Editar campanha:', item.campanha);       // Prompt para editar a campanha

    if (nome && quantidade > 0 && campanha) {
      const updatedCesta = [...cestaCompleta]; // Apenas atualiza se os valores são válidos
      updatedCesta[index] = { nome, quantidade, campanha }; // Atualiza o item na lista
      setCestaCompleta(updatedCesta); // Atualiza a lista de cesta completa
    }
  };

  // Função para excluir item da cesta completa
  const excluirItem = (index) => {
    setCestaCompleta(cestaCompleta.filter((_, i) => i !== index)); // Remove o item da lista
  };

  // Função para trocar senha
  const trocarSenha = async (e) => {
    e.preventDefault();
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Todos os campos de senha são obrigatórios!");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert("A nova senha e a confirmação não correspondem.");
      return;
    }

    try {
      await api.post("/usuario/trocarSenha", {
        senhaAtual,
        novaSenha,
      });
      alert("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");

    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      alert("Erro ao trocar senha.");
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

      {/* Seção de cadastro de itens para a cesta completa */}
      <div className="card--container">
        <h2>Cesta Completa</h2>
        <div className="cestas-flex">
          <div className="cestas--cadastroProduto">
            <form className="form-container" onSubmit={adicionarItemCesta}>
              <h3>Cadastro do produto</h3>
              <select
                className='form--span'
                name="campanha"
                value={novoItemCesta.campanha}
                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, campanha: e.target.value })}
              >
                <option value="">Selecione uma campanha</option>
                {campanhas.map((campanha, index) => (
                  <option key={index} value={campanha.nomeCampanha}>
                    {campanha.nomeCampanha}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="nome"
                placeholder="Nome do produto"
                value={novoItemCesta.nome}
                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, nome: e.target.value })}
              />
              <input
                type="number"
                name="quantidade"
                placeholder="Qtd na cesta"
                value={novoItemCesta.quantidade}
                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, quantidade: e.target.value })}
              />
              <button type="submit">Adicionar à Cesta Completa</button>
            </form>
          </div>

          {/* Seção de lista de itens da cesta completa */}
          <div className="lista-produtos">
            <h3>Composição da Cesta Completa</h3>
            <table>
              <thead>
                <tr>
                  <th>Campanha</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {cestaCompleta.length === 0 ? (
                  <tr>
                    <td colSpan="4">Nenhum item na cesta completa ainda.</td>
                  </tr>
                ) : (
                  cestaCompleta.map((item, index) => (
                    <tr key={index}>
                      <td>{item.campanha}</td>
                      <td>{item.nome}</td>
                      <td>{item.quantidade}</td>
                      <td>
                        <button
                          className='btnQtd'
                          onClick={() => editarItem(index)}
                        >
                          Editar
                        </button>
                        <button
                          className='btnQtd left'
                          onClick={() => excluirItem(index)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Seção de troca de senha */}
      <div className="card--container lastOne">
        <form onSubmit={trocarSenha}>
          <h2>Troca de Senha</h2>
          <input
            type="password"
            placeholder="Senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button type="submit">Alterar Senha</button>
        </form>
      </div>
    </>
  );
}