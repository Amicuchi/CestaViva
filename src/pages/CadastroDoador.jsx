import { useState } from 'react';

function CadastroDoador() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para envio do cadastro
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <div>
            <h2>Cadastro de Doador</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroDoador;
