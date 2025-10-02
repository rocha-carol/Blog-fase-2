import "dotenv/config";
import conectaNaDatabase from "./src/config/dbConnect.js";
import app from "./src/app.js";


const PORT = 3000;
const conexao = await conectaNaDatabase();

app.listen(PORT,  () => {
    console.log("servidor escutando!!");
});


conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})