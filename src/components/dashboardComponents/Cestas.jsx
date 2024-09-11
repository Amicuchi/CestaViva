import { useState } from 'react';

export default function Cestas() {
    // Estados para armazenar dados relacionados a produtos e cestas
    const [produtos, setProdutos] = useState([]); // Lista de produtos cadastrados
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', categoria: '' }); // Dados do novo produto a ser adicionado
    const [quantidadeBaixa, setQuantidadeBaixa] = useState({}); // Quantidade a ser dada baixa para cada produto
    const [cestaCompleta, setCestaCompleta] = useState([]); // Lista de itens que compõem a cesta completa
    const [novoItemCesta, setNovoItemCesta] = useState({ nome: '', quantidade: '', categoria: '' }); // Dados do novo item a ser adicionado à cesta completa

    // Função para lidar com a mudança de valores nos campos de entrada do formulário de produto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para lidar com a mudança de valor na quantidade a ser dada baixa para cada produto
    const handleQuantidadeBaixaChange = (e, index) => {
        const { value } = e.target;
        setQuantidadeBaixa((prevState) => ({
            ...prevState,
            [index]: value,
        }));
    };

    // Função para adicionar um novo produto à lista de produtos
    const adicionarProduto = (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        if (novoProduto.nome && novoProduto.quantidade > 0 && novoProduto.categoria) {
            // Apenas adiciona o produto se todos os campos estiverem preenchidos e a quantidade for maior que 0
            setProdutos([...produtos, { ...novoProduto, recebido: 0 }]); // Adiciona o novo produto à lista
            setNovoProduto({ nome: '', quantidade: '', categoria: '' }); // Reseta o formulário
        }
    };

    // Função para adicionar um novo item à cesta completa
    const adicionarItemCesta = (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        if (novoItemCesta.nome && novoItemCesta.quantidade > 0 && novoItemCesta.categoria) {
            // Apenas adiciona o item se todos os campos estiverem preenchidos e a quantidade for maior que 0
            setCestaCompleta([...cestaCompleta, { ...novoItemCesta }]); // Adiciona o novo item à lista de cesta completa
            setNovoItemCesta({ nome: '', quantidade: '', categoria: '' }); // Reseta o formulário
        }
    };

    // Função para dar baixa na quantidade de um produto
    const darBaixa = (index) => {
        const qtdBaixa = parseInt(quantidadeBaixa[index] || 1, 10); // Quantidade a ser dada baixa, convertida para número
        const updatedProdutos = [...produtos]; // Clona a lista de produtos
        const produto = updatedProdutos[index];
        const restante = produto.quantidade - produto.recebido; // Calcula a quantidade restante

        if (qtdBaixa > 0 && qtdBaixa <= restante) {
            // Verifica se a quantidade a ser dada baixa é válida
            produto.recebido += qtdBaixa; // Atualiza a quantidade recebida do produto
            setProdutos(updatedProdutos); // Atualiza a lista de produtos
            setQuantidadeBaixa((prevState) => ({
                ...prevState,
                [index]: '', // Limpa o campo de quantidade a ser dada baixa
            }));
        } else {
            alert('Quantidade inválida para dar baixa.'); // Exibe uma mensagem de erro se a quantidade for inválida
        }
    };

    // Função para editar um item da cesta completa
    const editarItem = (index) => {
        const item = cestaCompleta[index];
        const nome = prompt('Editar nome do produto:', item.nome); // Prompt para editar o nome
        const quantidade = prompt('Editar quantidade:', item.quantidade); // Prompt para editar a quantidade
        const categoria = prompt('Editar categoria:', item.categoria); // Prompt para editar a categoria

        if (nome && quantidade > 0 && categoria) {
            // Apenas atualiza se os valores são válidos
            const updatedCesta = [...cestaCompleta];
            updatedCesta[index] = { nome, quantidade, categoria }; // Atualiza o item na lista
            setCestaCompleta(updatedCesta); // Atualiza a lista de cesta completa
        }
    };

    // Função para excluir um item da cesta completa
    const excluirItem = (index) => {
        const updatedCesta = cestaCompleta.filter((_, i) => i !== index); // Remove o item da lista
        setCestaCompleta(updatedCesta); // Atualiza a lista de cesta completa
    };

    return (
        <>
            <div className="card--container">
                {/* Seção de cadastro de produtos */}
                <h2>Alimentos Necessários</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={adicionarProduto}>
                            <h3>Cadastro do produto</h3>
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
                            {/* <input
                                type="text"
                                name="categoria"
                                placeholder="Categoria"
                                value={novoProduto.categoria}
                                onChange={handleInputChange}
                            /> */}
                            <button type="submit">Adicionar Produto</button>
                        </form>

                    </div>

                    <div className="lista-produtos">
                        {/* Seção de lista de produtos cadastrados */}
                        <h3>Lista de alimentos necessários</h3>
                        {produtos.length === 0 ? (
                            <p>Nenhum produto adicionado ainda.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Quantidade <br /> Necessária</th>
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
                                                                className='btnQtd inputQtd'
                                                                type="number"
                                                                value={quantidadeBaixa[index] || ''}
                                                                min="1"
                                                                max={restante}
                                                                placeholder="Qtd"
                                                                onChange={(e) => handleQuantidadeBaixaChange(e, index)}
                                                            />
                                                            <button
                                                                className='btnQtd'
                                                                onClick={() => darBaixa(index)}
                                                            >
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
                </div>
            </div>

            {/* Seção de cadastro de itens para a cesta completa */}
            <div className="card--container lastOne">
                <h2>Cesta Completa</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={adicionarItemCesta}>
                            <h3>Cadastro do produto</h3>
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

                    {/* Seção de lista de itens da cesta completa */}
                    <div className="lista-produtos">
                        <h3>Composição da Cesta Completa</h3>
                        {cestaCompleta.length === 0 ? (
                            <p>Nenhum item na cesta completa ainda.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Quantidade <br /> Necessária</th>
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
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
