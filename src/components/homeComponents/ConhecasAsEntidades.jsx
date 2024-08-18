import { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import api from '../../services/api';

export default function ConhecaAsEntidades() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [entidades, setEntidades] = useState([]);

    useEffect(() => {
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    return(
        <>
            <h2>Conheças as Entidades</h2>
            <Carousel 
                responsive={responsive}
                autoPlaySpeed={1000}
                centerMode={true}
                customTransition="all .5"
                transitionDuration={500}
                infinite={true}
            >
                {entidades.length === 0 ? (
                    <div>
                        <p>Nenhuma entidade encontrada.</p>
                    </div>
                ) : (
                    entidades.map((entidade) => (
                        <div key={entidade.id}>
                            <h3>{entidade.nome}</h3>
                            <img 
                                src={entidade.img} 
                                className="ong-logo-width" 
                                alt="Logo da ONG"
                            />
                        </div>
                    ))
                )}
            </Carousel>
        </>
    )
}