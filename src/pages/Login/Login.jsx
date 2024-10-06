import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null); // Estado para armazenar erros, se houver
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Requisição para o backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          senha,
        }
      );

      // Se a autenticação for bem-sucedida, armazenar o token no localStorage
      localStorage.setItem("token", response.data.token);

      // Redirecionar o usuário autenticado
      navigate("/dashboard/dashboardHome");
    } catch (error) {
      // Exibir mensagem de erro vinda do backend (se disponível)
      // Se ocorrer um erro (como credenciais inválidas)
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao tentar fazer login. Verifique seu e-mail e senha e tente novamente.";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <main>
      <h1>Login</h1>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <input
          className="LoginInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="LoginInput"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        <button className="ButtonTotal" type="submit">
          Entrar
        </button>
        <Link to="/solicitar-redefinicao-senha">Esqueceu sua senha?</Link>
      </form>
    </main>
  );
}
