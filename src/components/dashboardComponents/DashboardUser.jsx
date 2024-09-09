import ieq from '../../assets/ieq.png';
import '../../styles/Dashboard.css'

export default function DashboardUser() {
    const entidade = {
        CNPJ: "00.000.000/0001-00",
        RazaoSocial: "Igreja do Evangelho Quadrangular Ltda",
        NomeFantasia: "IEQ Lagoinha",
        EnderecoRua: "Rodovia Castelo Branco",
        EnderecoNum: "777",
        EnderecoComp: "",
        EnderecoBairro: "Lagoinha",
        EnderecoCidade: "Ribeirão Preto",
        EnderecoEstado: "SP",
        Email: "ieqlagoinha@ieq.com.br",
        Responsavel: "André Carvalho",
        Telefone: "(16) 99234-5678",
        Biografia: "A entidade distribui cestas para famílias carentes.",
        img: ieq,
    };

    return (
        <div className="card--container lastOne">
            <div className="card--content">
                <h2>Perfil da Entidade</h2>
                <div className="user--container">
                    <img
                        src={entidade.img}
                        className="CardImg"
                        alt={`Logo da Entidade ${entidade.nome}`}
                    />
                    <div>
                        <label className='UserLabel'>CNPJ:</label>
                        <p className='UserP'>{entidade.CNPJ}</p>

                        <label className='UserLabel'>Razão Social:</label>
                        <p className='UserP'>{entidade.RazaoSocial}</p>

                        <label className='UserLabel'>Nome Fantasia:</label>
                        <p className='UserP'>{entidade.NomeFantasia}</p>

                        <label className='UserLabel'>Endereço:</label>
                        <p className='UserP'>{`${entidade.EnderecoRua}, ${entidade.EnderecoNum}, ${entidade.EnderecoComp}, ${entidade.EnderecoBairro}`}</p>

                        <label className='UserLabel'>Cidade/Estado:</label>
                        <p className='UserP'>{`${entidade.EnderecoCidade}, ${entidade.EnderecoEstado}`}</p>

                        <label className='UserLabel'>Email:</label>
                        <p className='UserP'>{entidade.Email}</p>

                        <label className='UserLabel'>Responsável:</label>
                        <p className='UserP'>{entidade.Responsavel}</p>

                        <label className='UserLabel'>Telefone:</label>
                        <p className='UserP'>{entidade.Telefone}</p>

                        <h3>Biografia</h3>
                        <textarea defaultValue={entidade.Biografia}></textarea>
                    </div>
                </div>
                <button className="ButtonTotal" name="contatoBtn">Salvar alteração</button>
            </div>
        </div>
    );
}


