import { useState, useEffect, useRef } from 'react';
import api from '../../../services/axiosConfig';
import useRandomAvatar from "../../../services/useRandomAvatar";
import '../Home.css';

export default function ConhecaAsEntidades() {
    const [entidades, setEntidades] = useState([]); // Armazena as entidades
    const [currentIndex, setCurrentIndex] = useState(0); // Controla o índice atual do carrossel
    const [isTransitioning, setIsTransitioning] = useState(false); // Controla a transição do carrossel
    const carrosselRef = useRef(null); // Referência ao carrossel

    // Usando o hook para gerenciar a imagem
    const { getImageToDisplay } = useRandomAvatar();

    useEffect(() => {
        // Função para buscar entidades no backend
        api.get('/entidades')
            .then(response => {
                const fetchedEntities = response.data;
                // Duplica o primeiro e último elementos para suavizar a transição
                const updatedEntities = [
                    fetchedEntities[fetchedEntities.length - 1],
                    ...fetchedEntities,
                    fetchedEntities[0]
                ];
                setEntidades(updatedEntities);
            })
            .catch(error => {
                console.error('Erro ao buscar entidades:', error);
                alert("Ocorreu um erro ao carregar as entidades. Tente novamente mais tarde.");
            });
    }, []);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === entidades.length - 1) {
            // Volta para o índice real do primeiro item
            setCurrentIndex(1);
        } else if (currentIndex === 0) {
            // Volta para o índice real do último item
            setCurrentIndex(entidades.length - 2);
        }
    };

    const nextSlide = () => {
        // Vai para o próximo slide do carrossel
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        // Volta para o slide anterior do carrossel
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <main className="CAEContainer">
            <h2>Conheça as Entidades</h2>
            {entidades.length > 2 ? ( // Garante que há entidades suficientes para exibir
                <>
                    <button className="carousel-button prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="carousel-button next" onClick={nextSlide}>
                        &#10095;
                    </button>

                    <div className="CAEcarrousselExterno" ref={carrosselRef}>
                        <div
                            className="CAECarousel"
                            style={{
                                transform: `translateX(-${currentIndex * 190}px)`,
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            
                            {entidades.map((entidade) => ( 

                                <div className="Card" key={entidade._id}>
                                    <img
                                        src={entidade.imagem || getImageToDisplay()}
                                        className="CardImg"
                                        alt={`Logo da Entidade ${entidade.nomeFantasia}`}
                                    />
                                    <h3 className="CardTitle">{entidade.nomeFantasia}</h3>
                                </div>
                            ))}

                            
                        </div>
                    </div>
                </>
            ) : (
                <p>Carregando entidades...</p>
            )}
        </main>
    );
}