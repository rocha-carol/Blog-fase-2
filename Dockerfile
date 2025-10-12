# Usa uma imagem base oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Limpa cache do Jest
RUN npx jest --clearCache

# Expõe a porta que o app usa
EXPOSE 3000

# Comando para testar/iniciar
ENTRYPOINT ["npm"]
CMD ["start"]
