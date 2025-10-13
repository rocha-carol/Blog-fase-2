import express from "express";
import validacaoController from "../controllers/validacaoController.js";

const validacaoRoutes = express.Router();

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
validacaoRoutes.post("/registro", validacaoController.cadastrarUsuario);

/**
 * @swagger
 * /usuario/registro:
 *   post:
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
validacaoRoutes.post("/login", validacaoController.login);

export default validacaoRoutes;
