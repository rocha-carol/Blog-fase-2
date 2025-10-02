import express from "express";
import { Usuarios } from "../models/Usuario.js";

const router = express.Router();

// Registrar usuário
router.post("/registrar", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = new Usuarios({ nome, email, senha });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    res.json({ message: "Login realizado com sucesso", usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as authRoutes };





/*import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuarios } from "../models/Usuario.js";

const routes = express.Router();

// Registrar usuário
routes.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuarios({ nome, email, senha: hashedSenha, role });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuarios.findOne({ email });
  if (!usuario) return res.status(400).json({ message: "Usuário não encontrado" });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(400).json({ message: "Senha inválida" });

  const token = jwt.sign(
    { id: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export { routes };



/*import express from "express"; // Framework para rotas e servidor
import bcrypt from "bcryptjs"; // Para criptografar a senha
import jwt from "jsonwebtoken"; // Para gerar tokens JWT
import Usuario from "../models/usuario.js"; // Modelo do usuário

// Usando "routes" ao invés de "router"
const routes = express.Router();

// Registrar usuário (aluno ou professor)
routes.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    // Criptografa a senha antes de salvar
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria o novo usuário com os dados enviados
    const novoUsuario = new Usuario({ nome, email, senha: hashedSenha, role });

    // Salva no banco de dados
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login (gera o token JWT)
routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // Procura o usuário pelo email
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ message: "Usuário não encontrado" });

  // Compara a senha informada com a salva no banco
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(400).json({ message: "Senha inválida" });

  // Gera o token com id e role do usuário
  const token = jwt.sign(
    { id: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expira em 1 hora
  );

  res.json({ token });
});

export default routes;*/
