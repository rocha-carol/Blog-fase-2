import express from "express";
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
