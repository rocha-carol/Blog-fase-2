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

  static async listarPosts(req, res) {
    console.log("entrou no listar posts")
    try {
      const posts = await Posts.find().populate("autor", "nome").lean();

      // Formata a saída
      const postsFormatados = posts.map(post => ({
        id: post._id,
        titulo: post.titulo,
        conteudo: post.conteudo.substring(0, 200) + "...",
        autor: post.autor ? post.autor.nome : "Autor não encontrado",
        "criado em": formatarData(post.createdAt)
      }));

      res.json(postsFormatados);
    } catch (err) {
      res.status(500).json({ message: err.message });
    };
  };

  // Ler post por ID
  static async lerPost(req, res) {
    try {
      const { id } = req.params;
      const post = await Posts.findById(id).populate("autor", "nome").lean();

      if (!post) return res.status(404).json({ message: "Post não encontrado" });

      // Retorno do post único
      res.json({
        titulo: post.titulo,
        conteudo: post.conteudo,
        autor: post.autor ? post.autor.nome : "Autor não encontrado",
        "criado em": formatarData(post.createdAt)
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    };
  };


  // Criar post (somente professores)
  static async criarPost(req, res) {
    try {
      const { titulo, conteudo, areaDoConhecimento, resumo, status } = req.body;

      // Verifica se o usuário que vem do token existe
      const usuario = await Usuario.findById(req.usuario.id);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      const novoPost = new Posts({
        titulo,
        conteudo,
        areaDoConhecimento,
        resumo,
        status,
        autor: usuario._id
      });

      await novoPost.save();

      res.status(201).json({
        titulo: novoPost.titulo,
        conteudo: novoPost.conteudo,
        autor: usuario.nome,  // garante que nome existe
        resumo: novoPost.resumo,
        status: novoPost.status,
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
        autor: req.usuario.nome || "Professor",
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

  // Buscar posts por palavra-chave no título ou conteúdo
  static async buscarPosts(req, res) {
    console.log("Query recebida:", req.query);
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
      }).populate("autor", "nome").lean();

      const resultado = posts.map(post => ({
        titulo: post.titulo,
        conteudo: post.conteudo.substring(0, 200) + (post.conteudo.length > 200 ? "..." : ""),
        autor: post.autor?.nome || "Autor desconhecido",
        areaDoConhecimento: post.areaDoConhecimento,
        "criado em": formatarData(post.createdAt)
      }));

      res.json(resultado);
    } catch (err) {
      res.status(500).json({ message: err.message });
    };
  };
};
// Listar todos os posts (para alunos ou professores)


export default PostsController;

//incluir area do conhecimento

// corrigir erro - "message": "Parâmetro de busca não informado"

// criar classe e ajustar export/import
