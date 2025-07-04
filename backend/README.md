# 🚀 Backend - Desafio Full-Stack

API REST desenvolvida em **Node.js** com **TypeScript** para sistema de cadastro e autenticação de usuários, utilizando **Express**, **PostgreSQL** e **Prisma ORM**.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Scripts Disponíveis](#-scripts-disponíveis)

## 🛠 Tecnologias

- **Node.js** 18+ LTS
- **TypeScript** 5.8+
- **Express** 5.1+
- **PostgreSQL** 14+
- **Prisma ORM** 6.11+
- **JWT** (jsonwebtoken)
- **Bcrypt** (hash de senhas)
- **Zod** (validação de dados)
- **ESLint + Prettier** (qualidade de código)
- **Vitest** (testes)

## ✨ Funcionalidades

- 📝 **Cadastro de usuários** com validação de email único
- 🔐 **Login seguro** com autenticação JWT
- 👤 **Perfil do usuário** (rota protegida)
- 🔒 **Hash seguro de senhas** com bcrypt
- ✅ **Validação de dados** com Zod
- 🛡️ **Middleware de autenticação** JWT
- 🚪 **CORS configurado** para integração frontend

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 LTS ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd backend
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

## ⚙️ Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Database connection string for PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Secret key for JWT token generation (use a strong, random string in production)
JWT_SECRET="your-super-secret-jwt-key-here"

# Server configuration (optional)
PORT=3333
```

3. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

4. Gere o cliente Prisma:
```bash
npx prisma generate
```

## 🏃‍♂️ Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3333`

## 📖 Documentação da API

### Base URL
```
http://localhost:3333/api
```

### Endpoints

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/register` | Cadastro de usuário | ❌ |
| POST | `/login` | Login do usuário | ❌ |
| GET | `/profile` | Perfil do usuário | ✅ |

#### 📝 POST /api/register
Cadastra um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (201):**
```json
{
  "message": "Usuário cadastrado com sucesso!",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-07-04T12:00:00.000Z"
  }
}
```

#### 🔐 POST /api/login
Autentica um usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

#### 👤 GET /api/profile
Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-07-04T12:00:00.000Z"
  }
}
```

### Códigos de Status

| Status | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 401 | Não autorizado |
| 409 | Conflito (email já existe) |
| 500 | Erro interno do servidor |

## 📁 Estrutura do Projeto

```
src/
├── @types/           # Tipagens customizadas
├── controllers/      # Controladores da aplicação
├── lib/             # Configurações e utilitários
├── middlewares/     # Middlewares personalizados
├── repositories/    # Camada de acesso aos dados
├── schemas/         # Schemas de validação (Zod)
├── services/        # Regras de negócio
├── routes.ts        # Definição das rotas
└── server.ts        # Configuração do servidor

prisma/
├── schema.prisma    # Schema do banco de dados
└── migrations/      # Migrations do banco

__tests__/
├── mocks/           # Mocks para testes
├── routes/          # Testes de rotas
└── services/        # Testes de serviços
```

### Arquitetura em Camadas

O projeto segue o padrão de arquitetura em camadas:

1. **Controllers**: Recebem as requisições HTTP e delegam para os services
2. **Services**: Contêm a lógica de negócio da aplicação
3. **Repositories**: Responsáveis pelo acesso aos dados (Prisma)
4. **Middlewares**: Validação, autenticação e tratamento de erros

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

Execute os testes em modo watch:
```bash
npm run test:watch
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm run lint` | Executa o ESLint |
| `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `npm test` | Executa os testes |

## 🔒 Segurança

- **Hash de senhas**: Utiliza bcrypt com salt de 8 rounds
- **JWT**: Tokens com expiração de 1 dia
- **CORS**: Configurado para aceitar apenas requisições do frontend
- **Validação**: Todas as entradas são validadas com Zod

## 🗄️ Database Schema

```sql
-- Tabela de usuários
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Índice único para email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```


⚡ **Desenvolvido como parte do Desafio Técnico Full-Stack**