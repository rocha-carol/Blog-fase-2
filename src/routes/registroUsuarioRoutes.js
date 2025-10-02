import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuario from "../models/usuario.js";

const routes = express.Router();

// Registrar usuário
routes.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    // Criptografa a senha antes de salvar
    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = new usuario({ nome, email, senha: hashedSenha, role });

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
  const usuario = await usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ message: "Usuário não encontrado" });

  // Compara a senha informada com a salva no banco
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) return res.status(400).json({ message: "Senha inválida" });

  // Gera o token com id e role do usuário
  const token = jwt.sign(
    { id: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default routes;;
