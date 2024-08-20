import ieq from '../assets/ieq.png';
import iczs from '../assets/iczs.jpg';
import cristoreiribeirao from '../assets/cristoreiribeirao.jpg';

const entidadesMock = [
    { id: 1, nome: 'Igreja do Evangelho Quadrangular', distancia: 2.5, necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 2, nome: 'Igreja Cristã da Zona Sul', distancia: 5.0, necessidades: ['feijao'], img: iczs },
    { id: 3, nome: 'Igreja Cristo Rei - Rib Preto', distancia: 1.2, necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 4, nome: 'Igreja do Evangelho Quadrangular', distancia: 2.5, necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 5, nome: 'Igreja Cristã da Zona Sul', distancia: 5.0, necessidades: ['feijao'], img: iczs },
    { id: 6, nome: 'Igreja Cristo Rei - Rib Preto', distancia: 1.2, necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 7, nome: 'Igreja do Evangelho Quadrangular', distancia: 2.5, necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 8, nome: 'Igreja Cristã da Zona Sul', distancia: 5.0, necessidades: ['feijao'], img: iczs },
    { id: 9, nome: 'Igreja Cristo Rei - Rib Preto', distancia: 1.2, necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 10, nome: 'Igreja do Evangelho Quadrangular', distancia: 2.5, necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 11, nome: 'Igreja Cristã da Zona Sul', distancia: 5.0, necessidades: ['feijao'], img: iczs },
    { id: 12, nome: 'Igreja Cristo Rei - Rib Preto', distancia: 1.2, necessidades: ['arroz'], img: cristoreiribeirao },
];

const api = {
    get: (url) => {
        if (url === '/entidades') {
            return Promise.resolve({ data: entidadesMock });
        }
        return Promise.reject(new Error('Endpoint não encontrado'));
    }
};

export default api;
