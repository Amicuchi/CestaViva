import '../../styles/Dashboard.css'
export default function DashboardUser() {
    const entityInfo = {
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
        Biografia: "A entidade distribui cestas para famílias carentes."
    };

    return (
        <div className="card--container">
            <h2 className="main--title">Perfil da Entidade</h2>
            <div>
                <p>CNPJ: {entityInfo.CNPJ}</p>
                <p>Razão Social: {entityInfo.RazaoSocial}</p>
                <p>Nome Fantasia: {entityInfo.NomeFantasia}</p>
                <p>Endereço: {`${entityInfo.EnderecoRua}, ${entityInfo.EnderecoNum}, ${entityInfo.EnderecoComp}, ${entityInfo.EnderecoBairro}, ${entityInfo.EnderecoCidade}, ${entityInfo.EnderecoEstado}`}</p>
                <p>Email: {entityInfo.Email}</p>
                <p>Responsável: {entityInfo.Responsavel}</p>
                <p>Telefone: {entityInfo.Telefone}</p>

                <h3>Biografia</h3>
                <textarea defaultValue={entityInfo.Biografia}></textarea>
                <button className="ButtonTotal" name="contatoBtn">Salvar alteração</button>
            </div>
        </div>
    );
}


