# Use Node 20 LTS como base
FROM node:24-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json antes para instalar dependências
COPY package*.json ./

# Instale dependências
RUN npm install 

# Copie o restante do código
COPY . .

# Exponha a porta padrão do Adonis
EXPOSE 3333

# Variável de ambiente para produção (opcional)
ENV NODE_ENV=production

# Comando para iniciar o Adonis
CMD  ["sh", "-c", "node ace migration:run && node ace db:seed && node build/server.js"]