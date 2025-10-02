import express from "express";
import autorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/", autorController.listarAutores);
routes.get("/:id", autorController.listarAutorPorId);
routes.post("/", autorController.cadastrarAutor);
routes.put("/:id", autorController.atualizarAutor);
routes.delete("/:id", autorController.excluirAutor);

export default routes;