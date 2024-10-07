import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function ModalProduto({ isOpen, onClose, produtoAtual, onSaveProduto }) {
    const [produto, setProduto] = useState({
        nomeProduto: '',
        quantidade: '',
        preco: ''
    });

    // Preenche os campos quando está editando um produto existente
    useEffect(() => {
        if (produtoAtual) {
            setProduto({
                nomeProduto: produtoAtual.nomeProduto || '',
                quantidade: produtoAtual.quantidade || '',
                preco: produtoAtual.preco || ''
            });
        } else {
            // Limpa o formulário para o caso de um novo produto
            setProduto({
                nomeProduto: '',
                quantidade: '',
                preco: ''
            });
        }
    }, [produtoAtual]);

    // Atualiza os campos de entrada
    const handleChange = (e) => {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        onSaveProduto(produto);
        onClose(); // Fecha o modal após salvar
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{produtoAtual ? 'Editar Produto' : 'Cadastrar Produto'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome do Produto"
                    name="nomeProduto"
                    value={produto.nomeProduto}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Quantidade"
                    name="quantidade"
                    value={produto.quantidade}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    type="number"
                />
                <TextField
                    label="Preço"
                    name="preco"
                    value={produto.preco}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    type="number"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>{produtoAtual ? 'Salvar' : 'Cadastrar'}</Button>
            </DialogActions>
        </Dialog>
    );
}

ModalProduto.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    produtoAtual: PropTypes.object,
    onSaveProduto: PropTypes.func.isRequired
};