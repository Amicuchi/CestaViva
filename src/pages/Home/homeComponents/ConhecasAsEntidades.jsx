import { useState, useEffect, useRef } from 'react';
import api from '../../../services/axiosConfig';
import useRandomAvatar from "../../../services/useRandomAvatar";
import '../Home.css';
import styles from './ConhecasAsEntidades.module.css';

export default function ConhecaAsEntidades() {
    const [entidades, setEntidades] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { getImageToDisplay } = useRandomAvatar();
    const carrosselRef = useRef(null);
    
    // Função para embaralhar array (algoritmo Fisher-Yates)
    const embaralharArray = (array) => {
        const arrayEmbaralhado = [...array];
        for (let i = arrayEmbaralhado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayEmbaralhado[i], arrayEmbaralhado[j]] = [arrayEmbaralhado[j], arrayEmbaralhado[i]];
        }
        return arrayEmbaralhado;
    };
    
    // Buscar dados da API e embaralhar
    useEffect(() => {
        api.get('/entidades')
            .then(response => {
                if (response.data && response.data.length > 0) {
                    // Embaralhar as entidades antes de armazenar no estado
                    const entidadesEmbaralhadas = embaralharArray(response.data);
                    setEntidades(entidadesEmbaralhadas);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar entidades:', error);
                alert("Ocorreu um erro ao carregar as entidades. Tente novamente mais tarde.");
            });
    }, []);

    // Implementação de carrossel circular
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === entidades.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? entidades.length - 1 : prevIndex - 1
        );
    };

    // Preparar cartas com índices para visualização circular
    const getVisibleCards = () => {
        if (entidades.length === 0) return [];
        
        // Calcular índices das cartas visíveis
        const visibleCards = [];
        const totalCards = entidades.length;
        
        // Adicionar cartas anteriores, atual e próximas
        for (let i = -2; i <= 2; i++) {
            let index = (currentIndex + i + totalCards) % totalCards;
            visibleCards.push({
                entidade: entidades[index],
                position: i,
                index
            });
        }
        
        return visibleCards;
    };

    // Obter cartas para exibição
    const visibleCards = getVisibleCards();

    // Função para mapear a posição ao nome da classe CSS
    const getPositionClassName = (position) => {
        switch(position) {
            case 0: return styles.position0;
            case -1: return styles.positionMinus1;
            case -2: return styles.positionMinus2;
            case 1: return styles.position1;
            case 2: return styles.position2;
            default: return '';
        }
    };

    return (
        <main className="CAEContainer">
            <h2>Conheça as Entidades</h2>
            
            {entidades.length > 0 ? (
                <div className={styles.carrosselContainer}>
                    <button 
                        className={`${styles.carouselButton} ${styles.prev}`} 
                        onClick={prevSlide}
                        aria-label="Entidade anterior"
                    >
                        &#10094;
                    </button>
                    
                    <div className={styles.carrosselViewport} ref={carrosselRef}>
                        {visibleCards.map((item) => (
                            <div 
                                key={`entidade-${item.index}`}
                                className={`${styles.cardWrapper} ${getPositionClassName(item.position)}`}
                            >
                                <div className="Card">
                                    <img
                                        src={item.entidade.imagem || getImageToDisplay()}
                                        className="CardImg"
                                        alt={`Logo da Entidade ${item.entidade.nomeFantasia}`}
                                    />
                                    <h3 className="CardTitle">{item.entidade.nomeFantasia}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className={`${styles.carouselButton} ${styles.next}`} 
                        onClick={nextSlide}
                        aria-label="Próxima entidade"
                    >
                        &#10095;
                    </button>
                </div>
            ) : (
                <p>Carregando entidades...</p>
            )}
        </main>
    );
}