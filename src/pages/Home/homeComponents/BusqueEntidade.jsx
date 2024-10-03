import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate
import '../Home.css';

export default function BusqueEntidade() {
    
    const [cidade, setCidade] = useState(''); // Estado para armazenar o valor do input
    const navigate = useNavigate(); // Criar uma instância de useNavigate

    const handleBuscar = (e) => {
        e.preventDefault();
        if (cidade.trim() !== '') {
            // Redireciona para a página de busca com a cidade como parâmetro na URL
            navigate(`/busca?cidade=${cidade}`);
        }
    };

    return (
        <main className="BEContainer">
            <h1>Bem-vindo ao CestaViva</h1>
            <p>Facilitando a doação de alimentos para quem mais precisa.</p>

            <form onSubmit={handleBuscar}>
                <h2>Busque uma entidade:</h2>

                <input
                    className="BEInput"
                    type="text"
                    name="busqueEntidade"
                    placeholder="Digite o nome da sua cidade aqui"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)} // Atualizar o estado com o valor digitado
                />

                <button className="BEButton" type="submit">Buscar</button>
            </form>
        </main>
    );
}
