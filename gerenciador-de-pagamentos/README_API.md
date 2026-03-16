# API - Gerenciador de Pagamentos

API REST responsável por gerenciar:

-   autenticação de usuários
-   contas e perfis
-   produtos
-   privilégios de usuários
-   gateways de pagamento
-   transações financeiras

A API utiliza **versionamento por rota**:

    /api/v1

------------------------------------------------------------------------

# Base URL

    http://localhost:3333/api/v1

------------------------------------------------------------------------

# Autenticação

A autenticação é feita via **token JWT**.

Fluxo básico:

1.  Criar conta
2.  Fazer login
3.  Receber token
4.  Enviar token nas rotas protegidas

Header necessário:

    Authorization: Bearer {token}

------------------------------------------------------------------------

# Rotas da API

## Auth

Prefixo:

    /api/v1/auth

### Criar conta

    POST /auth/signup

Body exemplo:

``` json
{
  "name": "User Example",
  "email": "user@email.com",
  "password": "123456"
}
```

------------------------------------------------------------------------

### Login

    POST /auth/login

Body:

``` json
{
  "email": "user@email.com",
  "password": "123456"
}
```

Resposta exemplo:

``` json
{
  "token": "jwt_token"
}
```

------------------------------------------------------------------------

### Logout

    POST /auth/logout

Requer autenticação.

------------------------------------------------------------------------

# Conta do Usuário

Prefixo:

    /api/v1/account

### Ver perfil

    GET /account/profile

------------------------------------------------------------------------

### Atualizar usuário

    PUT /account

Body exemplo:

``` json
{
  "name": "Novo Nome"
}
```

------------------------------------------------------------------------

### Mostrar usuário

    GET /account

------------------------------------------------------------------------

# Produtos

Prefixo:

    /api/v1/product

### Listar produtos

    GET /product

### Criar produto

    POST /product

Permissões:

-   admin
-   manager
-   finance

Body exemplo:

``` json
{
  "name": "Produto A",
  "price": 100
}
```

### Buscar produto por ID

    GET /product/:id

### Atualizar produto

    PUT /product/:id

### Deletar produto

    DELETE /product/:id

### Buscar produto por nome

    GET /product/name/:id

### Listar produtos do usuário

    GET /product/myProducts/:id

### Detalhe de produto do usuário

    GET /product/myProducts/detail/:id

------------------------------------------------------------------------

# Gerenciamento de Usuários / Privilégios

Prefixo:

    /api/v1/manager

### Atualizar privilégio

    GET /manager

Permissão:

-   admin

### Listar privilégios

    POST /manager

Permissões:

-   admin
-   manager

### Ver privilégio

    GET /manager/:id

### Atualizar privilégio

    PUT /manager/:id

### Deletar privilégio

    DELETE /manager/:id

------------------------------------------------------------------------

# Gateways de Pagamento

Prefixo:

    /api/v1/gateway

### Listar gateways

    GET /gateway

### Criar gateway

    POST /gateway

### Atualizar gateway

    PUT /gateway/:id

### Deletar gateway

    DELETE /gateway/:id

------------------------------------------------------------------------

# Transações

Prefixo:

    /api/v1/transaction

### Listar transações

    GET /transaction

### Ver transação

    GET /transaction/:id

### Reembolso

    GET /transaction/finance/:id

Realiza o **refund da transação**.

------------------------------------------------------------------------

# Controle de Permissões

Papéis disponíveis:

-   admin
-   manager
-   finance
-   user

Cada rota define quais papéis podem acessá-la.

------------------------------------------------------------------------

# Executando o Projeto

Instalar dependências:

    npm install

Rodar servidor:

    node ace serve --watch

------------------------------------------------------------------------

# Melhorias Futuras

-   documentação automática com Swagger
-   testes automatizados
-   logs estruturados
-   rate limit
