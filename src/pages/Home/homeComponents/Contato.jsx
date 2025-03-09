import { useState } from "react";
import { IMaskInput } from "react-imask";
import "../Home.css";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "contatocestaviva@gmail.com",
          subject: `Contato visitante ${formData.nome}`,
          body: `Nome: ${formData.nome}\nTelefone: ${formData.telefone}\nEmail: ${formData.email}\nMensagem: ${formData.mensagem}`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Email enviado com sucesso!");
        setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
      } else {
        setStatus(`Erro ao enviar: ${data.msg}`);
      }
    } catch {
      setStatus("Erro ao conectar ao servidor.");
    }
  };

  return (
    <main className="contato--container lastOne">
      <h2>Deixe sua mensagem:</h2>
      <form className="ContatoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <IMaskInput
          name="telefone"
          mask="(00)00000-0000"
          placeholder="Telefone com DDD"
          value={formData.telefone}
          onAccept={(value) =>
            setFormData((prev) => ({ ...prev, telefone: value }))
          }
        />
        <textarea
          className="ContatoTextArea"
          name="mensagem"
          placeholder="Sua mensagem"
          value={formData.mensagem}
          onChange={handleChange}
        />
        <button className="ButtonTotal" name="contatoBtn" type="submit">
          Entrar em contato
        </button>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
}
