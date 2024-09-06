import ieq from '../assets/ieq.png';
import iczs from '../assets/iczs.jpg';
import cristoreiribeirao from '../assets/cristoreiribeirao.jpg';

const entidadesMock = [
    { id: 1, nome: 'Igreja do Evangelho Quadrangular', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 2, nome: 'Igreja Cristã da Zona Sul', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Franca', necessidades: ['feijao'], img: iczs },
    { id: 3, nome: 'Igreja Cristo Rei - Rib Preto', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 4, nome: 'Igreja do Evangelho Quadrangular', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Taquaritinga', necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 5, nome: 'Igreja Cristã da Zona Sul', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Franca', necessidades: ['feijao'], img: iczs },
    { id: 6, nome: 'Igreja Cristo Rei - Rib Preto', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Serrana', necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 7, nome: 'Igreja do Evangelho Quadrangular', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Jardinópolis', necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 8, nome: 'Igreja Cristã da Zona Sul', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['feijao'], img: iczs },
    { id: 9, nome: 'Igreja Cristo Rei - Rib Preto', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Cravinhos', necessidades: ['arroz'], img: cristoreiribeirao },
    { id: 10, nome: 'Igreja do Evangelho Quadrangular', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['arroz', 'feijao'], img: ieq },
    { id: 11, nome: 'Igreja Cristã da Zona Sul', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['feijao'], img: iczs },
    { id: 12, nome: 'Igreja Cristo Rei - Rib Preto', endereco: 'Rua da entidade, 123 - Bairro onde ela fica', cidade: 'Ribeirão Preto', necessidades: ['arroz'], img: cristoreiribeirao },
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
