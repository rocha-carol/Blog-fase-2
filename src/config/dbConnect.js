import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

async function conectaNaDatabase() {
    // Se estiver rodando testes, Banco em memória para testes
    if (process.env.NODE_ENV === "test") {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        return mongoose.connection;;
    }

    // Ambiente normal: usa Mongo real via .env
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    return mongoose.connection;
}

export default conectaNaDatabase;


