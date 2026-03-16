# API - Gerenciador de Pagamentos

API REST desenvolvida em AdonisJS v6, responsável por gerenciar um sistema completo de pagamentos, incluindo autenticação de usuários, gestão de produtos, controle de privilégios, integração com múltiplos gateways de pagamento e processamento de transações financeiras.

## 🚀 Funcionalidades Principais

-   **Autenticação de Usuários**: Registro, login e logout via JWT.
-   **Contas e Perfis**: Gestão de informações de usuário.
-   **Produtos**: CRUD completo de produtos com controle de estoque.
-   **Privilégios de Usuários**: Sistema de controle de acesso baseado em papéis (admin, manager, finance, user).
-   **Gateways de Pagamento**: Integração com múltiplos provedores de pagamento.
-   **Transações Financeiras**: Processamento de pagamentos, reembolsos e histórico de transações.

## 🌐 Versionamento e Base URL

A API utiliza **versionamento por rota** na versão `v1`.

**Base URL:** `http://localhost:3333/api/v1`

## 🔒 Autenticação

A autenticação é feita via **token JWT (JSON Web Token)**.

**Fluxo Básico:**

1.  Criar conta (`POST /auth/signup`)
2.  Fazer login (`POST /auth/login`)
3.  Receber o token JWT na resposta.
4.  Enviar o token nas rotas protegidas através do cabeçalho `Authorization`.

**Header Necessário:**

```
Authorization: Bearer {token}
```

### Rotas de Autenticação

**Prefixo:** `/api/v1/auth`

-   **`POST /signup`**: Cria uma nova conta de usuário.
    ```json
    {
      "name": "User Example",
      "email": "user@email.com",
      "password": "123456"
    }
    ```
-   **`POST /login`**: Autentica um usuário e retorna um token JWT.
    ```json
    {
      "email": "user@email.com",
      "password": "123456"
    }
    ```
    **Resposta Exemplo:**
    ```json
    {
      "token": "jwt_token"
    }
    ```
-   **`POST /logout`**: Invalida o token JWT. Requer autenticação.

## 👤 Conta do Usuário

**Prefixo:** `/api/v1/account`

-   **`GET /profile`**: Visualiza o perfil do usuário logado. Requer autenticação.
-   **`PUT /`**: Atualiza informações do usuário logado. Requer autenticação.
    ```json
    {
      "name": "Novo Nome"
    }
    ```
-   **`GET /`**: Exibe detalhes do usuário logado. Requer autenticação.

## 📦 Produtos

**Prefixo:** `/api/v1/product`

-   **`GET /`**: Lista todos os produtos.
-   **`POST /`**: Cria um novo produto. Requer permissão: `admin`, `manager`, `finance`.
    ```json
    {
      "name": "Produto A",
      "price": 100,
      "stock": 100,
      "description": "Descrição do Produto A"
    }
    ```
-   **`GET /:id`**: Busca um produto por ID.
-   **`PUT /:id`**: Atualiza um produto por ID. Requer permissão: `admin`, `manager`, `finance`.
-   **`DELETE /:id`**: Deleta um produto por ID. Requer permissão: `admin`, `manager`, `finance`.
-   **`GET /name/:name`**: Busca produtos por nome.
-   **`GET /myProducts/:id`**: Lista produtos associados a um usuário específico.
-   **`GET /myProducts/detail/:id`**: Detalha um produto associado a um usuário.

## 👥 Gerenciamento de Usuários / Privilégios

**Prefixo:** `/api/v1/manager`

-   **`GET /`**: Lista todos os usuários e seus privilégios. Requer permissão: `admin`.
-   **`POST /`**: Cria um novo usuário com privilégios específicos. Requer permissão: `admin`, `manager`.
-   **`GET /:id`**: Visualiza detalhes de um usuário por ID. Requer permissão: `admin`, `manager`.
-   **`PUT /:id`**: Atualiza privilégios de um usuário por ID. Requer permissão: `admin`.
-   **`DELETE /:id`**: Deleta um usuário por ID. Requer permissão: `admin`.

## 💳 Gateways de Pagamento

**Prefixo:** `/api/v1/gateway`

-   **`GET /`**: Lista todos os gateways de pagamento. Requer permissão: `admin`.
-   **`POST /`**: Cria um novo gateway. Requer permissão: `admin`.
-   **`PUT /:id`**: Atualiza um gateway por ID. Requer permissão: `admin`.
-   **`DELETE /:id`**: Deleta um gateway por ID. Requer permissão: `admin`.

## 💰 Transações

**Prefixo:** `/api/v1/transaction`

-   **`GET /`**: Lista todas as transações. Requer permissão: `admin`, `finance`.
-   **`GET /:id`**: Visualiza detalhes de uma transação por ID. Requer permissão: `admin`, `finance`.
-   **`POST /`**: Inicia uma nova transação de pagamento. Requer autenticação.
-   **`GET /finance/:id`**: Realiza o reembolso (refund) de uma transação. Requer permissão: `finance`.
-   **`GET /myTransactions/:id`**: Lista transações de um usuário específico.
-   **`GET /myTransactions/detail/:id`**: Detalha uma transação de um usuário específico.

## 🚦 Controle de Permissões (RBAC)

O sistema implementa um controle de acesso baseado em papéis (Role-Based Access Control - RBAC) com os seguintes papéis:

-   **`admin`**: Acesso total a todas as funcionalidades, incluindo gerenciamento de usuários e gateways.
-   **`manager`**: Acesso a gerenciamento de produtos e algumas funcionalidades de usuário.
-   **`finance`**: Acesso a gerenciamento de produtos e funcionalidades financeiras (ex: reembolsos).
-   **`user`**: Acesso básico a funcionalidades de conta e transações próprias.

Cada rota define quais papéis podem acessá-la, garantindo a segurança e a segregação de funções.

## 🏛️ Arquitetura de Gateways de Pagamento

O sistema utiliza um `GatewayManager` para abstrair a integração com múltiplos provedores de pagamento. A arquitetura é projetada para alta disponibilidade e resiliência:

-   **`GatewayManager`**: Orquestra as chamadas aos gateways, tentando processar pagamentos em ordem de prioridade. Em caso de falha de um gateway, ele tenta o próximo disponível.
-   **`gatewayFactory`**: Responsável por instanciar e configurar os gateways de pagamento ativos, lendo suas configurações do banco de dados e/ou cache.
-   **Adapters**: Cada gateway possui um adapter (`AdapterGateway1`, `AdapterGateway2`) que traduz o formato de dados interno da aplicação para o formato específico exigido pelo provedor de pagamento.
-   **Tratamento de Erros**: O `GatewayManager` agora coleta e reporta erros detalhados de cada gateway que falha, facilitando a depuração e identificação de problemas específicos (ex: `Request failed with status code 400` para dados inválidos, `Network Error` para problemas de conectividade).

## ⚡ Gerenciamento de Cache com Redis

Para otimizar o desempenho e reduzir a carga no banco de dados, a lista de gateways ativos é armazenada em cache no Redis.

-   **Leitura do Cache**: O sistema tenta primeiro buscar a lista de gateways ativos no Redis.
-   **Fallback para DB**: Se o cache estiver vazio ou expirado, a lista é buscada no banco de dados.
-   **Escrita no Cache**: Após buscar no banco, a lista é salva no Redis com um tempo de expiração (TTL) de 1 hora.
-   **Normalização de Nomes**: Para evitar inconsistências, os nomes dos gateways são normalizados (convertidos para minúsculas e sem espaços extras) tanto ao serem lidos do Redis/DB quanto ao serem comparados com os provedores instalados na `gatewayFactory`.

**Para limpar o cache do Redis (em ambiente de desenvolvimento):**
```bash
redis-cli FLUSHALL
```

## 🧪 Testes de API

O projeto inclui uma suíte robusta de testes de API desenvolvida com **Japa** e **Axios**, cobrindo todos os endpoints, cenários de sucesso, falhas, autenticação e autorização (RBAC).

**Para executar os testes:**

1.  Certifique-se de que o servidor AdonisJS está rodando (`http://localhost:3333`).
2.  Execute o comando:
    ```bash
    node ace test
    ```

## 🌱 Seeders e Dados de Mock

O projeto contém seeders para popular o banco de dados com dados de mock, facilitando o desenvolvimento e os testes. Os seeders criam usuários (admin, manager, finance, user), clientes, gateways, produtos e transações de exemplo.

**Para executar os seeders:**

1.  Certifique-se de que as migrações foram executadas (`node ace migration:run`).
2.  Execute o comando:
    ```bash
    node ace db:seed
    ```

## 🛠️ Executando o Projeto

### Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm ou Yarn
-   Docker e Docker Compose (para ambiente de desenvolvimento com MySQL e Redis)

### Instalação de Dependências

```bash
npm install
# ou
yarn install
```

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`, e configure as variáveis de ambiente, especialmente as de banco de dados e Redis.

### Migrações do Banco de Dados

```bash
node ace migration:run
```

### Rodando com Docker Compose (Recomendado para Desenvolvimento)

Para iniciar o banco de dados MySQL e o servidor Redis:

```bash
docker compose up -d
```

Após iniciar os serviços com Docker Compose, você pode rodar o servidor da aplicação:

```bash
node ace serve --watch
```

### Rodando o Servidor (sem Docker Compose para DB/Redis)

Se você tiver MySQL e Redis instalados localmente e configurados no `.env`:

```bash
node ace serve --watch
```

---

### tests

```bash
node ace test
```
