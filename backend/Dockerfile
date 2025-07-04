# Estágio 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Estágio 2: Imagem de produção
FROM node:18-alpine

WORKDIR /app

# Copia as dependências de produção
COPY --from=builder /app/node_modules ./node_modules
# Copia a pasta 'dist' gerada no build
COPY --from=builder /app/dist ./dist
# Copia o schema do Prisma para a imagem final
COPY --from=builder /app/prisma ./prisma

# Expõe a porta que o servidor vai rodar
EXPOSE 3333

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]