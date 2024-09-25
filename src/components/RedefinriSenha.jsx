import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Hook para obter parâmetros da URL

const RedefinirSenha = () => {
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
      {/* Formulário para o usuário inserir a nova senha */}
      <form onSubmit={handleSubmit}>
        {/* Campo para o usuário inserir a nova senha */}
        <label>Nova Senha:</label>
        <input
          type="password" // Define o tipo como "password" para esconder os caracteres inseridos
          value={novaSenha} // Valor controlado pelo estado 'senha'
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado 'senha' sempre que o usuário digita
          required // Define que o campo é obrigatório
        />

        {/* Campo para confirmar a nova senha */}
        <label>Confirmar Nova Senha:</label>
        <input
          type="password" // Campo de senha
          value={confirmarSenha} // Valor controlado pelo estado 'confirmarSenha'
          onChange={(e) => setConfirmarSenha(e.target.value)} // Atualiza o estado 'confirmarSenha' ao digitar
          required // Campo obrigatório
        />

        {/* Botão para enviar o formulário */}
        <button type="submit">Redefinir Senha</button>
      </form>
      {/* Exibe a mensagem de sucesso ou erro, caso exista */}
      {mensagem && <p>{mensagem}</p>}{" "}
      {/* Só renderiza o parágrafo se houver uma mensagem */}
    </div>
  );
};

export default RedefinirSenha;
