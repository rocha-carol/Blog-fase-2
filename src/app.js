import express from "express";

//import routes from "./routes/postsRoutes.js";
import routes from "./routes/indexRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();

// Middleware global para JSON
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => res.status(200).send("Blog escolar"));

// Rotas principais
routes(app);

// Middleware de rota não encontrada (404)
app.use(notFound);

// Middleware de erro (500)
app.use(errorHandler);

export default app;

