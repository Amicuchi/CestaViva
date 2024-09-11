import ieq from '../assets/ieq.png';

const entidadesMock = [
    {
        id: 1,
        nomeFantasia: 'Igreja do Evangelho Quadrangular',
        razaoSocial: 'Igreja do Evangelho Quadrangular da Lagoinha',
        logradouro: 'Rodovia Castelo Branco',
        numero: '777',
        complemento: '',
        bairro: 'Lagoinha',
        cidade: 'Ribeirão Preto',
        estado: 'SP',
        cep: '14.123-123',
        email: 'lagoinha.rp@ieq.com.br',
        responsavel: 'André Carvalho',
        responsavelTelefone: '(16) 91234-1234',
        img: ieq
    },
    {
        id: 2,
        nomeFantasia: 'Igreja Cristo Rei',
        razaoSocial: 'Paróquia Cristo Rei',
        logradouro: 'Av. Brasil',
        numero: '1500',
        complemento: '',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01.123-123',
        email: 'cristorei@paroquia.com.br',
        responsavel: 'José Santos',
        responsavelTelefone: '(11) 99876-5432',
        img: ieq
    },
    {
        id: 3,
        nomeFantasia: 'Igreja Cristã da Zona Sul',
        razaoSocial: 'Comunidade Cristã Zona Sul',
        logradouro: 'Rua das Flores',
        numero: '200',
        complemento: '',
        bairro: 'Jardins',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '04.123-456',
        email: 'zonasul@comunidade.com.br',
        responsavel: 'Maria Oliveira',
        responsavelTelefone: '(11) 91234-5678',
        img: ieq
    },
    {
        id: 4,
        nomeFantasia: 'Casa do Vovô',
        razaoSocial: 'Casa de Repouso do Vovô',
        logradouro: 'Av. Independência',
        numero: '987',
        complemento: 'Bloco B',
        bairro: 'Independência',
        cidade: 'Ribeirão Preto',
        estado: 'SP',
        cep: '14.567-890',
        email: 'casadovovo@repouso.com.br',
        responsavel: 'João Pereira',
        responsavelTelefone: '(16) 91234-8765',
        img: ieq
    },
    {
        id: 5,
        nomeFantasia: 'Cantinho do Céu',
        razaoSocial: 'Centro de Acolhimento Cantinho do Céu',
        logradouro: 'Rua Esperança',
        numero: '123',
        complemento: '',
        bairro: 'Vila Nova',
        cidade: 'Campinas',
        estado: 'SP',
        cep: '13.456-789',
        email: 'cantinhodoceu@acolhimento.com.br',
        responsavel: 'Ana Paula Silva',
        responsavelTelefone: '(19) 99876-4321',
        img: ieq
    },
    {
        id: 6,
        nomeFantasia: 'Santa Casa de Misericórdia',
        razaoSocial: 'Santa Casa de Misericórdia de São Paulo',
        logradouro: 'Praça da Sé',
        numero: '100',
        complemento: '',
        bairro: 'Sé',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01.456-789',
        email: 'santacasa@saopaulo.com.br',
        responsavel: 'Carlos Alberto',
        responsavelTelefone: '(11) 98765-4321',
        img: ieq
    },
    {
        id: 7,
        nomeFantasia: 'APAE',
        razaoSocial: 'Associação de Pais e Amigos dos Excepcionais',
        logradouro: 'Av. dos Excepcionais',
        numero: '789',
        complemento: '',
        bairro: 'Centro',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '20.123-456',
        email: 'apae@rj.com.br',
        responsavel: 'Fernanda Costa',
        responsavelTelefone: '(21) 91234-5678',
        img: ieq
    },
    {
        id: 8,
        nomeFantasia: 'Lar dos Idosos São Vicente de Paulo',
        razaoSocial: 'Lar dos Idosos São Vicente de Paulo',
        logradouro: 'Rua São Vicente',
        numero: '123',
        complemento: '',
        bairro: 'Centro',
        cidade: 'Curitiba',
        estado: 'PR',
        cep: '80.123-456',
        email: 'laridosos@saovicente.com.br',
        responsavel: 'Ricardo Mendes',
        responsavelTelefone: '(41) 91234-5678',
        img: ieq
    },
    {
        id: 9,
        nomeFantasia: 'Creche Esperança',
        razaoSocial: 'Creche Esperança',
        logradouro: 'Rua da Alegria',
        numero: '456',
        complemento: '',
        bairro: 'Alegria',
        cidade: 'Salvador',
        estado: 'BA',
        cep: '40.123-789',
        email: 'crecheesperanca@esperanca.com.br',
        responsavel: 'Luana Souza',
        responsavelTelefone: '(71) 98765-4321',
        img: ieq
    },
    {
        id: 10,
        nomeFantasia: 'Lar das Crianças São Francisco',
        razaoSocial: 'Lar das Crianças São Francisco',
        logradouro: 'Av. São Francisco',
        numero: '567',
        complemento: '',
        bairro: 'São Francisco',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30.123-456',
        email: 'larcriancas@saofrancisco.com.br',
        responsavel: 'Marcos Lima',
        responsavelTelefone: '(31) 91234-5678',
        img: ieq
    },
    {
        id: 11,
        nomeFantasia: 'Centro de Reabilitação Luz do Amanhã',
        razaoSocial: 'Centro de Reabilitação Luz do Amanhã',
        logradouro: 'Rua Nova Vida',
        numero: '678',
        complemento: '',
        bairro: 'Nova Vida',
        cidade: 'Porto Alegre',
        estado: 'RS',
        cep: '90.123-789',
        email: 'luzdoamanha@reabilitacao.com.br',
        responsavel: 'Helena Martins',
        responsavelTelefone: '(51) 98765-4321',
        img: ieq
    },
    {
        id: 12,
        nomeFantasia: 'Centro de Acolhimento Paz e Amor',
        razaoSocial: 'Centro de Acolhimento Paz e Amor',
        logradouro: 'Rua Paz',
        numero: '789',
        complemento: '',
        bairro: 'Amor',
        cidade: 'Brasília',
        estado: 'DF',
        cep: '70.123-789',
        email: 'pazeamor@acolhimento.com.br',
        responsavel: 'Joana Costa',
        responsavelTelefone: '(61) 91234-5678',
        img: ieq
    },
];

const necessidadesMock = [
    {
        id: 1,
        necessidades: [
            { nomeProduto: 'arroz', tipo: 'saco de 5kg', qtdNecessaria: '10', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'feijão', tipo: 'saco de 1kg', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'macarrão', tipo: 'pacote de 500g', qtdNecessaria: '15', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 2,
        necessidades: [
            { nomeProduto: 'óleo de soja', tipo: 'garrafa de 900ml', qtdNecessaria: '25', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'açúcar', tipo: 'pacote de 1kg', qtdNecessaria: '30', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'sal', tipo: 'pacote de 1kg', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 3,
        necessidades: [
            { nomeProduto: 'farinha de trigo', tipo: 'pacote de 1kg', qtdNecessaria: '18', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'café', tipo: 'pacote de 500g', qtdNecessaria: '22', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'leite em pó', tipo: 'lata de 400g', qtdNecessaria: '12', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 4,
        necessidades: [
            { nomeProduto: 'biscoito', tipo: 'pacote de 200g', qtdNecessaria: '15', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'achocolatado', tipo: 'pacote de 400g', qtdNecessaria: '10', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'farinha de mandioca', tipo: 'pacote de 1kg', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 5,
        necessidades: [
            { nomeProduto: 'massa para bolo', tipo: 'pacote de 450g', qtdNecessaria: '12', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'leite condensado', tipo: 'lata de 395g', qtdNecessaria: '15', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'creme de leite', tipo: 'lata de 200g', qtdNecessaria: '18', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 6,
        necessidades: [
            { nomeProduto: 'milho de pipoca', tipo: 'pacote de 500g', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'ervilha', tipo: 'lata de 200g', qtdNecessaria: '22', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'molho de tomate', tipo: 'lata de 340g', qtdNecessaria: '25', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 7,
        necessidades: [
            { nomeProduto: 'leite', tipo: 'litro', qtdNecessaria: '30', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'farofa pronta', tipo: 'pacote de 300g', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'suco em pó', tipo: 'pacote de 25g', qtdNecessaria: '50', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 8,
        necessidades: [
            { nomeProduto: 'gelatina', tipo: 'pacote de 30g', qtdNecessaria: '40', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'maionese', tipo: 'pote de 250g', qtdNecessaria: '12', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'farinha de milho', tipo: 'pacote de 1kg', qtdNecessaria: '18', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 9,
        necessidades: [
            { nomeProduto: 'leite condensado', tipo: 'caixa de 395g', qtdNecessaria: '14', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'biscoito de água e sal', tipo: 'pacote de 200g', qtdNecessaria: '25', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'milho verde', tipo: 'lata de 200g', qtdNecessaria: '20', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 10,
        necessidades: [
            { nomeProduto: 'margarina', tipo: 'pote de 500g', qtdNecessaria: '10', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'chocolate em pó', tipo: 'lata de 400g', qtdNecessaria: '8', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'molho shoyu', tipo: 'garrafa de 150ml', qtdNecessaria: '5', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 11,
        necessidades: [
            { nomeProduto: 'milho verde', tipo: 'lata de 200g', qtdNecessaria: '18', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'creme de leite', tipo: 'caixa de 200g', qtdNecessaria: '22', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'biscoito recheado', tipo: 'pacote de 130g', qtdNecessaria: '15', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    },
    {
        id: 12,
        necessidades: [
            { nomeProduto: 'milho verde', tipo: 'lata de 200g', qtdNecessaria: '18', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'creme de leite', tipo: 'caixa de 200g', qtdNecessaria: '22', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' },
            { nomeProduto: 'biscoito recheado', tipo: 'pacote de 130g', qtdNecessaria: '15', campanha: 'Básica', dataInicial: '01/01/2025', dataFinal: '31/12/2025' }
        ]
    }
];

const api = {
    get: (url) => {
        if (url === '/entidades') {
            return Promise.resolve({ data: entidadesMock });
        } else if (url.startsWith('/necessidades/')) {
            const id = parseInt(url.split('/').pop(), 10);
            const entidade = necessidadesMock.find(ent => ent.id === id);
            return entidade ? Promise.resolve({ data: entidade.necessidades }) : Promise.reject(new Error('Entidade não encontrada'));
        }
        return Promise.reject(new Error('Endpoint não encontrado'));
    }
};

export default api;