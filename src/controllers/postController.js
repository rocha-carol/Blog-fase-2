import { Posts } from "../models/Post.js";
import { Usuarios } from "../models/Usuario.js";

// Criar novo post
export const criarPost = async (req, res) => {
  try {
    const { titulo, conteudo, autorId } = req.body;

    const autor = await Usuarios.findById(autorId);
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    const novoPost = new Posts({ titulo, conteudo, autor: autor._id });
    const resultado = await novoPost.save();

    res.status(201).json({
      titulo: resultado.titulo,
      conteudo: resultado.conteudo.substring(0, 100) + "...",
      autor: autor.nome,
      "criado em": resultado.createdAt
        ? new Date(resultado.createdAt).toLocaleDateString("pt-BR")
        : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar todos os posts
export const listarPosts = async (req, res) => {
  try {
    const posts = await Posts.find().populate("autor", "nome");

    const resposta = posts.map(post => ({
      titulo: post.titulo,
      conteudo: post.conteudo.substring(0, 100) + "...",
      autor: post.autor.nome,
      "criado em": post.createdAt
        ? new Date(post.createdAt).toLocaleDateString("pt-BR")
        : null
    }));

    res.json(resposta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar post por ID
export const buscarPostPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id).populate("autor", "nome");

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.json({
      titulo: post.titulo,
      conteudo: post.conteudo,
      autor: post.autor.nome,
      "criado em": post.createdAt
        ? new Date(post.createdAt).toLocaleDateString("pt-BR")
        : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/*import { Posts } from "../models/Post.js";
import { Usuarios } from "../models/Usuario.js";

// Função auxiliar para formatar data
function formatarData(data) {
  if (!data) return "Data não disponível"; // ⚠ proteção contra null/undefined

  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
}


// Listar todos os posts (para alunos ou professores)
async function listarPosts(req, res) {
  try {
    const posts = await Posts.find().populate("autor", "nome").lean();

    // Declarando a variável antes de usar
    const resultado = posts.map(post => ({
      titulo: post.titulo,
      conteudo: post.conteudo.substring(0, 200) + (post.conteudo.length > 200 ? "..." : ""),
      autor: post.autor ? post.autor.nome : "Autor não encontrado",
      "criado em": formatarData(post.createdAt)
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Ler post por ID
async function lerPost(req, res) {
  try {
    const { id } = req.params;

    // Busca o post pelo ID
    const post = await Posts.findById(id).populate("autor", "nome").lean();

    if (!post) return res.status(404).json({ message: "Post não encontrado" });

    // Formata a resposta
    const resultado = {
      titulo: post.titulo,
      conteudo: post.conteudo,
      autor: post.autor ? post.autor.nome : "Autor não encontrado",
      "criado em": formatarData(post.createdAt),
      "atualizado em": formatarData(post.updatedAt)
    };

    res.json(resultado);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// Criar post (somente professores)
async function criarPost(req, res) {
  try {
    const { titulo, conteudo } = req.body;

    // Verifica se o usuário que vem do token existe
    const usuario = await Usuarios.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    const novoPost = new Posts({
      titulo,
      conteudo,
      autor: usuario._id
    });

    await novoPost.save();

    res.status(201).json({
      titulo: novoPost.titulo,
      conteudo: novoPost.conteudo,
      autor: usuario.nome,  // garante que nome existe
      "criado em": formatarData(novoPost.createdAt)
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Editar post (somente professores)
async function editarPost(req, res) {
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
async function excluirPost(req, res) {
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
async function buscarPosts(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Parâmetro de busca não informado" });

    const posts = await Posts.find({
      $or: [
        { titulo: { $regex: q, $options: "i" } },
        { conteudo: { $regex: q, $options: "i" } }
      ]
    }).populate("autor", "nome").lean();

    const resultado = posts.map(post => ({
      titulo: post.titulo,
      conteudo: post.conteudo.substring(0, 200) + (post.conteudo.length > 200 ? "..." : ""),
      autor: post.autor.nome,
      "criado em": formatarData(post.createdAt)
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Exporta todas as funções
export { listarPosts, lerPost, criarPost, editarPost, excluirPost, buscarPosts };


/*import { autor } from "../models/autor.js";
import Post from "../models/Post.js";

// Função auxiliar para formatar o retorno de um post
// --------------------
const formatarPost = (post, contexto = "geral") => {
  const obj = {
    titulo: post.titulo,
    resumo: post.resumo,
    conteudo: post.conteudo,
    areaDoConhecimento: post.areaDoConhecimento,
    autor: post.autor?.nome, // mostra apenas o nome do autor
    status: post.status
  };

  if (contexto === "criado") {
    obj.createdAt = `Criado em: ${new Date(post.createdAt).toLocaleDateString('pt-BR')}`;
    delete obj.updatedAt;
  } else if (contexto === "atualizado") {
    obj.updatedAt = `Atualizado em: ${new Date(post.updatedAt).toLocaleDateString('pt-BR')}`;
    delete obj.createdAt;
  } else if (contexto === "feed") {
    obj.createdAt = `Criado em: ${new Date(post.createdAt).toLocaleDateString('pt-BR')}`;
    delete obj.conteudo;   // feed público não mostra conteúdo completo
    delete obj.status;     // feed público não mostra status
  } else if (contexto === "painel") {
    obj.createdAt = `Criado em: ${new Date(post.createdAt).toLocaleDateString('pt-BR')}`;
    obj.updatedAt = `Atualizado em: ${new Date(post.updatedAt).toLocaleDateString('pt-BR')}`;
  }

  return obj;
};

// --------------------
// POST /posts → criar novo post
// --------------------
export const criarPost = async (req, res) => {
  try {
    const novoPost = {
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      resumo: req.body.resumo,
      areaDoConhecimento: req.body.areaDoConhecimento,
      status: req.body.status || "rascunho",
      autor: req.user._id
    };

    const postCriado = await Post.create(novoPost);
    res.status(201).json(formatarPost(postCriado, "criado"));
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post" });
  }
};

// --------------------
// PUT /posts/:id → atualizar post
// --------------------
export const atualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = {
      titulo: req.body.titulo,
      conteudo: req.body.conteudo,
      resumo: req.body.resumo,
      areaDoConhecimento: req.body.areaDoConhecimento,
      status: req.body.status
    };

    const postAtualizado = await Post.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    res.json(formatarPost(postAtualizado, "atualizado"));
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar post" });
  }

  
};


class PostController {

    

  // GET /posts → Sem parametros - lista todos os posts. Com parâmetros - busca por filtros
  static async listarPosts(req, res, next) {
    const filtros = req.query;
    const query = {};


    // Cria filtros usando regex para busca parcial (case-insensitive)
    for (const campo in filtros) {
      query[campo] = { $regex: filtros[campo], $options: "i" };
    }

    try {
      const resultados = await post.find(query);

      if (!resultados || resultados.length === 0) {
        return res.status(404).json({ message: "Nenhum post encontrado" });
      }

      res.status(200).json(resultados);
    } catch (erro) {
      next(erro); // passa para o errorHandler
    }
  }

  // GET /posts/:id → busca post por ID
  static async listarPostPorId(req, res, next) {
    try {
      const id = req.params.id;
      const postEncontrado = await post.findById(id);

      if (!postEncontrado) {
        return res.status(404).json({ message: "Post não encontrado" });
      }

      res.status(200).json(postEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  // POST /posts → cria novo post
  static async cadastrarPost(req, res, next) {
   
    const novoPost = req.body;

    try {
      const autorEncontrado = await autor.findById(novoPost.autor);
 
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      const postCompleto = { ...novoPost, autor: { ...autorEncontrado._doc } };
      const postCriado = await post.create(postCompleto);

      res.status(201).json({ message: "Post criado com sucesso", post: postCriado });
    } catch (erro) {
      if (erro.name === "ValidationError") {
        const mensagens = Object.values(erro.errors).map(e => e.message);
        return res.status(400).json({ message: mensagens });
      }
      next(erro);
    }
  }

  // PUT /posts/:id → atualiza post
  static async atualizarPost(req, res, next) {
    try {
      const id = req.params.id;
      const postAtualizado = await post.findByIdAndUpdate(id, req.body, { new: true }).select("-_id -autor._id");

      if (!postAtualizado) {
        return res.status(404).json({ message: "Post não encontrado" });
      }
     
      res.status(200).json({ message: "Post atualizado", post:postAtualizado});
      
    } catch (erro) {
      next(erro);
    }
  }

  // DELETE /posts/:id → exclui post
  static async excluirPost(req, res, next) {
    try {
      const id = req.params.id;
      const postDeletado = await post.findByIdAndDelete(id);

      if (!postDeletado) {
        return res.status(404).json({ message: "Post não encontrado" });
      }

      res.status(200).json({ message: "Post excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }
}

export default PostController;*/
