import { useState } from "react"; // Importa o hook useState para gerenciar o estado local no componente
import axios from "axios"; // Importa o Axios para fazer requisições HTTP

export default function SolicitarRedefinicaoSenha() {
  // Define dois estados: email para armazenar o e-mail inserido e mensagem para exibir uma mensagem de sucesso ou erro
  const [email, setEmail] = useState(""); // Estado para armazenar o valor do campo de e-mail
  const [mensagem, setMensagem] = useState(""); // Estado para armazenar a mensagem de retorno (sucesso ou erro)

  // Função que será chamada ao submeter o formulário
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
      {/* Formulário para solicitar redefinição de senha */}
      <form onSubmit={handleSubmit}>
        <label>Digite seu Email:</label>
        {/* Campo de input para o usuário inserir o e-mail. 
            O valor do input está vinculado ao estado 'email', e o 'onChange' atualiza esse estado a cada alteração. */}
        <input
          type="email" // Define o tipo de input como e-mail
          value={email} // Valor controlado pelo estado 'email'
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email' sempre que o usuário digita algo
          required // Campo obrigatório
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Enviar</button>
      </form>
      {/* Exibe a mensagem de sucesso ou erro, se houver */}
      {mensagem && <p>{mensagem}</p>}{" "}
      {/* Só exibe o parágrafo se a mensagem não estiver vazia */}
    </div>
  );
};