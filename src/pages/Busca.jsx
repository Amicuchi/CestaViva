import { useState, useEffect } from 'react';
import api from '../services/api'; // Simula uma chamada à API
import '../styles/Busca.css';

export default function Busca() {
    const [entidades, setEntidades] = useState([]);
    const [filtroCidade, setFiltroCidade] = useState('');
    const [filtroItem, setFiltroItem] = useState('');

    useEffect(() => {
        // Simulação de uma chamada à API para buscar as entidades
        api.get('/entidades')
            .then(response => setEntidades(response.data))
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    // Filtrar entidades baseado nos filtros de cidade e item
    const entidadesFiltradas = entidades.filter(entidade => {
        const filtroCidadeAplicado = filtroCidade === '' || entidade.cidade.toLowerCase() === filtroCidade.toLowerCase();
        const filtroItemAplicado = filtroItem === '' || entidade.necessidades.includes(filtroItem);
        return filtroCidadeAplicado && filtroItemAplicado;
    });

    return (
        <main className='buscaContainer'>
            <h1>Busca de Entidades</h1>
            <div className='buscaSelects'>
                <select onChange={(e) => setFiltroCidade(e.target.value)}>
                    <option value="">Todas as cidades</option>
                    <option value="Cravinhos">Cravinhos</option>
                    <option value="Franca">Franca</option>
                    <option value="Jardinópolis">Jardinópolis</option>
                    <option value="Ribeirão Preto">Ribeirão Preto</option>
                    <option value="Serrana">Serrana</option>
                    <option value="Taquaritinga">Taquaritinga</option>
                    {/* Adicionar as opções conforme necessário */}
                </select>
                <select onChange={(e) => setFiltroItem(e.target.value)}>
                    <option value="">Todos os alimentos</option>
                    <option value="arroz">Arroz</option>
                    <option value="feijao">Feijão</option>
                    {/* Adicionar as opções conforme necessário */}
                </select>
            </div>
            <ul className='buscaUL'>
                {entidadesFiltradas.length === 0 ? (
                    <li className='BELi'>Nenhuma entidade encontrada.</li>
                ) : (
                    entidadesFiltradas.map((entidade) => (
                        <li className="BELi card" key={entidade.id}>
                            <h2 className="entidadeNome">{entidade.nome}</h2>
                            <p className="entidadeEndereco">{entidade.endereco}</p>
                            <p className="entidadeEndereco">{entidade.cidade}</p>
                            <div className="entidadeNecessidades">
                                {entidade.necessidades.map((necessidade, index) => (
                                    <span className="necessidade" key={index}>{necessidade}</span>
                                ))}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </main>
    );
}