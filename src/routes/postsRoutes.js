import express from "express";
import PostsController from "../controllers/postController.js";
import { validarProfessor } from "../middleware/validarProfessor.js";

const postsRoutes = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     description: Retorna todos os posts disponíveis para alunos e professores
 *     responses:
 *       200:
 *         description: Lista de posts
 */
postsRoutes.get("/", PostsController.listarPosts);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     description: Permite buscar posts filtrando por título ou conteúdo
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de posts filtrados
 */
postsRoutes.get("/search", PostsController.buscarPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
postsRoutes.get("/:id", PostsController.lerPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     description: Apenas professores podem criar posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       401:
 *         description: Usuário não autorizado
 */
postsRoutes.post("/", validarProfessor, PostsController.criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     description: Apenas professores podem editar posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser editado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Post não encontrado
 */
postsRoutes.put("/:id", validarProfessor, PostsController.editarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post
 *     description: Apenas professores podem excluir posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser excluído
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       401:
 *         description: Usuário não autorizado
 *       404:
 *         description: Post não encontrado
 */
postsRoutes.delete("/:id", validarProfessor, PostsController.excluirPost);

export default postsRoutes;
