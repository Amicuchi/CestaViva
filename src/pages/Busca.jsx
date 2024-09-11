import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importar useLocation
    // useLocation: Obtém a localização atual para acessar os parâmetros da URL
import api from '../services/api'; // Simula uma chamada à API
import '../styles/Busca.css';

export default function Busca() {
    const [entidades, setEntidades] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [itens, setItens] = useState([]);
    const [filtroCidade, setFiltroCidade] = useState('');
    const [filtroItem, setFiltroItem] = useState('');
    const location = useLocation(); // Obter a localização atual

    useEffect(() => {
        // Simulação de uma chamada à API para buscar as entidades
        api.get('/entidades')
            .then(response => {
                setEntidades(response.data);

                // Extraindo cidades e itens únicos das entidades
                const cidadesUnicas = [...new Set(response.data.map(entidade => entidade.cidade))];
                const itensUnicos = [...new Set(response.data.flatMap(entidade => entidade.necessidades))];

                setCidades(cidadesUnicas);
                setItens(itensUnicos);
                // A ideia aqui é extrair todas as cidades que estão cadastradas nas entidades e exibi-las de maneira que não se repitam no filtro por cidade.
                // Assim, nenhuma cidade precisa ser inserida manualmente, correndo o risco de deixar alguma de lado, impedindo que a entidade daquela cidade seja encontrada.
            })
            .catch(error => console.error('Erro ao buscar entidades:', error));
    }, []);

    useEffect(() => {
        // Extrair o parâmetro cidade da URL
        const queryParams = new URLSearchParams(location.search);
        const cidade = queryParams.get('cidade');
        if (cidade) {
            setFiltroCidade(cidade);
            // Atualizar estado: Configura o estado filtroCidade com o valor extraído da URL, o que faz com que o filtro na página de busca seja aplicado automaticamente.
        }
    }, [location.search]); // Atualizar quando a URL mudar

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
                <select value={filtroCidade} onChange={(e) => setFiltroCidade(e.target.value)}>
                    <option value="">Todas as cidades</option>
                    {cidades.map(cidade => (
                        <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                </select>
                <select value={filtroItem} onChange={(e) => setFiltroItem(e.target.value)}>
                    <option value="">Todos os alimentos</option>
                    {itens.map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
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