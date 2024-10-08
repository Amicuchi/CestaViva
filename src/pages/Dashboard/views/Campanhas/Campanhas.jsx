import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../../../../services/axiosConfig';

import ListaCampanhas from './components/ListaCampanhas';
import ModalCampanha from './components/ModalCampanha';
import ListaProdutos from './components/ListaProdutos';
import ModalProduto from './components/ModalProduto';

export default function Campanhas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalProdutoOpen, setIsModalProdutoOpen] = useState(false); // Estado para controle do modal de produtos
    const [campanhas, setCampanhas] = useState([]);
    const [campanhaAtual, setCampanhaAtual] = useState(null);
    const [produtosVisiveis, setProdutosVisiveis] = useState(null);
    const [produtosCampanha, setProdutosCampanha] = useState([]); // Estado para produtos da campanha

    const fetchCampanhas = async () => {
        try {
            const response = await api.get('/cestas');
            setCampanhas(response.data);
        } catch (error) {
            console.error('Erro ao buscar campanhas:', error);
            alert('Erro ao carregar campanhas.');
        }
    };

    // Chama fetchCampanhas quando o componente é montado
    useEffect(() => {
        fetchCampanhas();
    }, []);

    // Função para listar os produtos de uma campanha específica
    const handleIncluirProdutos = async (campanhaId) => {
        // Chama a API para buscar produtos da campanha
        try {
            const response = await api.get(`/produtos/${campanhaId}`);
            setProdutosCampanha(response.data); // Armazena os produtos da campanha atual
            setProdutosVisiveis(campanhaId === produtosVisiveis ? null : campanhaId);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            alert('Erro ao buscar produtos.');
        }
    };

    const handleEditCampanha = (id) => {
        // Carregar dados da campanha e setar campanhaAtual
        const campanha = campanhas.find(c => c.id === id);
        setCampanhaAtual(campanha); // Carregar a campanha atual e abrir o modal
        setIsModalOpen(true);
    };

    const handleDeleteCampanha = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta campanha?")) {
            try {
                await api.delete(`/cestas/${id}`);
                alert("Campanha excluída com sucesso!");
                fetchCampanhas(); // Atualiza a lista de campanhas após a exclusão
            } catch (error) {
                console.error("Erro ao excluir campanha:", error);
                alert("Erro ao excluir campanha.");
            }
        }
    };

    const handleSaveCampanha = async (novaCampanha) => {
        try {
            if (campanhaAtual?.id) {
                // Atualiza a campanha existente
                await api.put(`/cestas/${campanhaAtual.id}`, novaCampanha);
                alert("Campanha atualizada com sucesso!");
            } else {
                // Cadastra uma nova campanha
                await api.post("/cestas/cadastrarCesta", novaCampanha);
                alert("Campanha cadastrada com sucesso!");
            }
            fetchCampanhas(); // Atualiza a lista de campanhas após salvar
            setIsModalOpen(false); // Fecha o modal
            setCampanhaAtual(null);
        } catch (error) {
            console.error("Erro ao salvar campanha:", error);
            alert("Erro ao salvar campanha.");
        }
    };

    const handleSaveProduto = async (novoProduto) => {
        // Salva novo produto na API
        try {
            await api.post(`/produtos`, novoProduto);
            alert("Produto cadastrado com sucesso!");
            setIsModalProdutoOpen(false); // Fecha o modal
            handleIncluirProdutos(campanhaAtual.id); // Atualiza a lista de produtos da campanha
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto.");
        }
    };

    return (
        <div>
            <ListaCampanhas
                campanhas={campanhas}
                onEditCampanha={handleEditCampanha}
                onIncluirProdutos={handleIncluirProdutos}
                onDeleteCampanha={handleDeleteCampanha}
                onClickNovaCampanha={() => setIsModalOpen(true)}
            />

            <ModalCampanha
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                campanhaAtual={campanhaAtual}
                onSaveCampanha={handleSaveCampanha}
            />

            {/* Modal para cadastrar novos produtos */}
            <ModalProduto
                isOpen={isModalProdutoOpen}
                onClose={() => setIsModalProdutoOpen(false)}
                onSaveProduto={handleSaveProduto}
            />

            {/* Renderiza a lista de produtos apenas quando a campanha é selecionada */}
            {campanhas.map((campanha) => (
                <Accordion key={campanha.id} expanded={produtosVisiveis === campanha.id} onChange={() => handleIncluirProdutos(campanha.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h4>{campanha.nomeCampanha}</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListaProdutos produtos={produtosCampanha} campanhaId={campanha.id} />
                        <Button onClick={() => { setIsModalProdutoOpen(true); setCampanhaAtual(campanha); }}>Cadastrar novo produto</Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
