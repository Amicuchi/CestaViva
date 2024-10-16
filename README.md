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

### Tecnologias Utilizadas (MERN)

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

## 4. Endpoints da API (Para o Caio completar)

Se o site se conecta a uma API, documente todos os endpoints.
Para cada endpoint:

- URL
- Método (GET, POST, PUT, DELETE)
- Parâmetros (query, body, etc.)
- Exemplo de resposta e possíveis erros Exemplo:

## Endpoints da API

A API do CestaViva permite a interação entre o frontend e o backend, principalmente para o gerenciamento de doações, campanhas, e autenticação de usuários.

### Configuração da API

As requisições à API utilizam **Axios** para comunicação HTTP.
Um interceptor de requisição é configurado para incluir o token JWT (se disponível) em todas as requisições:

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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

### Principais Endpoints

#### Autenticação

```bash
    POST /auth/login
        Descrição: Autentica um usuário (doador ou entidade) com email e senha.
        Parâmetros:
            email: string
            password: string
        Exemplo de resposta:

        json

        {
          "token": "jwt_token",
          "user": {
            "id": "12345",
            "name": "Nome do Usuário"
          }
        }

        Possíveis erros:
            401 Unauthorized: Credenciais inválidas.
```

#### Usuário

```bash
    GET /users/me
        Descrição: Retorna os dados do usuário autenticado.
        Headers:
            Authorization: Bearer token
        Exemplo de resposta:

        json

        {
          "id": "12345",
          "name": "Nome do Usuário",
          "role": "doador" | "entidade"
        }
```

#### Campanhas de Doação

GET /campaigns

```bash
        Descrição: Retorna todas as campanhas ativas.
        Parâmetros:
            Nenhum
        Exemplo de resposta:

        json

    [
      {
        "id": "1",
        "name": "FrioZero",
        "products_needed": ["cobertores", "agasalhos"]
      },
      {
        "id": "2",
        "name": "FomeZero",
        "products_needed": ["alimentos", "água"]
      }
    ]
```

POST /campaigns

```bash
    Descrição: Cria uma nova campanha (somente para entidades autenticadas).
    Headers:
        Authorization: Bearer token
    Parâmetros:
        name: string
        products_needed: array de strings (produtos necessários)
    
    Exemplo de corpo da requisição:

    json

        {
          "name": "Campanha de Inverno",
          "products_needed": ["cobertores", "agasalhos"]
        }
```

#### Produtos

```bash
    PUT /products/
        Descrição: Atualiza a quantidade de um produto em uma campanha após receber uma doação.
        Headers:
            Authorization: Bearer token
        Parâmetros:
            id: ID do produto
            Corpo da requisição:

            json

    {
      "quantity_received": 10
    }

Exemplo de resposta:

json

        {
          "status": "success",
          "product": {
            "id": "123",
            "name": "cobertor",
            "quantity_received": 10
          }
        }
```

#### Entidades

```bash
    POST /entities
        Descrição: Cadastra uma nova entidade no sistema.
        Parâmetros:
            name: string
            address: string
            email: string
            phone: string
            verified: boolean (default: false)
        
Exemplo de resposta:

        json
        {
          "status": "success",
          "entity": {
            "id": "1",
            "name": "Entidade Exemplo",
            "address": "Rua A, 123",
            "email": "contato@entidade.com",
            "verified": false
          }
        }
```

Essa é uma visão geral dos principais endpoints que pode se expandir conforme necessário.

*******************************************************************

## 5. **Guia de Estilo**

```markdown
### Padrões de Código

Estamos utilizando as seguintes ferramentas para garantir a padronização e qualidade do código:

- **ESLint:** Ferramenta para identificar e corrigir padrões problemáticos no código JavaScript.
- **Prettier:** Ferramenta de formatação de código que garante um estilo consistente de escrita.

Para instalar essas ferramentas:

```bash

npm install eslint prettier --save-dev

```

### Boas Práticas

- Utilizar Hooks ao invés de componentes de classe no React para o gerenciamento de estado e ciclo de vida.
- Manter o código modular, criando componentes pequenos e reutilizáveis.
- Nomear variáveis e funções de forma descritiva e significativa.
- Utilizar PropTypes para validar os tipos de propriedades passadas para componentes React.
- Manter um gerenciamento adequado de estado global (via Context API ou outras soluções como Redux).

## 6. Testes

Pela natureza da nossa aplicação, decidimos utilizar um tipo de teste conhecido como Testes End-to-End (E2E). Esse tipo de teste simula o comportamento de um usuário real navegando pelo sistema, realizando ações, e, em muitos casos, capturando screenshots em cada etapa para verificar visualmente se o comportamento está correto. Esse processo garante que toda a cadeia de funcionalidade do sistema, desde a interface do usuário até o backend, esteja funcionando conforme o esperado.

### Explicação do Processo de Testes End-to-End com Captura de Screenshots

No CestaViva, estamos utilizando Testes End-to-End (E2E) para verificar o comportamento da aplicação de ponta a ponta. Esses testes cobrem desde a interação do usuário na interface gráfica até a resposta da aplicação em diferentes cenários. A cada interação, capturamos uma screenshot da tela para registrar o estado atual da aplicação, o que nos ajuda a identificar problemas visuais ou de funcionalidade.

### Objetivos dos Testes E2E com Captura de Screenshots

- **Verificar se as telas estão sendo renderizadas corretamente:** Com a captura de screenshots, podemos garantir que a interface do usuário (UI) está sendo exibida conforme o esperado.
- **Validar o comportamento do sistema em diferentes cenários:** Simular erros de autenticação (login com senha errada) ou verificar se os dados estão sendo carregados corretamente.
- **Documentar as interações para facilitar a identificação de erros:** A captura de screenshots em pontos críticos do fluxo de uso permite uma análise visual imediata, facilitando a identificação de onde o sistema pode ter falhado.

### Cenário de Teste: Fluxo de Login

- **Acessando a Tela de Login**
    Entramos na tela de login e verificamos se os elementos (campos de e-mail e senha) estão presentes.
    Captura de tela: Registramos a interface inicial de login para verificar se os componentes estão carregados corretamente.

- **Tentando Login com Usuário Inexistente**
    Inserimos um e-mail de usuário que não existe no sistema e clicamos no botão de login.
    Captura de tela: Registramos a resposta da aplicação, que deve exibir uma mensagem de erro informando que o usuário não foi encontrado.

- **Tentando Login com Senha Errada**
    Tentamos fazer login com um e-mail válido, mas fornecendo uma senha incorreta.
    Captura de tela: Registramos a mensagem de erro exibida ao usuário, indicando que a senha está incorreta.

- **Login com Credenciais Válidas**
    Inserimos um e-mail e senha corretos para um usuário existente.
    Captura de tela: Registramos a transição bem-sucedida para a próxima tela (por exemplo, o dashboard) para garantir que o login foi realizado com sucesso.

### Uso do Cypress

Caso você saiba como utilizar o Cypress e queira contribuir com o projeto nesse sentido, segue um exemplo de caso de uso para que você possa se basear:

```javascript

describe('Testes de Login com Captura de Screenshots', () => {
  
  it('Acessa a tela de login e tira um print', () => {
    // Visita a página de login
    cy.visit('/login');

    // Captura uma screenshot da tela inicial de login
    cy.screenshot('login-screen');
  });
  
  it('Tenta fazer login com usuário inexistente', () => {
    cy.get('input[name="email"]').type('usuario-inexistente@exemplo.com');
    cy.get('input[name="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    // Aguarda a exibição do erro e tira uma screenshot
    cy.contains('Usuário não encontrado').should('be.visible');
    cy.screenshot('usuario-nao-existente');
  });

  it('Tenta fazer login com senha incorreta', () => {
    cy.get('input[name="email"]').type('usuario@exemplo.com');
    cy.get('input[name="password"]').type('senha-errada');
    cy.get('button[type="submit"]').click();

    // Aguarda o erro de senha incorreta e captura a tela
    cy.contains('Senha incorreta').should('be.visible');
    cy.screenshot('senha-incorreta');
  });

  it('Faz login com credenciais corretas', () => {
    cy.get('input[name="email"]').clear().type('usuario@exemplo.com');
    cy.get('input[name="password"]').clear().type('senha123');
    cy.get('button[type="submit"]').click();

    // Verifica se foi redirecionado para o dashboard e tira uma screenshot
    cy.url().should('include', '/dashboard');
    cy.screenshot('login-sucesso');
  });
});

```

## 7. Guia para Contribuição

Quer contribuir com o **CestaViva**? Siga os passos abaixo para colaborar com o projeto.

Aqui você encontra informações como:

- Como fazer o fork do repositório.
- Como abrir um pull request.
- Como documentar novos recursos.

### 1. Fazer Fork do Repositório

Crie um fork do repositório clicando no botão "Fork" no GitHub. Isso cria uma cópia do projeto no seu GitHub.

### 2. Clonar o Repositório

Clone o repositório para o seu ambiente de desenvolvimento local:

```bash
git clone https://github.com/seu-usuario/CestaViva.git
cd CestaViva

```

### 3. Criar um Branch

Antes de fazer qualquer modificação, crie um novo branch para a sua funcionalidade ou correção de bug:

```bash

git checkout -b minha-feature

```

### 4. Fazer Commit das Alterações

Depois de realizar as alterações, faça o commit delas com uma mensagem clara:

```bash

git add .
git commit -m "Descrição clara do que foi alterado"

```

### 5. Enviar o Branch

Envie suas alterações para o GitHub:

```bash
git push origin minha-feature
```

### 6. Abrir um Pull Request

Vá até o repositório original no GitHub e abra um Pull Request com uma descrição clara das alterações.
Diretrizes

- Escreva código limpo e bem documentado.
- Siga os padrões de estilo definidos no Guia de Estilo.
- Certifique-se de que todos os testes estão passando antes de abrir um Pull Request.

## 8. **Problemas Conhecidos e Limitações**

```markdown

- A funcionalidade de redefinição de senha ainda não está completamente implementada.
- Não há suporte para notificações em tempo real de novas doações.
- Alguns navegadores antigos podem apresentar problemas de compatibilidade com certas funcionalidades.

```

## 9. Autores

```markdown
Nomes dos autores:
```

## 10. React.js + Vite - Para criar uma aplicação React

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR e algumas regras ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para atualização rápida (Fast Refresh).
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para atualização rápida (Fast Refresh).

## 11. Licença

Este projeto é open-source e está licenciado sob a **Licença MIT**. Isso significa que você pode usar, modificar e contribuir com o projeto livremente, mas sem garantias de estabilidade por parte dos desenvolvedores.

Leia o arquivo `LICENSE` para mais detalhes.
