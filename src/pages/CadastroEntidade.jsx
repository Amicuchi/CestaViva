import { useState } from 'react';
import '../styles/CadastroEntidade.css'
import ModalTermo from '../components/ModalTermo';

function CadastroEntidade() {
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [enderecoRua, setEnderecoRua] = useState('');
    const [enderecoNum, setEnderecoNum] = useState('');
    const [enderecoComp, setEnderecoComp] = useState('');
    const [enderecoBairro, setEnderecoBairro] = useState('');
    const [enderecoCidade, setEnderecoCidade] = useState('');
    const [enderecoEstado, setEnderecoEstado] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);    // Controla o modal
    const handleOpen = () => setOpen(true);     // Abre o modal
    const handleClose = () => setOpen(false);   // Fecha o modal

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se os termos foram aceitos
        if (!acceptedTerms) {
            setError("A leitura, conhecimento e consentimento com o termo é obrigatório.");
            return;
        }

        setError("");   // Limpa a mensagem de erro caso o checkbox esteja marcado
        // Prossegue com o cadastro
        console.log("Cadastro concluído com sucesso!");
    };

    return (
        <main className='CEContainer'>
            <h1>Cadastro de Entidade</h1>
            <form className="CEForm" onSubmit={handleSubmit}>

                <input className='CEInput' type="text" name="CNPJ" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                <input className='CEInput' type="text" name="RazaoSocial" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} required />
                <input className='CEInput' type="text" name="NomeFantasia" placeholder="Nome Fantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                <input className='CEInput' type="text" name="EnderecoRua" placeholder="Logradouro (Rua, Av, Travessa, etc" value={enderecoRua} onChange={(e) => setEnderecoRua(e.target.value)} required />
                <input className='CEInput' type="text" name="EnderecoNum" placeholder="Número" value={enderecoNum} onChange={(e) => setEnderecoNum(e.target.value)} required />
                <input className='CEInput' type="text" name="EnderecoComp" placeholder="Complemento" value={enderecoComp} onChange={(e) => setEnderecoComp(e.target.value)} required />
                <input className='CEInput' type="text" name="EnderecoBairro" placeholder="Bairro" value={enderecoBairro} onChange={(e) => setEnderecoBairro(e.target.value)} required />
                <input className='CEInput' type="text" name="EnderecoCidade" placeholder="Cidade" value={enderecoCidade} onChange={(e) => setEnderecoCidade(e.target.value)} required />
                <input className='CEInput' type="text" name="EnderecoEstado" placeholder="Estado" value={enderecoEstado} onChange={(e) => setEnderecoEstado(e.target.value)} required />
                <input className='CEInput' type="email" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='CEInput' type="text" name="Responsavel" placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} required />
                <input className='CEInput' type="text" name="Telefone" placeholder="Telefone do Responsável" value={telefoneResponsavel} onChange={(e) => setTelefoneResponsavel(e.target.value)} />
                <input className='CEInput' type="password" name="Senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <input className='CEInput' type="password" name="ConfirmeSenha" placeholder="Confirme sua Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} required />

                <div className='CEInput' name='termo'>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <label htmlFor="terms">
                        Eu li e aceito os <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleOpen}>termos de uso</span>
                    </label>
                </div>

            {error && <p style={{ color: "red" }} className="errorMessage">{error}</p>}

            <button className="ButtonTotal" type="submit" name="CEbutton">Cadastrar</button>
        </form>

        <ModalTermo open={open} handleClose={handleClose} />
        
        </main >
    );
}

export default CadastroEntidade;
