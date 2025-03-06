import { useState, useRef } from "react";
import axios from "axios";

export default function Suporte() {
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  const [protocolo, setProtocolo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);
  console.log(imageLinks);

  const handleFileChange = async (e) => {
    const files = e.target.files;

    if (files.length > 1) {
      setUploadStatus("Você pode enviar apenas 1 imagem.");
      fileInputRef.current.value = ""; // Limpa o input
      return;
    }

    const file = files[0]; // Obtém o único arquivo selecionado

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadStatus("O arquivo selecionado não é uma imagem válida.");
      fileInputRef.current.value = ""; // Limpa o input
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB em bytes
      setUploadStatus("O arquivo deve ter no máximo 5MB.");
      fileInputRef.current.value = ""; // Limpa o input
      return;
    }

    setUploadStatus(""); // Limpa mensagens anteriores
    await uploadImages([file]); // Envia apenas um arquivo válido
  };

  // Converter arquivos em Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Pegamos apenas o Base64
      reader.onerror = (error) => reject(error);
    });
  };

  // Fazer upload das imagens para o backend
  const uploadImages = async (files) => {
    try {
      const uploadedImages = [];
      setUploadStatus("Iniciando upload das imagens...");

      for (const file of files) {
        const base64Image = await convertFileToBase64(file);
        setUploadStatus(`Fazendo upload da imagem: ${file.name}`);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, {
          image: base64Image,
        });

        uploadedImages.push(response.data.link);
      }

      setUploadStatus("Upload das imagens concluído.");
      setImageLinks(uploadedImages);
    } catch {
      setUploadStatus("Erro ao fazer upload das imagens.");
      throw new Error("Erro ao fazer upload das imagens.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setUploadStatus("");

    try {
      const token = localStorage.getItem("token");

      // Enviar suporte com os links das imagens
      await axios.post(
        `${import.meta.env.VITE_API_URL}/send-suporte`,
        {
          subject: `Suporte: ${tipo}`,
          mensagem: mensagem,
          imageLinks: imageLinks,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProtocolo(
        "Seu contato foi enviado com sucesso, retornaremos assim que possível."
      );
      setTipo("");
      setMensagem("");
      setImageLinks([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setErro(
        `Falha ao enviar o email. Erro: ${
          error.response?.data?.msg || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form--support">
      <h2>Contato com o Suporte</h2>
      <p>Aqui você pode enviar imagens, arquivos e texto para o suporte...</p>

      <label className="UserLabel">Tipo de Solicitação:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
        <option value="">Selecione</option>
        <option value="duvida">Dúvida</option>
        <option value="dificuldade">Dificuldade</option>
        <option value="sugestao">Sugestão</option>
        <option value="comentario">Comentário</option>
        <option value="alteracao entidade">
          Alteração de dados da Entidade
        </option>
        <option value="alteracao responsavel">
          Alteração de dados do Responsável
        </option>
        <option value="alteracao usuario">
          Alteração de dados do Voluntário
        </option>
      </select>

      <label className="UserLabel">Mensagem:</label>
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        required
      />

      <label className="UserLabel">Anexar foto do bug (apenas 1 até 5mb)</label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        accept="image/*"
      />

      {uploadStatus && <p>{uploadStatus}</p>}
      {loading && <p>Enviando...</p>}
      {erro && <p className="errorMessage">{erro}</p>}

      <button type="submit" disabled={loading}>
        Enviar
      </button>
      <button
        type="button"
        onClick={() => {
          setTipo("");
          setMensagem("");
          setImageLinks([]);
          setProtocolo("");
          setUploadStatus("");
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
      >
        Limpar Formulário
      </button>

      {protocolo && <p>{protocolo}</p>}
    </form>
  );
}
