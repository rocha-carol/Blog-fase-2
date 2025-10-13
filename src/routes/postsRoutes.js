import express from "express";
import PostsController from "../controllers/postController.js";
import { validarProfessor } from "../middleware/validarProfessor.js";

const postsRoutes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@email.com
 *         senha:
 *           type: string
 *           example: 123456
 *     Post:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *         - title
 *         - content
 *       properties:
 *         email:
 *           type: string
 *           example: usuario@email.com
 *         senha:
 *           type: string
 *           example: 123456
 *         title:
 *           type: string
 *           example: Meu novo post
 *         content:
 *           type: string
 *           example: Conteúdo do post
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todas as postagens
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
postsRoutes.get("/", PostsController.listarPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna uma postagem específica
 *     tags: [Posts]
 *     operationId: getPostById
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a12bd9b3e
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 */

postsRoutes.get("/:id", PostsController.lerPost);


/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: post
 *         required: true
 *         description: Texto a ser buscado em título ou conteúdo
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Nenhum post encontrado
 */
postsRoutes.get("/search", PostsController.buscarPosts);


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *         links:
 *           GetCreatedPost:
 *             operationId: getPostById
 *             parameters:
 *               id: "$response.body#/id"
 *             description: Retorna o post criado
 *       401:
 *         description: Usuário não cadastrado ou senha incorreta
 */

postsRoutes.post("/", validarProfessor, PostsController.criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza uma postagem existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a12bd9b3e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       401:
 *         description: Usuário não cadastrado ou senha incorreta
 *       404:
 *         description: Post não encontrado
 */
postsRoutes.put("/:id", validarProfessor, PostsController.editarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui uma postagem existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 670a12bd9b3e
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       401:
 *         description: Usuário não cadastrado ou senha incorreta
 *       404:
 *         description: Post não encontrado
 */
postsRoutes.delete("/:id", validarProfessor, PostsController.excluirPost);

export default postsRoutes;
