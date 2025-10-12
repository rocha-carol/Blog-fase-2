import express from "express";
import validacaoController from "../controllers/validacaoController.js";

const validacaoRoutes = express.Router();

// Registrar usuário
validacaoRoutes.post("/registro", validacaoController.cadastrarUsuario);

// Login
validacaoRoutes.post("/login", validacaoController.login);

export default validacaoRoutes;
