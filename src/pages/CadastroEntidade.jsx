import { useState } from 'react';
import '../styles/CadastroEntidade.css'

function CadastroEntidade() {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para envio do cadastro
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <main className='CEContainer'>
            <h1>Cadastro de Entidade</h1>
            <form className="CEForm" onSubmit={handleSubmit}>
                <input className='CEInput' type="text" name="CNPJ" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                <input className='CEInput' type="text" name="RazaoSocial" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required />
                <input className='CEInput' type="text" name="NomeFantasia" placeholder="Nome Fantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                <input className='CEInput' type="text" name="Endereco" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                <input className='CEInput' type="email" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='CEInput' type="text" name="Responsavel" placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} required />
                <input className='CEInput' type="text" name="Telefone" placeholder="Telefone do Responsável" value={telefoneResponsavel} onChange={(e) => setTelefoneResponsavel(e.target.value)} />
                <input className='CEInput' type="password" name="Senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <input className='CEInput' type="password" name="ConfirmeSenha" placeholder="Confirme sua Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required />
                <button className="ButtonTotal" type="submit" name="CEbutton">Cadastrar</button>
            </form>
        </main>
    );
}

export default CadastroEntidade;
