import { useState } from 'react';

export default function Cestas() {
    const [produtos, setProdutos] = useState([]);
    const [categoria, setCategoria] = useState({});
    const [novoProduto, setNovoProduto] = useState({ nome: '', quantidade: '' });
    const [quantidadeBaixa, setQuantidadeBaixa] = useState({});
    const [cestaCompleta, setCestaCompleta] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editProduto, setEditProduto] = useState({ nome: '', quantidade: '', categoria: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const adicionarProduto = () => {
        if (novoProduto.nome && novoProduto.quantidade > 0) {
            setProdutos([...produtos, { ...novoProduto, recebido: 0 }]);
            setNovoProduto({ nome: '', quantidade: '' });
        }
    };

    const editarProduto = (index) => {
        setEditIndex(index);
        setEditProduto(cestaCompleta[index]);
    };

    const salvarEdicao = () => {
        const updatedCestaCompleta = [...cestaCompleta];
        updatedCestaCompleta[editIndex] = editProduto;
        setCestaCompleta(updatedCestaCompleta);
        setEditIndex(null);
        setEditProduto({ nome: '', quantidade: '', categoria: '' });
    };

    const excluirProduto = (index) => {
        const updatedCestaCompleta = cestaCompleta.filter((_, i) => i !== index);
        setCestaCompleta(updatedCestaCompleta);
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
                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoria"
                    value={novoProduto.categoria}
                    onChange={handleInputChange}
                />
                <button onClick={adicionarProduto}>Adicionar Produto</button>
            </div>

            <div className="lista-cesta-completa">
                {cestaCompleta.length === 0 ? (
                    <p>Nenhum produto na cesta completa.</p>
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
                                        <button onClick={() => editarProduto(index)}>Editar</button>
                                        <button onClick={() => excluirProduto(index)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {editIndex !== null && (
                <div className="editar-form-container">
                    <h3>Editar Produto</h3>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do produto"
                        value={editProduto.nome}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        value={editProduto.quantidade}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        value={editProduto.categoria}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={salvarEdicao}>Salvar Alterações</button>
                </div>
            )}
        </div>
    );
}
