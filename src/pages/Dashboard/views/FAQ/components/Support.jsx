import { useState, useRef } from 'react';
import axios from 'axios';

export default function Suporte() {
    const [tipo, setTipo] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [arquivos, setArquivos] = useState([]);
    const [protocolo, setProtocolo] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    const handleFileChange = (e) => {
        setArquivos([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('tipo', tipo);
            formData.append('mensagem', mensagem);
            arquivos.forEach((file) => formData.append('arquivos', file));

            const response = await axios.post('/api/suporte', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setProtocolo(response.data.protocolo);
            alert(`Ticket enviado com sucesso! Protocolo: ${response.data.protocolo}`);
        } catch (error) {
            setErro(`Falha ao enviar o ticket. Tente novamente. Erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    const fileInputRef = useRef(null);
    const handleClear = () => {
        setTipo('');
        setMensagem('');
        setArquivos([]);
        setProtocolo('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="card--container lastOne">
            <form onSubmit={handleSubmit} className='form--support'>
            <h2>Contato com o Suporte</h2>
            <p>Aqui você pode enviar imagens, arquivos e texto para o suporte, de maneira que possa abrir fazer uma solicitação para incluir, excluir ou alterar qualquer informação sobre a entidade.</p>
            <hr />
                <span className='form--span'>
                    <label className='UserLabel'>Tipo de Solicitação:</label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="duvida">Dúvida</option>
                        <option value="dificuldade">Dificuldade</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="comentario">Comentário</option>
                        <option value="alteracao_entidade">Alteração de dados da Entidade</option>
                        <option value="alteracao_responsavel">Alteração de dados do Responsável</option>
                        <option value="alteracao_usuario">Alteração de dados do Voluntário</option>
                    </select>
                </span>

                <div>
                    <label className='UserLabel'>Mensagem:</label>
                    <textarea value={mensagem} onChange={(e) => setMensagem(e.target.value)} required />
                </div>

                <div>
                    <label className='UserLabel'>Enviar Arquivos:</label>
                    <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
                </div>

                {loading ? <p>Enviando...</p> : null}
                {erro ? <p className='errorMessage'>{erro}</p> : null}

                <span className='form--span'>
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        Enviar
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                    >
                        Limpar Formulário
                    </button>
                </span>
            </form>

            {protocolo && <p>Protocolo: {protocolo}</p>}
        </div>
    );
};