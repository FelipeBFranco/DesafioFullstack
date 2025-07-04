# Estágio 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala as dependências de produção
RUN npm install --omit=dev

# Instala as dependências de desenvolvimento (para compilar) e os tipos que faltam
# Isso inclui @types/jsonwebtoken
RUN npm install --include=dev && npm i --save-dev @types/jsonwebtoken @types/jest

# Copia o restante dos arquivos da aplicação (respeitando o .dockerignore)
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Estágio 2: Imagem de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas as dependências de produção do estágio de build
COPY --from=builder /app/node_modules ./node_modules
# Copia a pasta 'dist' gerada no build
COPY --from=builder /app/dist ./dist
# Copia o schema do Prisma para a imagem final
COPY --from=builder /app/prisma ./prisma
# Copia o package.json para que o comando start funcione
COPY package.json .

# Expõe a porta que o servidor vai rodar
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]