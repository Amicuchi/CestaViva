import { useState, useEffect, useCallback } from 'react';

import ModalCampanha from './components/ModalCampanha';
import api from "../../../../services/axiosConfig";
import './components/ListaCampanhas.modules.css';
import ListaCampanhas from './Components/ListaCampanhas';

export default function Campanhas() {
    const [isModalOpen, setModalOpen] = useState(false);  // Estado para abrir e fechar o modal
    const abrirModal = () => setModalOpen(true);          // Função para abrir o modal
    const fecharModal = () => setModalOpen(false);        // Função para fechar o modal

    const [campanhas, setCampanhas] = useState([]);       // Estado para armazenar as campanhas

    // Função para buscar as campanhas no backend
    const fetchCampanhas = useCallback(async () => {
        try {
            const response = await api.get("/cestas");
            setCampanhas(response.data);  // Atualiza o estado com os dados das campanhas
        } catch (error) {
            // setError("Erro ao buscar campanhas.");
            console.error("Erro ao tentar buscar campanhas:", error.message);
        }
    }, []);

    useEffect(() => {
        fetchCampanhas();  // Carrega as campanhas ao montar o componente
    }, [fetchCampanhas]);

    // Função para salvar uma nova campanha
    const handleSave = async (novaCampanha) => {
        try {
            await api.post("/cestas/cadastrarCesta", novaCampanha);  // Salva a nova campanha
            alert("Campanha cadastrada com sucesso!");
            fetchCampanhas();  // Atualiza as campanhas após o salvamento
        } catch (error) {
            console.error("Erro ao salvar campanha:", error);
            alert("Falha ao salvar a campanha.");
        }
        fecharModal();
    };

    return (
        <div>
            <div className='table-header'>
                <h1>Gerenciador de Campanhas</h1>

                {/* Botão para abrir o modal de nova campanha */}
                <button onClick={abrirModal}>Nova Campanha</button>
            </div>


            {/* Lista de campanhas com acordeon */}
            <ListaCampanhas campanhas={campanhas} />

            {/* Modal para cadastrar nova campanha */}
            <ModalCampanha
                isOpen={isModalOpen}
                onClose={fecharModal}
                onSave={handleSave}
            />
        </div>
    );
};