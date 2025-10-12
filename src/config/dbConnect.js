import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
let isConnected = false; // Flag para evitar múltiplas conexões

/**
 * Conecta ao banco de dados
 * - Se NODE_ENV=test, usa MongoMemoryServer (para testes)
 * - Senão, usa Mongo real via DB_CONNECTION_STRING
 */
async function conectaNaDatabase() {
    try {
        if (isConnected) return mongoose.connection; // evita reconexão

        let mongoUrl;

        if (process.env.NODE_ENV === "test") {
            mongoServer = await MongoMemoryServer.create();
            mongoUrl = mongoServer.getUri();
            console.log("Conectando ao Mongo Memory Server (Teste)...");
        } else {
            mongoUrl = process.env.DB_CONNECTION_STRING;
            if (!mongoUrl) throw new Error("DB_CONNECTION_STRING não definida no .env");
            console.log("Conectando ao Banco de Dados");
        }

        await mongoose.connect(mongoUrl);
        isConnected = true; // marca que já está conectado
        console.log("Conectado ao MongoDB!");
        return mongoose.connection;
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error.message);
        if (process.env.NODE_ENV !== "test") process.exit(1);
        throw error;
    }
}

// Função para parar o servidor de teste
async function disconnectTestDB() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        isConnected = false; // reseta flag para permitir nova conexão
    }
    if (mongoServer) await mongoServer.stop();
}

export default conectaNaDatabase;
export { disconnectTestDB };
