import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ListaProdutos({ produtos, onUpdateProduto }) {
    const [quantidadeRecebida, setQuantidadeRecebida] = useState({}); // Estado para controlar as quantidades a serem recebidas

    // Função para receber produtos
    const handleReceberProduto = (produtoId) => {
        const quantidade = quantidadeRecebida[produtoId] || 0; // Pega a quantidade a ser recebida ou 0
        if (quantidade > 0) {
            // Atualiza a quantidade recebida do produto
            const produtoAtualizado = produtos.find(produto => produto.id === produtoId);
            if (produtoAtualizado) {
                produtoAtualizado.quantidadeRecebida += quantidade; // Atualiza a quantidade recebida
                onUpdateProduto(produtoAtualizado); // Chama a função para atualizar o produto na API ou no estado pai
            }
            setQuantidadeRecebida(prev => ({ ...prev, [produtoId]: 0 })); // Limpa o campo após o recebimento
        } else {
            alert('Por favor, insira uma quantidade válida a ser recebida.'); // Mensagem de erro
        }
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Qtd Necessária</TableCell>
                        <TableCell>Qtd Recebida</TableCell>
                        <TableCell>Qtd Faltante</TableCell>
                        <TableCell>Receber Produtos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {produtos.map((produto) => (
                        <TableRow key={produto.id}>
                            <TableCell>{produto.nomeProduto}</TableCell>
                            <TableCell>{produto.tipoProduto}</TableCell>
                            <TableCell>{produto.quantidadeNecessaria}</TableCell>
                            <TableCell>{produto.quantidadeRecebida}</TableCell>
                            <TableCell>{produto.quantidadeNecessaria - produto.quantidadeRecebida}</TableCell>
                            <TableCell>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Qtd a Receber"
                                        value={quantidadeRecebida[produto.id] || ''} // Exibe a quantidade a receber para o produto atual
                                        onChange={(e) => setQuantidadeRecebida({ 
                                            ...quantidadeRecebida, 
                                            [produto.id]: Number(e.target.value) // Atualiza a quantidade a ser recebida
                                        })}
                                        min="0"
                                    />
                                    <Button onClick={() => handleReceberProduto(produto.id)}>
                                        Receber
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

ListaProdutos.propTypes = {
    produtos: PropTypes.array.isRequired,
    campanhaId: PropTypes.number.isRequired,
    onUpdateProduto: PropTypes.func.isRequired,
};