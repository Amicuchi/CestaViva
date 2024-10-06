import { useState } from "react";
import axios from "axios";

export default function SolicitarRedefinicaoSenha() {
  const [email, setEmail] = useState("");       // Estado para armazenar o valor do campo de e-mail
  const [mensagem, setMensagem] = useState(""); // Estado para armazenar a mensagem de retorno (sucesso ou erro)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que o formulário recarregue a página ao ser enviado

    try {
      // Faz a requisição para o endpoint do backend que lida com a solicitação de redefinição de senha
      const response = await axios.post(
        "http://localhost:3000/auth/solicitar-redefinicao-senha",
        { email }
      );

      // Se a requisição for bem-sucedida, a mensagem de sucesso do backend será exibida no frontend
      setMensagem(response.data.msg); // Define a mensagem de sucesso no estado 'mensagem'
    } catch (error) {
      // Se houver um erro na requisição (ex: falha na conexão ou erro no servidor), exibe uma mensagem genérica de erro
      setMensagem(
        `Erro ao solicitar redefinição de senha. Tente novamente. ${error}`
      );
    }
  };

  return (
    <div>
      <h2>Solicitar Redefinição de Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Digite seu Email:</label>
        <input
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}{" "}
    </div>
  );
};