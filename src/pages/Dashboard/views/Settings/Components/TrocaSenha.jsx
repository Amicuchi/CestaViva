import { useState } from "react";
import api from "../../../../../services/axiosConfig";


export default function TrocaSenha() {

    // Estado para troca de senha
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    // Função para trocar senha
    const trocarSenha = async (e) => {
        e.preventDefault();
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            alert("Todos os campos de senha são obrigatórios!");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            alert("A nova senha e a confirmação não correspondem.");
            return;
        }

        try {
            await api.post("/usuario/trocarSenha", {
                senhaAtual,
                novaSenha,
            });
            alert("Senha alterada com sucesso!");
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");

        } catch (error) {
            console.error("Erro ao trocar senha:", error);
            alert("Erro ao trocar senha.");
        }
    };

    return (
        <div className="card--container lastOne">
            <form onSubmit={trocarSenha}>
                <h2>Troca de Senha</h2>
                <input
                    type="password"
                    placeholder="Senha atual"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <button type="submit">Alterar Senha</button>
            </form>
        </div>
    );
};