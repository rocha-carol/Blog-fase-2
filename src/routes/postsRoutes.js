import express from "express";
import { autenticar, autorizarProfessor } from "../middleware/auth.js";
import { 
  listarPosts, buscarPosts, lerPost, criarPost, editarPost, excluirPost
} from "../controllers/PostController.js";

const routes = express.Router();

// ROTAS PARA TODOS (alunos e professores)
routes.get("/", listarPosts);         
routes.get("/search", buscarPosts);   
routes.get("/:id", lerPost);          

// ROTAS APENAS PARA PROFESSORES
routes.post("/", autenticar, autorizarProfessor, criarPost);       
routes.put("/:id", autenticar, autorizarProfessor, editarPost);   
routes.delete("/:id", autenticar, autorizarProfessor, excluirPost); 

export { routes };

