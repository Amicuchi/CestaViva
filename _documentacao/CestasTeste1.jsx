import { useState } from 'react';

export default function Cestas() {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const adicionarProduto = () => {
        if (novoProduto.nome && novoProduto.quantidade) {
            setProdutos([...produtos, { ...novoProduto, recebido: false }]);
            setNovoProduto({ nome: '', quantidade: '' });
        }
    };

    const darBaixa = (index) => {
        const updatedProdutos = [...produtos];
        updatedProdutos[index].recebido = true;
        setProdutos(updatedProdutos);
    };

    return (
        <div className="cestas-container">
            <h2>Cestas de Alimentos</h2>
            <div className="form-container">
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
                <button onClick={adicionarProduto}>Adicionar Produto</button>
            </div>
            <div className="lista-produtos">
                {produtos.length === 0 ? (
                    <p>Nenhum produto adicionado ainda.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>{produto.recebido ? 'Recebido' : 'Pendente'}</td>
                                    <td>
                                        {!produto.recebido && (
                                            <button onClick={() => darBaixa(index)}>
                                                Dar Baixa
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};