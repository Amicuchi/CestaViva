import api from '../../services/api'
import { useState, useEffect } from 'react';
import '../../styles/Home.css';


export default function ConhecaAsEntidades() {
    const [entidades, setEntidades] = useState([]);

    useEffect(() => {
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % entidades.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? entidades.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="CAEContainer">
            <h2 className="TitleH2">Conheça as Entidades</h2>
            <button className="carousel-button prev" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="carousel-button next" onClick={nextSlide}>
                &#10095;
            </button>
            <div className="CAEcarrousselExterno">

                <div className="CAECarousel"
                    style={{ transform: `translateX(-${currentIndex * 180}px)` }}
                >
                    {entidades.map((entidade) => (
                        <div className="Card" key={entidade.id}>
                            <img
                                src={entidade.img}
                                className="CardImg"
                                alt={`Logo da Entidade ${entidade.nome}`}
                            />
                            <h3 className="CardTitle">{entidade.nome}</h3>
                        </div>
                    ))}
                </div>
            
            </div>
        </div>
    );
}