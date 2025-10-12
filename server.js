import "dotenv/config";
import conectaNaDatabase from "./src/config/dbConnect.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") { // só roda fora dos testes
    const conexao = await conectaNaDatabase();

    conexao.on("error", (erro) => {
        console.error("erro de conexão", erro);
    });

    conexao.once("open", () => {
        console.log("Conexão com o banco feita com sucesso");
    });

    app.listen(PORT, () => {
        console.log("servidor escutando!!");
    });
}

