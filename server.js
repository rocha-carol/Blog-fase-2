import "dotenv/config";
import conectaNaDatabase from "./src/config/dbConnect.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

// Só inicia o servidor fora do ambiente de testes
if (process.env.NODE_ENV !== "test") {
    await conectaNaDatabase(); // já lida com erros de conexão

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
