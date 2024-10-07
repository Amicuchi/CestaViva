import { useState } from "react";
import axios from "../../services/axiosConfig";
import ModalTermo from "./components/ModalTermo";
import "./CadastroEntidade.css";

export default function CadastroEntidade() {
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoNum, setEnderecoNum] = useState("");
  const [enderecoComp, setEnderecoComp] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoEstado, setEnderecoEstado] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [telefoneResponsavel, setTelefoneResponsavel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Adicionando um estado para mensagens de sucesso

  const [open, setOpen] = useState(false); // Controla o modal
  const handleOpen = () => setOpen(true); // Abre o modal
  const handleClose = () => setOpen(false); // Fecha o modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (senha !== senha2) {
      setError("As senhas não coincidem.");
      return;
    }

    // Verifica se os termos foram aceitos
    if (!acceptedTerms) {
      setError(
        "A leitura, conhecimento e consentimento com o termo é obrigatório."
      );
      return;
    }

    setError(""); // Limpa a mensagem de erro caso o checkbox esteja marcado

    try {
      // Fazendo a requisição para o backend
      const response = await axios.post("/entidades", {
        cnpj,
        razaoSocial,
        nomeFantasia,
        endereco: enderecoRua,
        numero: enderecoNum,
        complemento: enderecoComp,
        bairro: enderecoBairro,
        cidade: enderecoCidade,
        estado: enderecoEstado,
        cep: enderecoCep,
        telefone: telefoneResponsavel,
        
        // Definir o objeto usuario com os dados de email e senha
        usuario: {
          nome: nomeResponsavel,
          email,
          senha,
        },
      });

      // Verifica se o cadastro foi bem-sucedido
      if (response.status === 201) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        // Limpa os campos após o sucesso
        setCnpj("");
        setRazaoSocial("");
        setNomeFantasia("");
        setEnderecoRua("");
        setEnderecoNum("");
        setEnderecoComp("");
        setEnderecoBairro("");
        setEnderecoCidade("");
        setEnderecoEstado("");
        setEnderecoCep("");
        setNomeResponsavel("");
        setTelefoneResponsavel("");
        setEmail("");
        setSenha("");
        setSenha2("");
        setAcceptedTerms(false);
      }
    } catch (error) {
      // Exibir informações detalhadas do erro no frontend caso a requisição falhe
      if (error.response) {
        console.error("Erro no backend:", error.response.data); // Exibe a mensagem de erro no console
        setError(
          error.response.data.message ||
            "Erro ao realizar o cadastro. Tente novamente."
        ); // Exibe a mensagem do backend
      } else if (error.request) {
        console.error("Nenhuma resposta recebida do backend:", error.request);
        setError("Erro de conexão com o servidor. Tente novamente mais tarde.");
      } else {
        console.error("Erro desconhecido:", error.message);
        setError("Ocorreu um erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <main className="CEContainer">
      <h1>Cadastro de Entidade</h1>
      <form className="CEForm" onSubmit={handleSubmit}>
        <input
          className="CEInput"
          type="text"
          name="CNPJ"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="RazaoSocial"
          placeholder="Razão Social"
          value={razaoSocial}
          onChange={(e) => setRazaoSocial(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="NomeFantasia"
          placeholder="Nome Fantasia"
          value={nomeFantasia}
          onChange={(e) => setNomeFantasia(e.target.value)}
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoRua"
          placeholder="Logradouro (Rua, Av, Travessa, etc"
          value={enderecoRua}
          onChange={(e) => setEnderecoRua(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoNum"
          placeholder="Número"
          value={enderecoNum}
          onChange={(e) => setEnderecoNum(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoComp"
          placeholder="Complemento"
          value={enderecoComp}
          onChange={(e) => setEnderecoComp(e.target.value)}
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoBairro"
          placeholder="Bairro"
          value={enderecoBairro}
          onChange={(e) => setEnderecoBairro(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoCidade"
          placeholder="Cidade"
          value={enderecoCidade}
          onChange={(e) => setEnderecoCidade(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoEstado"
          placeholder="Estado"
          value={enderecoEstado}
          onChange={(e) => setEnderecoEstado(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="EnderecoCep"
          placeholder="CEP"
          value={enderecoCep}
          onChange={(e) => setEnderecoCep(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="email"
          name="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="Responsavel"
          placeholder="Nome do Responsável"
          value={nomeResponsavel}
          onChange={(e) => setNomeResponsavel(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="text"
          name="Telefone"
          placeholder="Telefone do Responsável"
          value={telefoneResponsavel}
          onChange={(e) => setTelefoneResponsavel(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="password"
          name="Senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          className="CEInput"
          type="password"
          name="ConfirmeSenha"
          placeholder="Confirme sua Senha"
          value={senha2}
          onChange={(e) => setSenha2(e.target.value)}
          required
        />
        {error && (
          <p style={{ color: "red" }} className="errorMessage">
            {error}
          </p>
        )}
        <div className="CEInput termo-checkbox" name="termo">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
          />
          <label htmlFor="terms">
            Eu li e aceito os{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleOpen}
            >
              termos de uso
            </span>
          </label>
        </div>
        {successMessage && (
          <p style={{ color: "green" }} className="successMessage">
            {successMessage}
          </p>
        )}{" "}
        {/* Mensagem de sucesso */}
        <button className="ButtonTotal" type="submit" name="CEbutton">
          Cadastrar
        </button>
      </form>

      <ModalTermo open={open} handleClose={handleClose} />
    </main>
  );
}
