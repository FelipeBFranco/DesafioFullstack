# Estágio 1: Build da aplicação React
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Estágio 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine

# Copia os arquivos do build do React para a pasta do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]