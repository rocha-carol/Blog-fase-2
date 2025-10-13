import express from "express";
import validacaoController from "../controllers/validacaoController.js";

const validacaoRoutes = express.Router();

/**
 * @swagger
 * /usuario/registro:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
validacaoRoutes.post("/registro", validacaoController.cadastrarUsuario);

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Email ou senha incorretos
 */
validacaoRoutes.post("/login", validacaoController.login);

export default validacaoRoutes;
