import { useState } from 'react';

export default function Cestas() {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', categoria: '' });
    const [quantidadeBaixa, setQuantidadeBaixa] = useState({});
    const [cestaCompleta, setCestaCompleta] = useState([]);
    const [novoItemCesta, setNovoItemCesta] = useState({ nome: '', quantidade: '' });

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

    const adicionarProduto = () => {
        if (novoProduto.nome && novoProduto.quantidade > 0 && novoProduto.categoria) {
            setProdutos([...produtos, { ...novoProduto, recebido: 0 }]);
            setNovoProduto({ nome: '', quantidade: '', categoria: '' });
        }
    };

    const adicionarItemCesta = () => {
        if (novoItemCesta.nome && novoItemCesta.quantidade > 0) {
            setCestaCompleta([...cestaCompleta, { ...novoItemCesta }]);
            setNovoItemCesta({ nome: '', quantidade: '' });
        }
    };

    const darBaixa = (index) => {
        const qtdBaixa = parseInt(quantidadeBaixa[index] || 1, 10);
        const updatedProdutos = [...produtos];
        const restante = updatedProdutos[index].quantidade - updatedProdutos[index].recebido;

        if (qtdBaixa > 0 && qtdBaixa <= restante) {
            updatedProdutos[index].recebido += qtdBaixa;
            setProdutos(updatedProdutos);
            setQuantidadeBaixa((prevState) => ({
                ...prevState,
                [index]: '', // Limpar o campo após a baixa
            }));
        } else {
            alert('Quantidade inválida para dar baixa.');
        }
    };

    return (
        <>
            <div className="cestas--cadastroProduto">
                <h2>Cestas de Alimentos</h2>
                <form className="form-container">
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
                    <button onClick={adicionarProduto}>Adicionar Produto</button>
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
                <form className="form-container">
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
                    <button onClick={adicionarItemCesta}>Adicionar à Cesta Completa</button>
                </form>
            </div>

            <div>
                <h2>Composição da Cesta Completa</h2>
                <table className="card--container lista-cesta-completa">
                    {cestaCompleta.length === 0 ? (
                        <p>Nenhum item na cesta completa ainda.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Quantidade Necessária</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cestaCompleta.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.quantidade}</td>
                                        <td>
                                            <button onClick={() => editarItem(index)}>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    )}
                </table>
            </div>
        </>
    );
}