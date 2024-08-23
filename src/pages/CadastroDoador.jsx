import '../styles/CadastroDoador.css'
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
        <div>
            <h2 className='TitleH2'>Cadastro de Doador</h2>
            <form className='CDForm' onSubmit={handleSubmit}>
                <input type="text" className='CDInput' id="CDNome" name="CDNome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="email" className='CDInput' id="CDEmail" name="CDEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" className='CDInput' id="CDSenha" name="CDSenha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <input type="password" className='CDInput' id="CDConfirmaSenha" name="CDConfirmaSenha" placeholder="Confirme sua Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required />
                <button type="submit" className="CDButton">Cadastrar</button>
            </form>
        </div>
    );
}

export default CadastroDoador;
