# Desafio Técnico: Cadastro e Login Full-Stack

Uma aplicação full-stack simples para cadastro, login e autenticação de usuários utilizando o fluxo de JWT com `HttpOnly cookies`. O projeto foi desenvolvido seguindo uma arquitetura de camadas no backend e uma estrutura baseada em componentes e contexto no frontend.

## Funcionalidades

- **Cadastro de Usuários:** Criação de novos usuários com senha criptografada (bcrypt).
- **Autenticação:** Login com e-mail e senha, com o servidor retornando um token JWT em um cookie `HttpOnly` para maior segurança.
- **Gerenciamento de Sessão:** A sessão do usuário é verificada no frontend através do cookie, persistindo o login entre recarregamentos da página.
- **Rotas Protegidas:** O perfil do usuário é uma rota privada, acessível apenas para usuários autenticados.

## Tech Stack

### Backend
- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **Prisma** (ORM para comunicação com o banco de dados)
- **jsonwebtoken** e **bcrypt** (Para autenticação e segurança)
- **Zod** (Para validação de schemas)
- **ESLint** + **Prettier** (Padrão e qualidade de código)

### Frontend
- **React.js**
- **React Router DOM** (Para roteamento)
- **React Context API** (Para gerenciamento de estado de autenticação)
- **Axios** (Para chamadas HTTP)
- **Material-UI (MUI)** (Para componentes de UI)

---

## Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação localmente.

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm** ou **pnpm**
- **PostgreSQL** (v14 ou superior) ou **Docker** para rodar um container PostgreSQL.

### 1. Backend

Primeiro, configure e inicie o servidor do backend.

1.  **Clone o repositório** (caso ainda não tenha feito):
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Navegue até a pasta do backend:**
    ```bash
    cd backend-desafio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Abra o arquivo `.env` e preencha com suas credenciais do PostgreSQL e um segredo para o JWT.

5.  **Aplique as migrations no banco de dados:**
    Este comando criará as tabelas necessárias no seu banco de dados PostgreSQL.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3333`.

### 2. Frontend

Com o backend rodando, configure e inicie a aplicação React.

1.  **Abra um novo terminal** e navegue até a pasta do frontend:
    ```bash
    cd frontend-desafio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
    A aplicação React abrirá em `http://localhost:3000` no seu navegador.

---

## Estrutura do Projeto

A estrutura de pastas foi organizada para separar as responsabilidades.

### Backend (`/backend-desafio/src`)
src/

├── controllers/    # Recebe as requisições HTTP e retorna as respostas.

├── middlewares/    # Funções que rodam entre a requisição e o controller (auth, validação).

├── repositories/   # Camada de acesso direto ao banco de dados (Prisma).

├── services/       # Contém a lógica de negócio da aplicação.

└── ...


### Frontend (`/frontend-desafio/src`)
src/
├── components/     # Componentes React reutilizáveis.
├── context/        # Contexto de autenticação global.
├── pages/          # As telas principais da aplicação (Login, Register, etc.).
├── routes/         # Configuração do roteamento.
├── services/       # Serviços para comunicação com a API.
└── ...


---

## Documentação da API

Uma breve visão geral dos endpoints disponíveis no backend.

| Método HTTP | Endpoint        | Descrição                                 | Protegida? |
|-------------|-----------------|-------------------------------------------|------------|
| `POST`      | `/api/register` | Cria um novo usuário.                     | Não        |
| `POST`      | `/api/login`    | Autentica um usuário e retorna um cookie. | Não        |
| `GET`       | `/api/profile`  | Retorna os dados do usuário logado.       | **Sim**    |

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
