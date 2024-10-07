import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../../../../services/axiosConfig';

import ListaCampanhas from './components/ListaCampanhas';
import ModalCampanha from './components/ModalCampanha';
import ListaProdutos from './components/ListaProdutos';

export default function Campanhas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [campanhas, setCampanhas] = useState([]);
    const [campanhaAtual, setCampanhaAtual] = useState(null);
    const [produtosVisiveis, setProdutosVisiveis] = useState(null);

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
    const handleIncluirProdutos = (campanhaId) => {
        setProdutosVisiveis(campanhaId === produtosVisiveis ? null : campanhaId);
    };

    const handleEditCampanha = (id) => {
        // Carregar dados da campanha e setar campanhaAtual
        setCampanhaAtual({ id });
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
            if (campanhaAtual) {
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
        } catch (error) {
            console.error("Erro ao salvar campanha:", error);
            alert("Erro ao salvar campanha.");
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

            {/* Renderiza a lista de produtos apenas quando a campanha é selecionada */}
            {campanhas.map((campanha) => (
                <Accordion key={campanha.id} expanded={produtosVisiveis === campanha.id} onChange={() => handleIncluirProdutos(campanha.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h4>{campanha.nomeCampanha}</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListaProdutos campanhaId={campanha.id} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
