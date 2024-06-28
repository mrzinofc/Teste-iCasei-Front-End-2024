# Use a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do backend
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta 5000 para acesso ao backend
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
