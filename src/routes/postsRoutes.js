import express from "express";
import PostsController from "../controllers/postController.js";
import { validarProfessor } from "../middleware/validarProfessor.js";



const postsRoutes = express.Router();

// ROTAS PARA TODOS (alunos e professores)
postsRoutes.get("/", PostsController.listarPosts);
postsRoutes.get("/search", PostsController.buscarPosts);
postsRoutes.get("/:id", PostsController.lerPost);

// ROTAS APENAS PARA PROFESSORES
postsRoutes.post("/", validarProfessor, PostsController.criarPost);
postsRoutes.put("/:id", validarProfessor, PostsController.editarPost);
postsRoutes.delete("/:id", validarProfessor, PostsController.excluirPost);


export default postsRoutes;


