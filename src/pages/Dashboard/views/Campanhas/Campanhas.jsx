import { useState } from 'react';
import api from '../../../../services/axiosConfig';

import ListaCampanhas from './components/ListaCampanhas';
import ModalCampanha from './components/ModalCampanha';
import ListaProdutos from './components/ListaProdutos';

export default function Campanhas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [campanhaAtual, setCampanhaAtual] = useState(null);
    const [produtosVisiveis, setProdutosVisiveis] = useState(null);

    // Função para listar os produtos de uma campanha específica
    const handleIncluirProdutos = (campanhaId) => {
        setProdutosVisiveis(campanhaId === produtosVisiveis ? null : campanhaId); // Alterna a visibilidade dos produtos
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
                // Atualizar a lista de campanhas após a exclusão (chamar uma função de atualização)
            } catch (error) {
                console.error("Erro ao excluir campanha:", error);
                alert("Erro ao excluir campanha.");
            }
        }
    };

    const handleSaveCampanha = (novaCampanha) => {
        // Lógica para salvar a campanha (via API)
        setIsModalOpen(false);
        console.log("Campanha salva:", novaCampanha);
    };

    return (
        <div>
            <ListaCampanhas
                onEditCampanha={handleEditCampanha}
                onIncluirProdutos={handleIncluirProdutos}
                onDeleteCampanha={handleDeleteCampanha}
                // Passa a função de abrir o modal
                onClickNovaCampanha={() => setIsModalOpen(true)}
            />
            <ModalCampanha
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                campanhaAtual={campanhaAtual}
                onSaveCampanha={handleSaveCampanha}
            />
            
            {/* Exibe a lista de produtos apenas quando a campanha é selecionada */}
            {produtosVisiveis && <ListaProdutos campanhaId={produtosVisiveis} />}
        </div>
    );
}
