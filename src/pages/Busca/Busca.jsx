import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // useLocation: Obtém a localização atual para acessar os parâmetros da URL
import api from "../../services/axiosConfig";
import ModalEntidade from "./components/ModalEntidade";
import "./Busca.css";

export default function Busca() {
  const [entidades, setEntidades] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [itens, setItens] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroItem, setFiltroItem] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroNome, setFiltroNome] = useState("");

  // Estados para o modal
  const [modalOpen, setModalOpen] = useState(false);
  const [entidadeSelecionada, setEntidadeSelecionada] = useState(null);

  const location = useLocation();

  // Fetch de entidades e suas necessidades quando o componente é montado
  useEffect(() => {
    api
      .get("/entidades")
      .then((response) => {
        setEntidades(response.data);

        // A ideia aqui é extrair todas as cidades que estão cadastradas nas entidades e exibi-las de maneira que não se repitam no filtro por cidade.
        // Assim, nenhuma cidade precisa ser inserida manualmente, correndo o risco de deixar alguma de lado, impedindo que a entidade daquela cidade seja encontrada.

        // Extraindo cidades únicas das entidades
        const cidadesUnicas = [
          ...new Set(response.data.map((entidade) => entidade.cidade)),
        ];
        setCidades(cidadesUnicas);

        // Extraindo itens únicos das necessidades das entidades
        // Utilizamos flatMap para criar uma lista única de itens
        const itensUnicos = [
          ...new Set(
            response.data.flatMap((entidade) => entidade.necessidades || [])
          ),
        ];
        setItens(itensUnicos);

        // Extraindo tipos únicos das entidades
        const tiposUnicos = [
          ...new Set(response.data.map((entidade) => entidade.tipoEntidade)),
        ];

        setTipos(tiposUnicos);
      })
      .catch((error) => console.error("Erro ao buscar entidades:", error));
  }, []);

  // Atualiza o estado do filtroCidade com o valor extraído da URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // Extrair o parâmetro cidade da URL
    const cidade = queryParams.get("cidade");

    if (cidade) {
      setFiltroCidade(cidade);
      // Atualizar estado: Configura o estado filtroCidade com o valor extraído da URL, o que faz com que o filtro na página de busca seja aplicado automaticamente.
    }

  }, [location.search]); // Atualizar quando a URL mudar

  // Filtra entidades baseado nos filtros aplicados
  const entidadesFiltradas = entidades.filter((entidade) => {

    // Aplica filtro de cidade
    const filtroCidadeAplicado =
      filtroCidade === "" ||
      entidade.cidade.toLowerCase() === filtroCidade.toLowerCase();

    const filtroItemAplicado =
      filtroItem === "" ||
      (entidade.necessidades &&
        entidade.necessidades.some(
          (necessidade) => necessidade.nomeProduto === filtroItem
        ));

    const filtroTipoAplicado =
      filtroTipo === "" ||
      (entidade.tipoEntidade &&
        entidade.tipoEntidade.toLowerCase() === filtroTipo.toLowerCase());

    const filtroNomeAplicado =
      filtroNome === "" ||
      entidade.nomeFantasia.toLowerCase().includes(filtroNome.toLowerCase());

    return (
      filtroCidadeAplicado &&
      filtroItemAplicado &&
      filtroTipoAplicado &&
      filtroNomeAplicado
    );
  });

  // Função para abrir o modal e definir a entidade selecionada
  const handleOpenModal = (entidade) => {
    setEntidadeSelecionada(entidade);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setEntidadeSelecionada(null);
  };

  return (
    <main className="buscaContainer">
      <h1>Busca de Entidades</h1>

      {/* Primeira linha: Selects */}
      <div className="buscaFiltros">
        {/* Filtro de cidades */}
        <select
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
        >
          <option value="">Todas as cidades</option>
          {cidades.map((cidade) => (
            <option key={cidade} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>

        {/* Filtro de itens */}
        <select
          value={filtroItem}
          onChange={(e) => setFiltroItem(e.target.value)}
        >
          <option value="">Todos os alimentos</option>
          {itens.map((item) => (
            <option key={item._id} value={item.nomeProduto}>
              {item.nomeProduto}
            </option>
          ))}
        </select>

        {/* Filtro de tipo de entidade */}
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>


      {/* Segunda linha: Input de busca */}
      <div className="buscaNome">
        {/* Filtro pelo nome (nomeFantasia) */}
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
      </div>


      {/* Exibe a lista de entidades filtradas */}
      <ul className="buscaUL">
        {entidadesFiltradas.length === 0 ? (
          <li className="BELi">Nenhuma entidade encontrada.</li>
        ) : (
          entidadesFiltradas.map((entidade) => (
            <li
              className="BELi card"
              key={entidade._id}
              onClick={() => handleOpenModal(entidade)}
            >
              <h2 className="entidadeNome">{entidade.nomeFantasia}</h2>

              <p className="entidadeEndereco">
                {entidade.endereco}, {entidade.numero}, {entidade.complemento}
              </p>

              <p className="entidadeEndereco">{entidade.bairro}</p>

              <p className="entidadeEndereco">
                {entidade.cidade} - {entidade.estado}
              </p>

              <p className="entidadeTipo">Tipo: {entidade.tipoEntidade}</p>

              <div className="entidadeNecessidades">
                {/* Exibe necessidades da entidade */}
                {entidade.necessidades && entidade.necessidades.length > 0 ? (
                  entidade.necessidades.map((necessidade) => (
                    <span className="necessidade" key={necessidade._id}>
                      {necessidade.nomeProduto} ({necessidade.tipo}) -
                      Quantidade: {necessidade.qtdNecessaria}
                    </span>
                  ))
                ) : (
                  <span className="necessidade">
                    Nenhuma necessidade registrada.
                  </span>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal para exibir os detalhes da entidade */}
      {entidadeSelecionada && (
        <ModalEntidade
          open={modalOpen}
          handleClose={handleCloseModal}
          entidade={entidadeSelecionada} // Passar entidade selecionada como prop
        />
      )}
    </main>
  );
}
