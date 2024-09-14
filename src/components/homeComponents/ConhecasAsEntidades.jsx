import { useState, useEffect } from 'react';
import api from '../../services/axiosConfig';
import '../../styles/Home.css';

export default function ConhecaAsEntidades() {
    const [entidades, setEntidades] = useState([]); // Armazena as entidades
    const [currentIndex, setCurrentIndex] = useState(0); // Controla o índice atual do carrossel

    useEffect(() => {
        // Função para buscar entidades no backend
        api.get('/entidades')
            .then(response => setEntidades(response.data))  // Salva as entidades no estado
            .catch(error => {
                console.error('Erro ao buscar entidades:', error);
                alert("Ocorreu um erro ao carregar as entidades. Tente novamente mais tarde.");
            });
    }, []);

    const nextSlide = () => {
        // Vai para o próximo slide do carrossel
        setCurrentIndex((prevIndex) => (prevIndex + 1) % entidades.length);
    };

    const prevSlide = () => {
        // Volta para o slide anterior do carrossel
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? entidades.length - 1 : prevIndex - 1
        );
    };

    return (
        <main className="CAEContainer">
            <h2>Conheça as Entidades</h2>
            {entidades.length > 0 ? (
                <>
                    <button className="carousel-button prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="carousel-button next" onClick={nextSlide}>
                        &#10095;
                    </button>

                    <div className="CAEcarrousselExterno">
                        <div 
                            className="CAECarousel"
                            style={{ transform: `translateX(-${currentIndex * 180}px)` }}
                        >
                            {entidades.map((entidade) => (
                                <div className="Card" key={entidade._id}>
                                    <img
                                        src={entidade.img}  // Verificar como cadastrar uma imagem para a entidade
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
                <p>Carregando entidades...</p>  // Mostra enquanto as entidades estão sendo carregadas
            )}
        </main>
    );
}