import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento, se necessário
import api from '../../services/axiosConfig';
import '../../styles/Dashboard.css';

// Imagens padrão
// Serão utilizadas no perfil das entidades que não tiverem fornecido uma imagem
// Importa as imagens padrão de forma estática
import defaultImage1 from '../../assets/default-images/default1.jpg';
import defaultImage2 from '../../assets/default-images/default2.jpg';
import defaultImage3 from '../../assets/default-images/default3.jpg';
import defaultImage4 from '../../assets/default-images/default4.jpg';
import defaultImage5 from '../../assets/default-images/default5.jpg';
import defaultImage6 from '../../assets/default-images/default6.jpg';
import defaultImage7 from '../../assets/default-images/default7.jpg';
import defaultImage8 from '../../assets/default-images/default8.jpg';
import defaultImage9 from '../../assets/default-images/default9.jpg';
import defaultImage10 from '../../assets/default-images/default10.jpg';

// Array de imagens padrão
const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
    defaultImage5,
    defaultImage6,
    defaultImage7,
    defaultImage8,
    defaultImage9,
    defaultImage10,
];

export default function DashboardUser() {
    const [entidade, setEntidade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Para navegação programática, se necessário

    // Função para buscar dados do usuário logado e sua entidade associada
    useEffect(() => {
        const fetchEntidade = async () => {
            try {
                // Fazendo a requisição para buscar o usuário logado
                const userResponse = await api.get('/auth/me'); // Novo endpoint para buscar os dados do usuário
                const userId = userResponse.data._id;

                // Agora, buscar a entidade vinculada ao usuário logado
                const entidadeResponse = await api.get(`/entidades/user/${userId}`);
                setEntidade(entidadeResponse.data);
                console.log('Entidade:', entidadeResponse.data);
            } catch (error) {
                setError('Erro ao carregar os dados da entidade');
                console.error('Erro ao buscar entidade:', error);
                // Redirecionar para a página de login se necessário, caso não tiver os dados
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchEntidade();
    }, [navigate]); // O array de dependências vazio garante que a requisição seja feita apenas uma vez, quando o componente é montado

    // Função para obter uma imagem padrão aleatória
    const getRandomDefaultImage = () => {
        const randomIndex = Math.floor(Math.random() * defaultImages.length);
        return defaultImages[randomIndex];
    };

    // Se a entidade não for carregada ainda, exibe um loading ou mensagem de erro
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="card--container lastOne">
            <div className="card--content">
                <h2>Perfil da Entidade</h2>
                <div className="user--container">
                    <img
                        src={entidade.img ? entidade.img : getRandomDefaultImage()} // Usa imagem padrão se entidade.img for nulo ou indefinido
                        className="CardImg"
                        alt={`Logo da Entidade ${entidade.nomeFantasia}`}
                    />
                    <div>
                        <label className='UserLabel'>CNPJ:</label>
                        <p className='UserP' readOnly>{entidade.cnpj}</p>

                        <label className='UserLabel'>Razão Social:</label>
                        <p className='UserP' readOnly>{entidade.razaoSocial}</p>

                        <label className='UserLabel'>Nome Fantasia:</label>
                        <p className='UserP' readOnly>{entidade.nomeFantasia}</p>

                        <label className='UserLabel'>Endereço:</label>
                        <p className='UserP' readOnly>{`${entidade.enderecoRua}, ${entidade.enderecoNum}, ${entidade.enderecoComp || 'N/A'}, ${entidade.enderecoBairro}`}</p>

                        <label className='UserLabel'>Cidade/Estado:</label>
                        <p className='UserP' readOnly>{`${entidade.enderecoCidade}, ${entidade.enderecoEstado}`}</p>

                        <label className='UserLabel'>Email:</label>
                        <p className='UserP' readOnly>{entidade.email}</p>

                        <label className='UserLabel'>Responsável:</label>
                        <p className='UserP' readOnly>{entidade.responsavel}</p>

                        <label className='UserLabel'>Telefone:</label>
                        <p className='UserP' readOnly>{entidade.telefone}</p>

                        <h3>Biografia</h3>
                        <textarea defaultValue={entidade.biografia || 'Não disponível'}></textarea>
                    </div>
                </div>
                <button className="ButtonTotal" name="contatoBtn">Salvar alteração</button>
            </div>
        </div>
    );
}