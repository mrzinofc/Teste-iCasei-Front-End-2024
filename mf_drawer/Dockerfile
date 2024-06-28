# Use a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do frontend
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Serve a aplicação estática na porta 8080
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npx", "http-server", "-p", "8080"]
