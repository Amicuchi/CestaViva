# CestaViva

## 1. Objetivo do Projeto

O CestaViva tem como objetivo aproximar doadores de entidades que necessitam de doações. Nosso foco inicial foi em alimentos, mas o site também permite o cadastro de outras necessidades como roupas, eletrônicos, móveis, remédios, e o que mais as entidades possam precisar. Ele resolve o problema de doadores que querem ajudar, mas não sabem onde ou quais itens são mais necessários. Ao permitir que as entidades cadastrem suas necessidades, fica mais fácil para os doadores escolherem o que doar.

Há dois tipos de usuários no CestaViva: **Doadores** e **Entidades**.

## Funcionalidades Principais

### Para Doadores

- Localização de entidades por cidade ou pelos itens que elas necessitam.

### Para Entidades

- Divulgação do endereço e da lista de itens necessários.
- Cadastro da entidade com informações verificáveis.
- Cadastro de campanhas de doação (como "FrioZero" e "FomeZero").
- Visualização de campanhas cadastradas com os produtos necessários.
- Sistema para dar baixa nos produtos recebidos, contabilizando a porcentagem de doações.
- Suporte e tira-dúvidas sobre como utilizar o site.

## 2. Configuração do Projeto

### Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB
- **Bibliotecas**: Axios para chamadas HTTP

### Repositórios

- **Frontend**: [CestaViva](https://github.com/Amicuchi/CestaViva)
- **Backend**: [CestaViva-backend](https://github.com/caiolemos96/CestaViva-backend)

### Instalação e Setup

#### 1. Clonar o Repositório

No terminal, use o comando abaixo para clonar o repositório:

```bash

Para o Frontend:

git clone https://github.com/Amicuchi/CestaViva.git
cd CestaViva

Para o Backend:

git clone https://github.com/caiolemos96/CestaViva-backend.git
cd CestaViva-backend

```

#### 2. Instalar Dependências

Execute o seguinte comando para instalar as dependências no frontend e backend, respectivamente:

```bash

npm install

```

#### 3. Configuração do Ambiente

Crie um arquivo .env na raiz dos diretórios frontend e backend com as seguintes variáveis (exemplo):

No frontend:

```bash

VITE_API_URL=http://localhost:3000

```

No backend:

```bash

    MONGO_URL=<sua_url_mongo>
    JWT_SECRET=<sua_chave_secreta>

```

#### 4. Executar o Projeto

Para rodar o projeto localmente, utilize os seguintes comandos:

Frontend:

```bash

    npm start

```

Backend:

```bash

    npm start

```

O frontend estará disponível em <http://localhost:5173>, e o backend em <http://localhost:3000>.

## 3. Arquitetura do Código

### Estrutura de Pastas

```bash

cestaViva
|- node_modules
|- src
|  |- assets
|  |  |- default-images (imagens padrão)
|  |  |- images (outras imagens do projeto)
|  |- components (componentes compartilhados)
|  |- pages (páginas principais)
|  |- routes (gerenciamento de rotas)
|  |- services (serviços como chamadas HTTP)
|  |- styles (arquivos de estilo)
|  |- utils (utilitários como verificação de autenticação)
|  |- App.jsx (componente principal da aplicação)
|  |- main.jsx (arquivo de entrada da aplicação)

```

### Principais Componentes

- **Footer.jsx:** Componente que renderiza o rodapé do site.
- **NavBar.jsx:** Barra de navegação com links para as principais páginas.
- **Busca.jsx:** Página de busca de entidades por cidade ou produtos.
- **CadastroEntidade.jsx:** Tela de cadastro para novas entidades.
- **Dashboard.jsx:** Painel de controle para entidades visualizarem campanhas e gerenciarem suas doações.

### Fluxo de Dados

O fluxo de dados no CestaViva é gerenciado pelo estado do React. As chamadas à API são feitas usando Axios, e o estado de autenticação é mantido no LocalStorage com tokens JWT.
O Context API é usado para compartilhar informações de autenticação e status da aplicação entre os componentes.

Descrever o papel de cada pasta e como os arquivos estão organizados.

Principais Componentes: Documente os principais componentes ou módulos do sistema, explicando o que cada um faz. Isso é útil para quem for modificar ou expandir o sistema.

Fluxo de Dados: Explique como os dados fluem no sistema. No caso de uma aplicação React, descreva como o estado é gerenciado (ex: Context API, Redux) e como as ações de usuários (ex: adicionar ao carrinho) afetam o estado global.

## 4. Endpoints da API

Se o site se conecta a uma API, documente todos os endpoints.
Para cada endpoint:

- URL
- Método (GET, POST, PUT, DELETE)
- Parâmetros (query, body, etc.)
- Exemplo de resposta e possíveis erros Exemplo:

```bash

import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '<http://localhost:3000>',
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api;

```

## 5. Guia de Estilo

- Padrões de Código: Mencione as práticas de codificação que estão sendo seguidas (ex: eslint, prettier). Isso ajuda na padronização do código e evita problemas de estilo.

- Boas Práticas: Liste as boas práticas específicas adotadas no projeto (ex: uso de hooks em vez de classes no React).

## 6. Testes

- Tipos de Testes: Explique quais tipos de testes estão sendo realizados (ex: unitários, integração) e como rodar os testes.
- Cobertura de Testes: Mencione o que está sendo coberto pelos testes e o que ainda precisa ser implementado.
- Exemplo de rodar testes: npm test.

## 7. Guia para Contribuição

Se outras pessoas vão colaborar no projeto, inclua um guia para contribuição:

- Como fazer o fork do repositório.
- Como abrir um pull request.
- Como documentar novos recursos.

## 8. Problemas Conhecidos e Limitações

Descrever qualquer problema ou limitação conhecida do sistema (ex: certas funcionalidades que não estão implementadas, bugs em versões específicas).

## 9. Licença

Esse é um projeto openSource e utiliza da Licença MIT, que te dá o direito de usar, alterar e contribuir com ele, mas sabendo que não nos responsabilizamos por qualquer instabilidade.
