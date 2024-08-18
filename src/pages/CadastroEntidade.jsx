import { useState } from 'react';

function CadastroEntidade() {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para envio do cadastro
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <div>
            <h2>Cadastro de Entidade</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                <input type="text" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required />
                <input type="text" placeholder="Nome Fantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} required />
                <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                <input type="text" placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroEntidade;
