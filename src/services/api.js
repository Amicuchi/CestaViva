
const entidadesMock = [
    { id: 1, nome: 'Entidade A', distancia: 2.5, necessidades: ['arroz', 'feijao'] },
    { id: 2, nome: 'Entidade B', distancia: 5.0, necessidades: ['feijao'] },
    { id: 3, nome: 'Entidade C', distancia: 1.2, necessidades: ['arroz'] },
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
