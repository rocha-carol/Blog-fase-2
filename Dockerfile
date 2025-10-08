# Usa uma imagem base oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta que o app usa
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
