import { useState } from "react";

export default function CestaCompleta() {

    const [campanhas, setCampanhas] = useState([]); // Estado para armazenar a lista de campanhas cadastradas

    // Estados para a cesta completa
    const [cestaCompleta, setCestaCompleta] = useState([]); // Lista de itens que compõem a cesta completa
    const [novoItemCesta, setNovoItemCesta] = useState({ nome: '', quantidade: '', campanha: '' }); // Dados do novo item a ser adicionado à cesta completa

    // Função para adicionar um novo item à cesta completa
    const adicionarItemCesta = (e) => {
        e.preventDefault();
        const { nome, quantidade, campanha } = novoItemCesta;
        if (!nome || !quantidade || !campanha || quantidade <= 0) {
            alert("Preencha todos os campos corretamente!");
            return;
        }
        // Apenas adiciona o item se todos os campos estiverem preenchidos e a quantidade for maior que 0
        setCestaCompleta([...cestaCompleta, novoItemCesta]); // Adiciona o novo item à lista de cesta completa
        setNovoItemCesta({ nome: '', quantidade: '', campanha: '' }); // Reseta o formulário
    };

    // Função para editar item da cesta completa
    const editarItem = (index) => {
        const item = cestaCompleta[index];
        const nome = prompt('Editar nome do produto:', item.nome);        // Prompt para editar o nome
        const quantidade = prompt('Editar quantidade:', item.quantidade); // Prompt para editar a quantidade
        const campanha = prompt('Editar campanha:', item.campanha);       // Prompt para editar a campanha

        if (nome && quantidade > 0 && campanha) {
            const updatedCesta = [...cestaCompleta]; // Apenas atualiza se os valores são válidos
            updatedCesta[index] = { nome, quantidade, campanha }; // Atualiza o item na lista
            setCestaCompleta(updatedCesta); // Atualiza a lista de cesta completa
        }
    };

    // Função para excluir item da cesta completa
    const excluirItem = (index) => {
        setCestaCompleta(cestaCompleta.filter((_, i) => i !== index)); // Remove o item da lista
    };

    return (
        <>
            {/* Seção de cadastro de itens para a cesta completa */}
            <div className="card--container">
                <h2>Cesta Completa</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={adicionarItemCesta}>
                            <h3>Cadastro do produto</h3>
                            <select
                                className='form--span'
                                name="campanha"
                                value={novoItemCesta.campanha}
                                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, campanha: e.target.value })}
                            >
                                <option value="">Selecione uma campanha</option>
                                {campanhas.map((campanha, index) => (
                                    <option key={index} value={campanha.nomeCampanha}>
                                        {campanha.nomeCampanha}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome do produto"
                                value={novoItemCesta.nome}
                                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, nome: e.target.value })}
                            />
                            <input
                                type="number"
                                name="quantidade"
                                placeholder="Qtd na cesta"
                                value={novoItemCesta.quantidade}
                                onChange={(e) => setNovoItemCesta({ ...novoItemCesta, quantidade: e.target.value })}
                            />
                            <button type="submit">Adicionar à Cesta Completa</button>
                        </form>
                    </div>

                    {/* Seção de lista de itens da cesta completa */}
                    <div className="lista-produtos">
                        <h3>Composição da Cesta Completa</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Campanha</th>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cestaCompleta.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">Nenhum item na cesta completa ainda.</td>
                                    </tr>
                                ) : (
                                    cestaCompleta.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.campanha}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>
                                                <button
                                                    className='btnQtd'
                                                    onClick={() => editarItem(index)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className='btnQtd left'
                                                    onClick={() => excluirItem(index)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};