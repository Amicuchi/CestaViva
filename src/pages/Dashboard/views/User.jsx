import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/axiosConfig";
import useRandomAvatar from "../../../services/useRandomAvatar";
import '../Dashboard.css';

export default function DashboardUser() {
  const [entidade, setEntidade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  // Usando o hook para gerenciar a imagem
  const { selectedImage, setSelectedImage, getImageToDisplay } = useRandomAvatar();

  const fetchEntidade = useCallback(async () => {
    try {
      const entidadeResponse = await api.get("/entidade");
      setEntidade(entidadeResponse.data);
      setSelectedImage(entidadeResponse.data.imagem || "");
      setDescricao(entidadeResponse.data.descricao || "");
    } catch (error) {
      setError("Erro ao carregar os dados da entidade");
      console.error("Erro ao buscar entidade:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate, setSelectedImage]);

  useEffect(() => {
    fetchEntidade();
  }, [fetchEntidade]);

  const handleSave = async () => {
    try {
      const data = {
        imagem: selectedImage || undefined,
        descricao: descricao || undefined,
      };

      await api.post("/entidade", data);
      alert("Dados atualizados com sucesso!");
      fetchEntidade(); // Recarrega os dados após salvar
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Falha ao salvar os dados.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card--container lastOne">
      <div className="card--content">
        <h2>Perfil da Entidade</h2>
        <div className="user--container">
          <img
            src={getImageToDisplay()}
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
            <p className="UserP" readOnly>{`${entidade.endereco}, ${entidade.numero
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
              value={selectedImage}
              onChange={(e) => setSelectedImage(e.target.value)}
              placeholder="Digite o link da imagem"
            />

            <h3>Biografia</h3>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
