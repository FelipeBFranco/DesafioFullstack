# Frontend - Desafio Fullstack

Sistema de autenticação e dashboard desenvolvido em React 19 com Material-UI.

## 🚀 Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **Material-UI 7.2.0** - Biblioteca de componentes
- **React Router DOM 7.6.3** - Roteamento
- **Axios 1.10.0** - Cliente HTTP
- **Framer Motion 12.23.0** - Animações
- **Recharts 3.0.2** - Gráficos e visualizações

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
├── context/             # Contextos React
│   └── AuthContext.js   # Gerenciamento de autenticação
├── pages/               # Páginas da aplicação
│   ├── Login.js         # Página de login
│   ├── Register.js      # Página de cadastro
│   └── Dashboard.js     # Dashboard principal
├── routes/              # Configuração de rotas
│   ├── index.js         # Rotas principais
│   └── PrivateRoute.js  # Proteção de rotas
├── services/            # Serviços e APIs
│   ├── api.js           # Configuração do Axios
│   └── authService.js   # Serviços de autenticação
└── theme/               # Temas e estilos
    └── beverageTheme.js # Tema customizado
```

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
# ou
npm start

# Build para produção
npm run build

# Executar testes
npm test

# Linting
npm run lint
npm run lint:fix

# Formatação de código
npm run format
```

## 🏗️ Arquitetura e Decisões Técnicas

### Gerência de Estado
**Escolha**: React Context API
**Justificativa**: Para um sistema de autenticação simples, o Context é suficiente e evita complexidade desnecessária do Redux. Mantém o estado global acessível e facilita manutenção.

### Roteamento
- **React Router DOM** para navegação
- **PrivateRoute** component para proteger rotas autenticadas
- Redirecionamento automático baseado no status de autenticação

### Autenticação e Segurança

#### Armazenamento de Token
**Escolha**: HttpOnly Cookies
**Configuração**: 
- `withCredentials: true` no Axios
- Cookies gerenciados pelo servidor

**Vantagens**:
- Proteção contra ataques XSS (JavaScript não consegue acessar)
- Mais seguro que localStorage
- Expiração automática gerenciada pelo servidor

**Riscos e Mitigações**:
- **CSRF**: Mitigado com SameSite cookies e tokens CSRF no backend
- **Dependência do backend**: Requer configuração adequada de CORS

#### Alternativas Consideradas
- **localStorage**: Mais simples, mas vulnerável a XSS
- **sessionStorage**: Limitado à sessão do navegador
- **NextAuth**: Overkill para projeto simples

### Serviços HTTP
- **Axios** configurado com base URL
- Interceptor para tratamento automático de erros 401
- Redirecionamento automático para login em caso de token expirado

## 🎨 Interface e UX

### Design System
- **Material-UI** para consistência visual
- Tema customizado (`beverageTheme`) com paleta específica
- Componentes responsivos e acessíveis

### Animações
- **Framer Motion** para transições suaves
- Loading states visuais
- Feedback de interação em botões e formulários

### Funcionalidades
- ✅ Formulários validados
- ✅ Estados de loading
- ✅ Tratamento de erros
- ✅ Animações fluidas
- ✅ Design responsivo

## 🔒 Funcionalidades de Autenticação

### Cadastro (/register)
- Campos: Nome completo, email, senha
- Validação client-side
- Feedback visual de erros

### Login (/login)
- Autenticação por email/senha
- Persistência de sessão
- Redirecionamento automático

### Dashboard (/dashboard)
- Rota protegida
- Dados do usuário autenticado
- Gráficos e métricas
- Logout seguro

## 🧪 Qualidade de Código

### Linting e Formatação
- **ESLint** com regras específicas para React
- **Prettier** para formatação consistente
- Regras customizadas para hooks e boas práticas

### Scripts Disponíveis
- `npm run lint` - Verificar problemas de código
- `npm run lint:fix` - Corrigir automaticamente
- `npm run format` - Formatar código com Prettier

## 🌐 API Integration

### Endpoints Utilizados
- `POST /api/register` - Cadastro de usuário
- `POST /api/login` - Autenticação
- `GET /api/me` - Dados do usuário autenticado
- `POST /api/logout` - Logout

### Configuração
```javascript
// Base URL configurada em src/services/api.js
baseURL: 'http://localhost:3333/api'
withCredentials: true // Para HttpOnly cookies
```

## 📋 Checklist de Conformidade

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| React 18+ | ✅ | React 19.1.0 |
| Context/Redux | ✅ | Context API |
| React Router | ✅ | v7.6.3 + PrivateRoute |
| Componentes | ✅ | Register, Login, Dashboard |
| Axios/AuthService | ✅ | Configurado |
| Material UI | ✅ | v7.2.0 |
| HttpOnly cookies | ✅ | Implementado |
| ESLint/Prettier | ✅ | Configurado |
| Scripts npm | ✅ | dev, build, lint, format |

## 🚀 Deploy

Para deploy em produção:

1. Ajustar variáveis de ambiente
2. Configurar CORS no backend
3. Usar HTTPS para cookies seguros
4. Configurar SameSite cookies

```bash
npm run build
# Deploy da pasta build/
```