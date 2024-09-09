import Contato from '../../components/homeComponents/Contato'
import '../../styles/Dashboard.css';

export default function DashboardFAQ() {
    return (
        <>
            <div className="card--container">
                <h2>Perguntas Frequentes</h2>

                <div className="dashboard--FAQ-card">
                    <h3>Como posso atualizar as informações da minha entidade?</h3>
                    <p>Por medida de segurança, as informações da entidade não podem ser alteradas pelo usuário, mesmo que esse seja o responsável pela entidade. Para isso, você precisa abrir uma solicitação na página do suporte e enviar o que você precisa que seja atualizado ou corrigido. Lembrando que para maior rapidez na atualização da informação é melhor que você envie documentos que demonstram a necessidade da atualização. Seja uma conta de luz, telefone, alteração no contrato social da entidade ou o que for necessário para que a alteração seja feita.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Como adiciono novos itens à minha lista de necessidades?</h3>
                    <p>No dashboard, acesse a seção &quot;Cestas&quot; e clique em &quot;Adicionar Novo Item&quot;. Preencha as informações solicitadas e clique em &quot;Salvar&quot; para atualizar a lista.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Posso ver um histórico das doações recebidas?</h3>
                    <p>Sim, você pode visualizar o histórico de doações na seção &quot;Histórico de Doações&quot;. Isso permitirá que você veja todos os itens recebidos e suas respectivas datas.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Como posso definir prioridades para os itens de doação?</h3>
                    <p>Ainda não temos uma opção para que sejam definidas prioridades nos itens. O doador tem total liberdade para doar o que ele tiver proposto. A única coisa que podemos fazer é definir a quantidade de itens necessária.</p>
                </div>

                <div className="dashboard--FAQ-card">

                    <h3>Há uma maneira de contatar diretamente os doadores?</h3>
                    <p>Por medida de segurança e privacidade do doador, o sistema não permite o contato direto com os doadores através do dashboard. O único contato deve ser feito apenas durante o momento do recebimento dos itens e ainda assim, se possível, que a entrega seja feita de forma anônima.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>O que fazer se houver um erro nas informações de uma doação recebida?</h3>
                    <p>Se você encontrar um erro, entre em contato com o suporte técnico através da seção &quot;Suporte&quot; no dashboard. Forneça detalhes sobre o problema para que possamos ajudar a resolver.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Como posso alterar a senha do meu perfil?</h3>
                    <p>Para alterar a senha, vá até a seção &quot;Configurações da Conta&quot; e selecione &quot;Alterar Senha&quot;. Siga as instruções fornecidas para definir uma nova senha.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Onde posso encontrar informações sobre as próximas campanhas de doação?</h3>
                    <p>Informações sobre campanhas de doação são geralmente exibidas na seção &quot;Campanhas&quot; do dashboard. Verifique regularmente para atualizações e oportunidades de participação.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>É possível adicionar mais de um endereço de coleta para a minha entidade?</h3>
                    <p>Atualmente, o sistema permite apenas um endereço de coleta por entidade. Se você precisar de múltiplos endereços, entre em contato com o suporte para discutir possíveis soluções.</p>
                </div>

                <div className="dashboard--FAQ-card">
                    <h3>Como posso desativar a minha conta?</h3>
                    <p>Para desativar sua conta, vá até a seção &quot;Configurações da Conta&quot; e selecione &quot;Desativar Conta&quot;. Siga as instruções para confirmar a desativação.</p>
                </div>

                <hr />
            </div>

            <Contato />
        </>
    )
}

