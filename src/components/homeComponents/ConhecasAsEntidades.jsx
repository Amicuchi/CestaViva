import api from '../../services/api';
import { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../../styles/ConhecasAsEntidades.css';

export default function ConhecaAsEntidades() {
    const [entidades, setEntidades] = useState([]);

    useEffect(() => {
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    console.log('Entidades:', entidades); // Adicione esta linha para depuração

    return (
        <div className='ConhecaAsEntidadesContainer'>
            <h2 className='ConhecaAsEntidadesH2'>Conheça as Entidades</h2>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
            >
                <Slider>
                <ButtonBack>Back</ButtonBack>
                    {entidades.length === 0 ? (
                        <Slide index={0}>
                            <p>Nenhuma entidade encontrada.</p>
                        </Slide>
                    ) : (
                        entidades.map((entidade, index) => (
                            <Slide key={entidade.id} index={index}>
                                <div className='Card'>
                                    <img 
                                        src={entidade.img} 
                                        className="CardImg" 
                                        alt={`Logo da Entidade ${entidade.nome}`}
                                    />
                                    <h3 className='CardTitle'>{entidade.nome}</h3>
                                </div>
                            </Slide>
                        ))
                    )}
                <ButtonNext>Next</ButtonNext>
                </Slider>
            </CarouselProvider>
        </div>
    )
}
