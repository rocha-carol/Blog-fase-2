import express from "express";
import autenticacaoController from "../controllers/autenticacaoController.js";

const autenticacaoRoutes = express.Router();

// Registrar usuário
autenticacaoRoutes.post("/registro", autenticacaoController.cadastrarUsuario);

// Login
autenticacaoRoutes.post("/login", autenticacaoController.login);

export default autenticacaoRoutes;
