import { useState } from 'react';

export default function Cestas() {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', categoria: '' });
    const [quantidadeBaixa, setQuantidadeBaixa] = useState({});
    const [cestaCompleta, setCestaCompleta] = useState([]);
    const [novoItemCesta, setNovoItemCesta] = useState({ nome: '', quantidade: '', categoria: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleQuantidadeBaixaChange = (e, index) => {
        const { value } = e.target;
        setQuantidadeBaixa((prevState) => ({
            ...prevState,
            [index]: value,
        }));
    };

    const adicionarProduto = (e) => {
        e.preventDefault();
        if (novoProduto.nome && novoProduto.quantidade > 0 && novoProduto.categoria) {
            setProdutos([...produtos, { ...novoProduto, recebido: 0 }]);
            setNovoProduto({ nome: '', quantidade: '', categoria: '' });
        }
    };

    const adicionarItemCesta = (e) => {
        e.preventDefault();
        if (novoItemCesta.nome && novoItemCesta.quantidade > 0 && novoItemCesta.categoria) {
            setCestaCompleta([...cestaCompleta, { ...novoItemCesta }]);
            setNovoItemCesta({ nome: '', quantidade: '', categoria: '' });
        }
    };

    const darBaixa = (index) => {
        const qtdBaixa = parseInt(quantidadeBaixa[index] || 1, 10);
        const updatedProdutos = [...produtos];
        const produto = updatedProdutos[index];
        const restante = produto.quantidade - produto.recebido;

        if (qtdBaixa > 0 && qtdBaixa <= restante) {
            produto.recebido += qtdBaixa;
            setProdutos(updatedProdutos);
            setQuantidadeBaixa((prevState) => ({
                ...prevState,
                [index]: '', // Limpar o campo após a baixa
            }));
        } else {
            alert('Quantidade inválida para dar baixa.');
        }
    };

    const editarItem = (index) => {
        // Aqui você pode implementar a lógica para editar um item da cesta completa.
        const item = cestaCompleta[index];
        const nome = prompt('Editar nome do produto:', item.nome);
        const quantidade = prompt('Editar quantidade:', item.quantidade);
        const categoria = prompt('Editar categoria:', item.categoria);

        if (nome && quantidade > 0 && categoria) {
            const updatedCesta = [...cestaCompleta];
            updatedCesta[index] = { nome, quantidade, categoria };
            setCestaCompleta(updatedCesta);
        }
    };

    const excluirItem = (index) => {
        const updatedCesta = cestaCompleta.filter((_, i) => i !== index);
        setCestaCompleta(updatedCesta);
    };

    return (
        <>
            <div className="cestas--cadastroProduto">
                <h2>Cestas de Alimentos</h2>
                <form className="form-container" onSubmit={adicionarProduto}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do produto"
                        value={novoProduto.nome}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        value={novoProduto.quantidade}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        value={novoProduto.categoria}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Adicionar Produto</button>
                </form>
            </div>

            <div className="lista-produtos">
                {produtos.length === 0 ? (
                    <p>Nenhum produto adicionado ainda.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Quantidade Necessária</th>
                                <th>Recebido</th>
                                <th>Restante</th>
                                <th>Dar Baixa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto, index) => {
                                const restante = produto.quantidade - produto.recebido;
                                return (
                                    <tr key={index}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.categoria}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.recebido}</td>
                                        <td>{restante}</td>
                                        <td>
                                            {restante > 0 ? (
                                                <>
                                                    <input
                                                        type="number"
                                                        value={quantidadeBaixa[index] || ''}
                                                        min="1"
                                                        max={restante}
                                                        placeholder="Qtd"
                                                        onChange={(e) => handleQuantidadeBaixaChange(e, index)}
                                                    />
                                                    <button onClick={() => darBaixa(index)}>
                                                        Dar Baixa
                                                    </button>
                                                </>
                                            ) : (
                                                <span>Todos recebidos</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            <div>
                <h2>Cadastrar Cesta Completa</h2>
                <form className="form-container" onSubmit={adicionarItemCesta}>
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
                        placeholder="Quantidade"
                        value={novoItemCesta.quantidade}
                        onChange={(e) => setNovoItemCesta({ ...novoItemCesta, quantidade: e.target.value })}
                    />
                    <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        value={novoItemCesta.categoria}
                        onChange={(e) => setNovoItemCesta({ ...novoItemCesta, categoria: e.target.value })}
                    />
                    <button type="submit">Adicionar à Cesta Completa</button>
                </form>
            </div>

            <div>
                <h2>Composição da Cesta Completa</h2>
                {cestaCompleta.length === 0 ? (
                    <p>Nenhum item na cesta completa ainda.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Quantidade Necessária</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cestaCompleta.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nome}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.quantidade}</td>
                                    <td>
                                        <button onClick={() => editarItem(index)}>Editar</button>
                                        <button onClick={() => excluirItem(index)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
