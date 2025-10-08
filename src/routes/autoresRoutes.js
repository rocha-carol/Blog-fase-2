import express from "express";
import autorController from "../controllers/autorController.js";

const autoresRoutes = express.Router();

autoresRoutes.get("/", autorController.listarAutores);
autoresRoutes.get("/:id", autorController.listarAutorPorId);
autoresRoutes.post("/", autorController.cadastrarAutor);
autoresRoutes.put("/:id", autorController.atualizarAutor);
autoresRoutes.delete("/:id", autorController.excluirAutor);

export default autoresRoutes;