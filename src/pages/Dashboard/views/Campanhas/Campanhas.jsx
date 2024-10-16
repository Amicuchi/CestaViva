//Campanhas
import { useState, useEffect, useCallback } from 'react';
import api from "../../../../services/axiosConfig";
import PropTypes from "prop-types";
import ModalCampanha from './components/ModalCampanha';
import ListaCampanhas from './components/ListaCampanhas';
import './components/ListaCampanhas.modules.css';

export default function Campanhas({ isModalOpen, setIsModalOpen }) {
    // Estado para armazenar as campanhas
    const [campanhas, setCampanhas] = useState([]);

    // Função para buscar as campanhas no backend
    const fetchCampanhas = useCallback(async () => {
        try {
            const response = await api.get("/cestas"); // Faz a requisição para pegar as campanhas
            setCampanhas(response.data);  // Atualiza o estado com os dados das campanhas
        } catch (error) {
            console.error("Erro ao tentar buscar campanhas:", error.message);
        }
    }, []);

    // Efeito colateral para buscar campanhas ao montar o componente
    useEffect(() => {
        // console.log("Buscando campanhas...");  // 
        fetchCampanhas();  // Carrega as campanhas ao montar o componente
    }, [fetchCampanhas]);
    
    // Log para monitorar o estado e tentar encontrar a dupla renderização
    // useEffect(() => {
    //     console.log("Estado de campanhas atualizado:", campanhas); // Log para monitorar o estado
    // }, [campanhas]);

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
        setIsModalOpen(false); // Fecha o modal após salvar a campanha
    };

    return (
        <div>
            {/* Lista de campanhas com acordeon */}
            <ListaCampanhas campanhas={campanhas} />

            {/* Modal para cadastrar nova campanha */}
            <ModalCampanha
                isOpen={isModalOpen} // Controla a visibilidade do modal
                onClose={() => setIsModalOpen(false)} // Função para fechar o modal
                onSave={handleSave} // Função que será chamada ao salvar a nova campanha
            />
        </div>
    );
}

Campanhas.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func
};  