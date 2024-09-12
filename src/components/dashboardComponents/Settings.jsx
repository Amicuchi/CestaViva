import { useState } from 'react';
// Atual
export default function Settings() {
    // Estado para armazenar as campanhas cadastradas
    const [campanhas, setCampanhas] = useState([]); // Inicialmente, a lista de campanhas está vazia
    const [novaCampanha, setNovaCampanha] = useState({ nome: '', inicio: '', termino: '' }); // Estado para os dados da nova campanha

    // Função para lidar com a mudança de valores nos campos de entrada da nova campanha
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaCampanha((prevState) => ({
            ...prevState,
            [name]: value, // Atualiza o campo que sofreu alteração
        }));
    };

    // Função para adicionar uma nova campanha
    const adicionarCampanha = (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        const { nome, inicio, termino } = novaCampanha;
        
        // Verifica se os campos estão preenchidos
        if (nome && inicio && termino) {
            setCampanhas([...campanhas, novaCampanha]); // Adiciona a nova campanha à lista
            setNovaCampanha({ nome: '', inicio: '', termino: '' }); // Reseta os campos do formulário
        } else {
            alert('Preencha todos os campos antes de adicionar uma campanha.'); // Exibe um alerta se os campos não estiverem preenchidos
        }
    };

    // Função para editar uma campanha existente
    const editarCampanha = (index) => {
        const campanha = campanhas[index];
        const nome = prompt('Editar nome da campanha:', campanha.nome); // Prompt para editar o nome
        const inicio = prompt('Editar data de início (DD/MM/AAAA):', campanha.inicio); // Prompt para editar a data de início
        const termino = prompt('Editar data de término (DD/MM/AAAA):', campanha.termino); // Prompt para editar a data de término

        if (nome && inicio && termino) {
            const updatedCampanhas = [...campanhas];
            updatedCampanhas[index] = { nome, inicio, termino }; // Atualiza a campanha
            setCampanhas(updatedCampanhas); // Atualiza a lista de campanhas
        }
    };

    // Função para excluir uma campanha
    const excluirCampanha = (index) => {
        const updatedCampanhas = campanhas.filter((_, i) => i !== index); // Remove a campanha pelo índice
        setCampanhas(updatedCampanhas); // Atualiza a lista de campanhas
    };

    return (
        <div className="card--container">
            <h2>Configurações</h2>

            {/* Seção de cadastro de campanhas */}
            <div className="card--container lastOne">
                <h2>Campanhas</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={adicionarCampanha}>
                            <h3>Cadastro da Campanha</h3>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome da campanha"
                                value={novaCampanha.nome}
                                onChange={handleInputChange} // Chama a função para atualizar o estado
                            />
                            <input
                                type="text"
                                name="inicio"
                                placeholder="Data de Início (DD/MM/AAAA)"
                                value={novaCampanha.inicio}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="termino"
                                placeholder="Data de Término (DD/MM/AAAA)"
                                value={novaCampanha.termino}
                                onChange={handleInputChange}
                            />
                            <button type="submit">Adicionar Campanha</button>
                        </form>
                    </div>

                    {/* Seção da lista de campanhas cadastradas */}
                    <div className="lista-produtos">
                        <h3>Campanhas cadastradas</h3>
                        {campanhas.length === 0 ? (
                            <p>Nenhuma campanha cadastrada até o momento.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome da campanha</th>
                                        <th>Começa em</th>
                                        <th>Termina em</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campanhas.map((campanha, index) => (
                                        <tr key={index}>
                                            <td>{campanha.nome}</td>
                                            <td>{campanha.inicio}</td>
                                            <td>{campanha.termino}</td>
                                            <td>
                                                <button
                                                    className='btnQtd'
                                                    onClick={() => editarCampanha(index)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className='btnQtd left'
                                                    onClick={() => excluirCampanha(index)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <p>Aqui, o usuário responsável pela entidade pode cadastrar até outros dois usuários para acessar o sistema e dar baixa ou acrescentar itens na cesta de alimentos.</p>
        </div>
    );
}
