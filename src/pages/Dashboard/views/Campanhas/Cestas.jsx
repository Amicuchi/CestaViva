import { useState, useEffect } from 'react';
import api from "../../../../services/axiosConfig";

// atual
export default function Cestas() {
    const [produtos, setProdutos] = useState(() => {
        // Carrega os dados do localStorage apenas uma vez, quando o componente é montado
        const produtosSalvos = localStorage.getItem('produtos');
        return produtosSalvos ? JSON.parse(produtosSalvos) : [];
    });
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '', campanha: '' }); // Dados do novo produto a ser adicionado
    const [quantidadeBaixa, setQuantidadeBaixa] = useState({}); // Quantidade a ser recebida para cada produto
    const [campanhas, setCampanhas] = useState([]); // Estado para armazenar as campanhas

    // Função que salva os produtos no localStorage toda vez que o estado de produtos for atualizado
    useEffect(() => {
        localStorage.setItem('produtos', JSON.stringify(produtos)); // Converte a lista de produtos para string JSON e armazena no localStorage
    }, [produtos]); // A função será executada sempre que o estado de produtos mudar


    // Função para buscar campanhas cadastradas no backend
    const fetchCampanhas = async () => {
        try {
            const response = await api.get("/cestas"); // Rota para retornar as cestas (campanhas) da instituição logada
            setCampanhas(response.data); // Armazenando as campanhas no estado
        } catch (error) {
            console.error("Erro ao buscar campanhas:", error);
        }
    };

    // Carregar campanhas quando a página for carregada
    useEffect(() => {
        fetchCampanhas();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Obtém o nome do campo (name) e seu valor (value)
        setNovoProduto((prevState) => ({
            ...prevState,  // Mantém o estado atual do novoProduto
            [name]: value, // Atualiza o campo que foi modificado
        }));
    };

    // Função para lidar com a mudança de valor na quantidade a ser recebida para cada produto
    const handleQuantidadeBaixaChange = (e, index) => {
        const { value } = e.target;
        setQuantidadeBaixa((prevState) => ({
            ...prevState,
            [index]: value, // Atualiza a quantidade específica do produto selecionado
        }));
    };

    // Função para adicionar um novo produto à lista de produtos
    const adicionarProduto = (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        if (novoProduto.nome && novoProduto.quantidade > 0 && novoProduto.campanha) {
            // Valida se os campos estão preenchidos corretamente antes de adicionar o produto
            setProdutos([...produtos, { ...novoProduto, recebido: 0 }]); // Adiciona o novo produto à lista com quantidade recebida inicial de 0
            setNovoProduto({ nome: '', quantidade: '', campanha: '' });  // Reseta o formulário
        }
    };

    // Função para dar baixa na quantidade de um produto
    const darBaixa = (index) => {
        const qtdBaixa = parseInt(quantidadeBaixa[index] || 1, 10); // Quantidade a ser recebida, convertida para número
        const updatedProdutos = [...produtos]; // Cria uma cópia da lista de produtos
        const produto = updatedProdutos[index]; // Obtém o produto específico baseado no índice
        const restante = produto.quantidade - produto.recebido; // Calcula a quantidade restante

        if (qtdBaixa > 0 && qtdBaixa <= restante) {
            // Verifica se a quantidade a ser recebida é válida
            produto.recebido += qtdBaixa; // Atualiza a quantidade recebida do produto
            setProdutos(updatedProdutos); // Atualiza o estado com a nova lista de produtos
            setQuantidadeBaixa((prevState) => ({
                ...prevState,
                [index]: '', // Limpa o campo de quantidade a ser dada baixa
            }));
        } else {
            alert('Quantidade inválida para dar baixa.'); // Exibe uma mensagem de erro se a quantidade for inválida
        }
    };

    // Renderização da interface do componente
    return (
        <>
            <div className="card--container">
                {/* Seção de cadastro de produtos */}
                <h2>Alimentos Necessários</h2>
                <div className="cestas-flex">
                    <div className="cestas--cadastroProduto">
                        <form className="form-container" onSubmit={adicionarProduto}>
                            <h3>Cadastro do produto</h3>
                            <select
                                className='form--span'
                                name="campanha"
                                value={novoProduto.campanha}
                                onChange={(e) => setNovoProduto({ ...novoProduto, campanha: e.target.value })}
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
                            <button type="submit">Adicionar Produto</button>
                        </form>
                    </div>

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
                </div>
            </div>
        </>
    );
}