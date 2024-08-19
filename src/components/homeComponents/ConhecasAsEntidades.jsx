import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import '../../styles/ConhecasAsEntidades.css';

export default function ConhecaAsEntidades() {

    const [entidades, setEntidades] = useState([]);

    useEffect(() => {
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    return(
        <div className='ConhecaAsEntidadesContainer'>
            <h2 className='ConhecaAsEntidadesH2'>Conheças as Entidades</h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {entidades.length === 0 ? (
                    <div>
                        <p>Nenhuma entidade encontrada.</p>
                    </div>
                ) : (
                    entidades.map((entidade) => (
                    <SwiperSlide key={entidade.id}>
                        <div className='Card'>
                            <h3 className='CardTitle'>{entidade.nome}</h3>
                            <img 
                                src={entidade.img} 
                                className="CardImg" 
                                alt="Logo da Entidade"
                            />
                        </div>
                    </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    )
}