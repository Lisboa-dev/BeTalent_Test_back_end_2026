# imagem base do Node
FROM node:24-alpine

# diretório da aplicação dentro do container
WORKDIR /app

# copia arquivos de dependências
COPY package*.json ./

# instala dependências
RUN npm install

# copia o restante do projeto
COPY . .

# build do adonis
RUN node ace build --production

# porta usada pelo adonis
EXPOSE 3333

# comando que inicia o servidor
CMD ["node", "build/server.js"]