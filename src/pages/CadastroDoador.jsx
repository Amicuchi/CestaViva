import { useState } from 'react';

function CadastroDoador() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para envio do cadastro
        alert('Cadastro realizado com sucesso!');
    };

    return (
        <main>
            <h1>Cadastro de Doador</h1>
            <form className='CDForm' onSubmit={handleSubmit}>
                <input type="text" className='CDInput' id="CDNome" name="CDNome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="email" className='CDInput' id="CDEmail" name="CDEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className='CDInput' id="CDSenha" name="CDSenha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <input type="password" className='CDInput' id="CDConfirmaSenha" name="CDConfirmaSenha" placeholder="Confirme sua Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required />
                <button type="submit" className="ButtonTotal">Cadastrar</button>
            </form>
        </main>
    );
}

export default CadastroDoador;
