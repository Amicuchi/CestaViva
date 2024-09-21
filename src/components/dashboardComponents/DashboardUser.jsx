import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento, se necessário
import api from "../../services/axiosConfig";
import "../../styles/Dashboard.css";

// Imagens padrão
import defaultImage1 from "../../assets/default-images/default1.jpg";
import defaultImage2 from "../../assets/default-images/default2.jpg";
import defaultImage3 from "../../assets/default-images/default3.jpg";
import defaultImage4 from "../../assets/default-images/default4.jpg";
import defaultImage5 from "../../assets/default-images/default5.jpg";
import defaultImage6 from "../../assets/default-images/default6.jpg";
import defaultImage7 from "../../assets/default-images/default7.jpg";
import defaultImage8 from "../../assets/default-images/default8.jpg";
import defaultImage9 from "../../assets/default-images/default9.jpg";
import defaultImage10 from "../../assets/default-images/default10.jpg";

// Array de imagens padrão
const defaultImages = [
  defaultImage1,
  defaultImage2,
  defaultImage3,
  defaultImage4,
  defaultImage5,
  defaultImage6,
  defaultImage7,
  defaultImage8,
  defaultImage9,
  defaultImage10,
];

export default function DashboardUser() {
  const [entidade, setEntidade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagem, setImagem] = useState(""); // Estado para a imagem
  const [descricao, setDescricao] = useState(""); // Estado para a descrição
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntidade = async () => {
      try {
        const entidadeResponse = await api.get("/entidade"); // Corrigindo o endpoint para o correto
        setEntidade(entidadeResponse.data);
        setImagem(entidadeResponse.data.imagem || ""); // Setando o estado inicial
        setDescricao(entidadeResponse.data.descricao || ""); // Setando o estado inicial
      } catch (error) {
        setError("Erro ao carregar os dados da entidade");
        console.error("Erro ao buscar entidade:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchEntidade();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const data = {
        imagem: imagem || undefined, // Enviar somente se não estiver vazio
        descricao: descricao || undefined, // Enviar somente se não estiver vazio
      };

      // Fazendo uma requisição para atualizar a entidade
      await api.post("/entidade", data);

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Falha ao salvar os dados.");
    }
  };

  const getRandomDefaultImage = () => {
    const randomIndex = Math.floor(Math.random() * defaultImages.length);
    return defaultImages[randomIndex];
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card--container lastOne">
      <div className="card--content">
        <h2>Perfil da Entidade</h2>
        <div className="user--container">
          <img
            src={entidade.imagem ? entidade.imagem : getRandomDefaultImage()}
            className="CardImg"
            alt={`Logo da Entidade ${entidade.nomeFantasia}`}
          />
          <div>
            <label className="UserLabel">CNPJ:</label>
            <p className="UserP" readOnly>
              {entidade.cnpj}
            </p>

            <label className="UserLabel">Razão Social:</label>
            <p className="UserP" readOnly>
              {entidade.razaoSocial}
            </p>

            <label className="UserLabel">Nome Fantasia:</label>
            <p className="UserP" readOnly>
              {entidade.nomeFantasia}
            </p>

            <label className="UserLabel">Endereço:</label>
            <p className="UserP" readOnly>{`${entidade.endereco}, ${
              entidade.numero
            }, ${entidade.bairro || "N/A"}`}</p>

            <label className="UserLabel">Complemento:</label>
            <p className="UserP" readOnly>{`${entidade.complemento}`}</p>

            <label className="UserLabel">Cidade/Estado:</label>
            <p
              className="UserP"
              readOnly
            >{`${entidade.cidade}, ${entidade.estado}`}</p>

            <label className="UserLabel">Telefone:</label>
            <p className="UserP" readOnly>
              {entidade.telefone}
            </p>

            <h3>Link foto Perfil</h3>
            <input
              value={imagem}
              onChange={(e) => setImagem(e.target.value)} // Atualiza o estado da imagem
              placeholder="Digite o link da imagem"
            />

            <h3>Biografia</h3>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado da descrição
              placeholder="Digite a biografia"
            />
          </div>
        </div>
        <button className="ButtonTotal" onClick={handleSave}>
          Salvar alteração
        </button>
      </div>
    </div>
  );
}
