import { useState, useEffect } from 'react';
import api from '../services/api'; // Simula uma chamada à API
import '../styles/Busca.css'

function Busca() {
    const [entidades, setEntidades] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        // Simulação de uma chamada à API para buscar as entidades
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    // Filtrar entidades baseado no filtro
    const entidadesFiltradas = filtro === '' 
        ? entidades 
        : entidades.filter(entidade => entidade.necessidades.includes(filtro)
    );

    return (
        <main className='buscaContainer'>
            <h1>Busca de Entidades</h1>
            <select onChange={(e) => setFiltro(e.target.value)}>
                <option value="">Todos os alimentos</option>
                <option value="arroz">Arroz</option>
                <option value="feijao">Feijão</option>
                {/* Adicionar as opções conforme necessário */}
            </select>
            <ul className='buscaUL'>
                {entidadesFiltradas.length === 0 ? (
                    <li className='BELi'>Nenhuma entidade encontrada.</li>
                ) : (
                    entidadesFiltradas.map((entidade) => (
                        <li className="BELi" key={entidade.id}>
                            {entidade.nome} - {entidade.distancia} km de distância
                            {/* <ul>
                                {entidade.necessidades.map((necessidade, index) => (
                                    <li key={index}>{necessidade}</li>
                                ))}
                            </ul> */}
                        </li>
                    ))
                )}
            </ul>
        </main>
    );
}

export default Busca;
