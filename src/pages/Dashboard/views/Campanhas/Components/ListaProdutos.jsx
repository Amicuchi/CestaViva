import { useState, useEffect } from 'react';

export default function ListaProdutos() {
    // Estado para armazenar os produtos cadastrados
    const [produtos, setProdutos] = useState(() => {
        // Carrega os dados do localStorage apenas uma vez, quando o componente é montado
        const produtosSalvos = localStorage.getItem('produtos');
        return produtosSalvos ? JSON.parse(produtosSalvos) : [];
    });

    const [quantidadeBaixa, setQuantidadeBaixa] = useState({}); // Quantidade a ser recebida para cada produto
    
    // useEffect para atualizar o localStorage sempre que o estado de produtos for alterado
    useEffect(() => {
        // Armazena a lista de produtos no localStorage sempre que houver uma alteração
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }, [produtos]);

    // Função para lidar com a alteração no campo de quantidade (input) para dar baixa
    const handleQuantidadeBaixaChange = (e, index) => {
        const { value } = e.target;

        // Atualiza a quantidade a ser recebida para o produto no índice correspondente
        setQuantidadeBaixa((prevState) => ({
            ...prevState,
            [index]: value, // Atualiza a quantidade específica do produto selecionado
        }));
    };

    // Função que realiza a ação de dar baixa no estoque de um produto
    const darBaixa = (index) => {
        // Converte a quantidade informada para número, ou define 1 se estiver vazia
        const qtdBaixa = parseInt(quantidadeBaixa[index] || 1, 10); // Quantidade a ser recebida, convertida para número
        const updatedProdutos = [...produtos];  // Cria uma cópia do estado atual de produtos para evitar mutação direta
        const produto = updatedProdutos[index]; // Seleciona o produto pelo índice
        const restante = produto.quantidade - produto.recebido; // Calcula o restante que falta receber

        // Verifica se a quantidade a ser recebida é válida
        if (qtdBaixa > 0 && qtdBaixa <= restante) {
            produto.recebido += qtdBaixa; // Atualiza a quantidade recebida do produto
            setProdutos(updatedProdutos); // Atualiza o estado com os produtos modificados

            // Limpa o campo de quantidade a ser dada baixa para o produto após o recebimento
            setQuantidadeBaixa((prevState) => ({
                ...prevState,
                [index]: '', // Limpa o campo de input da quantidade
            }));
        } else {
            alert('Quantidade inválida para dar baixa.');
        }
    };    

    return (
        <div className="lista-produtos">
            <h3>Lista de alimentos necessários</h3>
            {produtos.length === 0 ? (
                <p>Nenhum produto adicionado ainda.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Campanha</th>
                            <th>Produto</th>
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
                                    <td>{produto.campanha}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{produto.recebido}</td>
                                    <td>{restante}</td>
                                    <td>
                                        {restante > 0 ? (
                                            <>
                                                <input
                                                    className={`btnQtd inputQtd ${quantidadeBaixa[index] > restante ? 'input-error' : ''}`}
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
                                                    // Desabilita o botão se a quantidade informada for inválida
                                                    disabled={quantidadeBaixa[index] > restante || quantidadeBaixa[index] <= 0}
                                                >
                                                    Receber
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
    );
};
