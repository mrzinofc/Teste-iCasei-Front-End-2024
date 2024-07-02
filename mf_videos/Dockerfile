# Use a imagem Node.js versão 14
FROM node:14

# Cria diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos necessários para o contêiner
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o código da aplicação para o contêiner
COPY . .

# Expõe a porta 8088 para fora do contêiner
EXPOSE 8088

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

