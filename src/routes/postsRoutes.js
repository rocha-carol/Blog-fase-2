import express from "express";
import { criarPost, listarPosts, buscarPostPorId } from "../controllers/PostController.js";

const router = express.Router();

// Rotas de posts
router.post("/", criarPost);
router.get("/", listarPosts);
router.get("/:id", buscarPostPorId);

// Exporta como postRoutes
export { router as postRoutes };



import express from "express";
import { autenticar, autorizarProfessor } from "../middleware/auth.js";
import {
  listarPosts,
  lerPost,
  criarPost,
  editarPost,
  excluirPost,
  buscarPosts
} from "../controllers/PostController.js";

const routes = express.Router();

// ROTAS PARA TODOS (alunos e professores)
routes.get("/", autenticar, listarPosts);          // Listar posts
routes.get("/search", autenticar, buscarPosts);   // Buscar posts
routes.get("/:id", autenticar, lerPost);          // Ler post específico

// ROTAS APENAS PARA PROFESSORES
routes.post("/", autenticar, autorizarProfessor, criarPost);       // Criar post
routes.put("/:id", autenticar, autorizarProfessor, editarPost);   // Editar post
routes.delete("/:id", autenticar, autorizarProfessor, excluirPost); // Excluir post

//export { routes };

/*export { postRoutes };

import express from "express";
import PostController from "../controllers/PostController.js";


const routes = express.Router();

//GET /posts → lista todos ou busca por filtros
routes.get("/", PostController.listarPosts);
routes.get("/:id", PostController.listarPostPorId);
routes.post("/", PostController.cadastrarPost);
routes.put("/:id", PostController.atualizarPost);
routes.delete("/:id", PostController.excluirPost);

export default routes;*/
