import { Posts } from "../models/Post.js";
import { Usuario } from "../models/Usuario.js";

// Função auxiliar para formatar data
function formatarData(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

class PostsController {

  // Listar todos os posts
  static async listarPosts(req, res) {
    try {
      // Busca posts sem usar populate de autor
      const posts = await Posts.find().lean();

      const postsFormatados = posts.map(post => ({
        id: post._id,
        titulo: post.titulo,
        conteudo: post.conteudo.substring(0, 200) + "...",
        "criado em": formatarData(post.createdAt)
      }));

      res.json(postsFormatados);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Ler post por ID
  static async lerPost(req, res) {
    try {
      const { id } = req.params;
      const post = await Posts.findById(id).lean();

      if (!post) return res.status(404).json({ message: "Post não encontrado" });

      res.json({
        titulo: post.titulo,
        conteudo: post.conteudo,
        "criado em": formatarData(post.createdAt)
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Criar post (somente professores)
  static async criarPost(req, res) {
    try {
      const { titulo, conteudo, areaDoConhecimento } = req.body;

      // O usuário que vem do token
      const usuario = await Usuario.findById(req.usuario.id);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      const novoPost = new Posts({
        titulo,
        conteudo,
        areaDoConhecimento,
      });

      await novoPost.save();

      res.status(201).json({
        titulo: novoPost.titulo,
        conteudo: novoPost.conteudo.substring(0, 100) + "...",
        "criado em": formatarData(novoPost.createdAt)
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Editar post (somente professores)
  static async editarPost(req, res) {
    try {
      const { id } = req.params;
      const { titulo, conteudo } = req.body;

      const post = await Posts.findById(id);
      if (!post) return res.status(404).json({ message: "Post não encontrado" });

      if (titulo) post.titulo = titulo;
      if (conteudo) post.conteudo = conteudo;

      await post.save();

      res.json({
        titulo: post.titulo,
        conteudo: post.conteudo,
        "atualizado em": formatarData(post.updatedAt)
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Excluir post (somente professores)
  static async excluirPost(req, res) {
    try {
      const { id } = req.params;

      const post = await Posts.findById(id);
      if (!post) return res.status(404).json({ message: "Post não encontrado" });

      await post.deleteOne();

      res.json({ message: "Post excluído com sucesso" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Buscar posts por palavra-chave no título, conteúdo ou área do conhecimento
  static async buscarPosts(req, res) {
    try {
      const { q } = req.query;
      if (!q) return res.status(400).json({ message: "Parâmetro de busca não informado" });

      const regex = new RegExp(q, "i");

      const posts = await Posts.find({
        $or: [
          { titulo: regex },
          { conteudo: regex },
          { areaDoConhecimento: regex },
        ]
      }).lean();

      const resultado = posts.map(post => ({
        titulo: post.titulo,
        conteudo: post.conteudo.substring(0, 200) + (post.conteudo.length > 200 ? "..." : ""),
        areaDoConhecimento: post.areaDoConhecimento,
        "criado em": formatarData(post.createdAt)
      }));

      res.json(resultado);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default PostsController;
