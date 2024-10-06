import { useState } from "react";
import { useParams } from "react-router-dom"; // Hook para obter parâmetros da URL
import axios from "axios";

export default function RedefinirSenha() {
  // Definindo estados para armazenar a nova senha, confirmação da senha e a mensagem de feedback
  const [novaSenha, setSenha] = useState(""); // Armazena a nova senha
  const [confirmarSenha, setConfirmarSenha] = useState(""); // Armazena a confirmação da nova senha
  const [mensagem, setMensagem] = useState(""); // Armazena uma mensagem de feedback (erro ou sucesso)

  // Pega o token da URL utilizando o hook useParams do React Router
  const { token } = useParams();

  // Função que será chamada quando o formulário for enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    // Verifica se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem"); // Define uma mensagem de erro se as senhas forem diferentes
      return; // Interrompe o fluxo se houver erro
    }

    try {
      // Faz uma requisição POST para o backend enviando a nova senha e o token para verificação
      const response = await axios.post(
        "http://localhost:3000/auth/redefinir-senha",
        { token, novaSenha }
      );

      // Se a requisição for bem-sucedida, exibe a mensagem retornada pelo backend
      setMensagem(response.data.msg); // Define a mensagem de sucesso
    } catch (error) {
      // Se houver algum erro (ex: falha na requisição ou token inválido), exibe uma mensagem genérica de erro
      setMensagem(`Erro ao redefinir a senha. Tente novamente. ${error}`);
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <label>Confirmar Nova Senha:</label>
        <input
          type="password" 
          value={confirmarSenha} 
          onChange={(e) => setConfirmarSenha(e.target.value)} 
          required 
        />
        {mensagem && <p>{mensagem}</p>}{" "}
        
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};