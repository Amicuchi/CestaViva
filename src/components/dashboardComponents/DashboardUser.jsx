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
        <div className="user--wrapper">
            <h2 className="main--title">Perfil da Entidade</h2>
            <div>
                <p><strong>CNPJ:</strong> {entityInfo.CNPJ}</p>
                <p><strong>Razão Social:</strong> {entityInfo.RazaoSocial}</p>
                <p><strong>Nome Fantasia:</strong> {entityInfo.NomeFantasia}</p>
                <p><strong>Endereço:</strong> {`${entityInfo.EnderecoRua}, ${entityInfo.EnderecoNum}, ${entityInfo.EnderecoComp}, ${entityInfo.EnderecoBairro}, ${entityInfo.EnderecoCidade}, ${entityInfo.EnderecoEstado}`}</p>
                <p><strong>Email:</strong> {entityInfo.Email}</p>
                <p><strong>Responsável:</strong> {entityInfo.Responsavel}</p>
                <p><strong>Telefone:</strong> {entityInfo.Telefone}</p>

                <h3>Biografia</h3>
                <textarea defaultValue={entityInfo.Biografia}></textarea>
            </div>
        </div>
    );
}


