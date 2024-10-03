import { useState } from 'react';

export default function Questions() {
    // Armazena o índice da pergunta que está aberta
    const [activeIndex, setActiveIndex] = useState(null);

    // Função para abrir/fechar as respostas
    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Como posso atualizar as informações da minha entidade?",
            answer: "Por medida de segurança, as informações da entidade não podem ser alteradas pelo usuário, mesmo que esse seja o responsável pela entidade. Para isso, você precisa abrir uma solicitação na página do suporte e enviar o que você precisa que seja atualizado ou corrigido. Lembrando que para maior rapidez na atualização da informação é melhor que você envie documentos que demonstram a necessidade da atualização. Seja uma conta de luz, telefone, alteração no contrato social da entidade ou o que for necessário para que a alteração seja feita."
        },
        {
            question: "Como adiciono novos itens à minha lista de necessidades?",
            answer: "No dashboard, acesse a seção 'Cestas' e clique em 'Adicionar Novo Item'. Preencha as informações solicitadas e clique em 'Salvar' para atualizar a lista."
        },
        {
            question: "Posso ver um histórico das doações recebidas?",
            answer: "Sim, você pode visualizar o histórico de doações na seção 'Histórico de Doações'. Isso permitirá que você veja todos os itens recebidos e suas respectivas datas."
        },
        {
            question: "Como posso definir prioridades para os itens de doação?",
            answer: "Ainda não temos uma opção para que sejam definidas prioridades nos itens. O doador tem total liberdade para doar o que ele tiver proposto. A única coisa que podemos fazer é definir a quantidade de itens necessária."
        },
        {
            question: "Há uma maneira de contatar diretamente os doadores?",
            answer: "Por medida de segurança e privacidade do doador, o sistema não permite o contato direto com os doadores através do dashboard. O único contato deve ser feito apenas durante o momento do recebimento dos itens e ainda assim, se possível, que a entrega seja feita de forma anônima."
        },
        {
            question: "O que fazer se houver um erro nas informações de uma doação recebida?",
            answer: "Se você encontrar um erro, entre em contato com o suporte técnico através da seção 'Suporte' no dashboard. Forneça detalhes sobre o problema para que possamos ajudar a resolver."
        },
        {
            question: "Como posso alterar a senha do meu perfil?",
            answer: "Para alterar a senha, vá até a seção 'Configurações da Conta' e selecione 'Alterar Senha'. Siga as instruções fornecidas para definir uma nova senha."
        },
        {
            question: "Onde posso encontrar informações sobre as próximas campanhas de doação?",
            answer: "Informações sobre campanhas de doação são geralmente exibidas na seção 'Campanhas' do dashboard. Verifique regularmente para atualizações e oportunidades de participação."
        },
        {
            question: "É possível adicionar mais de um endereço de coleta para a minha entidade?",
            answer: "Atualmente, o sistema permite apenas um endereço de coleta por entidade. Se você precisar de múltiplos endereços, entre em contato com o suporte para discutir possíveis soluções."
        },
        {
            question: "Como posso desativar a minha conta?",
            answer: "Para desativar sua conta, vá até a seção 'Configurações da Conta' e selecione 'Desativar Conta'. Siga as instruções para confirmar a desativação."
        }
    ];

    return (
        <>
            {faqs.map((faq, index) => (
                <div className="dashboard--FAQ-card" key={index}>
                    <h3 onClick={() => toggleAnswer(index)} style={{ cursor: 'pointer' }}>
                        {faq.question}
                    </h3>
                    {activeIndex === index && (
                        <p>{faq.answer}</p>
                    )}
                </div>
            ))}
        </>
    );
};